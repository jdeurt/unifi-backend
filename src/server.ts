import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import connectMongo from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";
import path from "path";
import dotenv from "dotenv";
import { isAuthenticatedPatient, isAuthAPI, isAuthenticatedDoctor, isAuthenticatedProvider } from "./config/passport";
import patientAPI from "./api/patient";
import { getPatient, setPatientData } from "./api/doctor";
import { Request, Response } from "express";

dotenv.load();

const app = express();
const MongoStore = connectMongo(session);

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useNewUrlParser", true);
mongoose.connect(process.env.MONGODB_URI as string);
mongoose.connection.on("error", (err) => {
    console.error(err);
    console.log("MongoDB connection error.");
    process.exit();
});

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET as string,
    cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/login", (req, res, next) => {
    const type = req.body.submissionType;

    if (!type) {
        return res.status(400).json({message: "ha loser"});
    }

    console.log(type);

    passport.authenticate(type, {
        successRedirect: "/" + type,
        failureRedirect: "/"
    })(req, res, next);
});

app.get("/logout", (req, res) => {
    req.logout();
    //@ts-ignore
    req.session.destroy();
    res.redirect("/");
});

app.get("/api/patient", isAuthAPI("patient"), patientAPI);
app.get("/api/doctor", isAuthAPI("doctor"), patientAPI);
app.get("/api/doctor/:id", isAuthAPI("doctor"), getPatient);
app.post("/api/doctor/:id/:item", isAuthAPI("doctor"), setPatientData);
app.get("/api/provider", isAuthAPI("provider"), patientAPI);

app.use("/patient", isAuthenticatedPatient);
app.use("/doctor", isAuthenticatedDoctor);
app.use("/provider", isAuthenticatedProvider);

app.use(express.static(path.resolve(__dirname + "/../../website/dist/website")));
app.use("/assets", express.static(path.resolve(__dirname + "/../../website/dist/website/assets")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/../../website/dist/website/index.html"));
});

export default app;