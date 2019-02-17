import Mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";

export interface PatientInterface extends Mongoose.Document {
    _type: "patient";
    email: string;
    password: string;

    profile: {
        name: string,
        address: string,
        gender: string,
        age: number,

        medicalHistory: Map<string, { date: Date, medication: Array<string>, labs: Array<{ data: object }>, symptoms: Array<string> }>,
        medication: Array<{ name: string, dose: string, timeframe: { start: Date, end: Date } }>,
        appointments: Array<{ date: Date, description: string }>

        ssn: string
    },

    comparePassword: (candidatePassword: string, cb: (err: Error, isMatch: boolean) => void) => void;
};

export const patientSchema = new Mongoose.Schema({
    _type: { type: String, default: "patient" },
    email: { type: String, unique: true },
    password: String,

    profile: {
        name: String,
        gender: String,
        age: Number,

        medicalHistory: {
            type: Map,
            of: Object
        },
        medication: {
            type: Array,
            of: { name: String, dose: String, timeframe: { start: Date, end: Date } }
        },
        appointments: {
            type: Array,
            of: {
                date: Date,
                description: String
            }
        },

        ssn: String
    }
}, {timestamps: true});

patientSchema.pre("save", function save(next: Function) {
    //@ts-ignore
    const user = this as PatientInterface;

    if (!user.isModified("password")) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, () => {}, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

patientSchema.methods.comparePassword = function comparePassword(candidatePassword: string, cb: (err: Error, isMatch: boolean) => void) {
    bcrypt.compare(candidatePassword, this.password, cb);
}

export const Patient = Mongoose.model("Patient", patientSchema);