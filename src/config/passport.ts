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
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    Patient.findById(id, (err, user) => {
        if (!err) done(err, user as object);

        Doctor.findById(id, (err, user) => {
            if (!err) done(err, user as object);

            HealthcareProvider.findById(id, (err, user) => {
                done(err, user as object);
            });
        })
    });
});

passport.use("patient", new LocalStrategy({
    usernameField: "email"
}, (username, password, done) => {
    Patient.findOne({
        email: username
    }, (err, user: PatientInterface) => {
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

        user.comparePassword(password, (err, isMatch) => {
            if (err) return done(err);

            if (!isMatch) return done(null, false, {
                message: "Incorrect password."
            });

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