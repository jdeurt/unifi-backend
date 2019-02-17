import Mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";

export interface DoctorInterface extends Mongoose.Document {
    email: string;
    password: string;

    profile: {
        name: string,
        gender: string,
        age: number
    },

    access: Array<string>,

    comparePassword: (candidatePassword: string, cb: (err: Error, isMatch: boolean) => void) => void;
};

export const doctorSchema = new Mongoose.Schema({
    email: { type: String, unique: true },
    password: String,

    profile: {
        name: String,
        gender: String,
        age: Number
    },

    access: [String]
}, {timestamps: true});

doctorSchema.pre("save", function save(next: Function) {
    //@ts-ignore
    const user = this as DoctorInterface;

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

doctorSchema.methods.comparePassword = function comparePassword(candidatePassword: string, cb: (err: Error, isMatch: boolean) => void) {
    bcrypt.compare(candidatePassword, this.password, cb);
}

export const Doctor = Mongoose.model("Doctor", doctorSchema);