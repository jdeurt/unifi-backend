import Mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";

export interface HProviderInterface extends Mongoose.Document {
    email: string;
    password: string;

    profile: {
        name: string
    }
};

export const healthcareProviderSchema = new Mongoose.Schema({
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