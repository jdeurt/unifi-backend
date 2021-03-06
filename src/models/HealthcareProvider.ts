import Mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";

export interface HProviderInterface extends Mongoose.Document {
    _type: "provider";
    email: string;
    password: string;

    profile: {
        name: string
    },

    comparePassword: (candidatePassword: string, cb: (err: Error, isMatch: boolean) => void) => void;
};

export const healthcareProviderSchema = new Mongoose.Schema({
    _type: { type: String, default: "provider" },
    email: { type: String, unique: true },
    password: String,

    profile: {
        name: String,
        gender: String,
        age: Number
    }
}, {timestamps: true});

healthcareProviderSchema.pre("save", function save(next: Function) {
    //@ts-ignore
    const user = this as HProviderInterface;

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

healthcareProviderSchema.methods.comparePassword = function comparePassword(candidatePassword: string, cb: (err: Error, isMatch: boolean) => void) {
    bcrypt.compare(candidatePassword, this.password, cb);
}

export const HealthcareProvider = Mongoose.model("HealthcareProvider", healthcareProviderSchema);