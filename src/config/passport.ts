import passport from "passport";
import {
    Strategy as LocalStrategy
} from "passport-local";
import {
    Patient,
    Doctor,
    HealthcareProvider,
    PatientInterface,
    DoctorInterface,
    HProviderInterface
} from "../models";
import { Request, Response, NextFunction } from "express";

passport.serializeUser((user: PatientInterface | DoctorInterface | HProviderInterface, done) => {
    done(null, {id: user.id, group: user._type});
});

passport.deserializeUser((userData: {id: string, group: string}, done) => {
    if (userData.group == "patient") {
        Patient.findById(userData.id, (err, user) => {
            done(err, user as object);
        });
    }

    if (userData.group == "doctor") {
        Doctor.findById(userData.id, (err, user) => {
            done(err, user as object);
        });
    }
});

passport.use("patient", new LocalStrategy({
    usernameField: "email"
}, (username, password, done) => {
    Patient.findOne({
        email: username
    }, (err, user: PatientInterface) => {
        if (err) return done(err);

        if (!user) {
            console.log("no");
            return done(null, false, {
                message: "Incorrect username."
            });
        }

        user.comparePassword(password, (err, isMatch) => {
            if (err) return done(err);

            if (!isMatch) {
                console.log("pass is wrong");
                return done(null, false, {
                    message: "Incorrect password."
                });
            }

            done(null, user);
        });
    });
}));

passport.use("doctor", new LocalStrategy({
    usernameField: "email"
}, (username, password, done) => {
    Doctor.findOne({
        email: username
    }, (err, user: DoctorInterface) => {
        if (err) return done(err);

        if (!user) {
            return done(null, false, {
                message: "Incorrect username."
            });
        }

        console.log("Correct username.");

        user.comparePassword(password, (err, isMatch) => {
            if (err) return done(err);

            if (!isMatch) {
                return done(null, false, {
                    message: "Incorrect password."
                });
            }

            console.log(user);

            done(null, user);
        });
    });
}));

passport.use("provider", new LocalStrategy({
    usernameField: "email"
}, (username, password, done) => {
    HealthcareProvider.findOne({
        email: username
    }, (err, user: HProviderInterface) => {
        if (err) return done(err);

        if (!user) {
            return done(null, false, {
                message: "Incorrect username."
            });
        }

        user.comparePassword(password, (err, isMatch) => {
            if (err) return done(err);

            if (!isMatch) return done(null, false, {
                message: "Incorrect password."
            });

            done(null, user);
        });
    });
}));

/**
 * Login Required middleware.
 */
export const isAuthenticatedPatient = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated() && req.user._type == "patient") {
        return next();
    }
    res.redirect("/");
};

export const isAuthenticatedDoctor = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated() && req.user._type == "doctor") {
        return next();
    }
    res.redirect("/");
};

export const isAuthenticatedProvider = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated() && req.user._type == "provider") {
        return next();
    }
    res.redirect("/");
};

export const isAuthAPI = (type: "patient" | "doctor" | "provider") => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.isAuthenticated() && req.user._type == type) {
            return next();
        }
        res.status(401).json({error: "Not authorized.", success: false});
    };
}