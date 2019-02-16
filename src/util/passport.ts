import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Patient, Doctor, HealthcareProvider, PatientInterface, DoctorInterface, HProviderInterface } from "../models";

passport.use(new LocalStrategy((username, password, done) => {
    //TODO: Add verification.

    return done(null, {});
}));