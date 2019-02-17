import { Patient, Doctor } from "../src/models";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.load();

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useNewUrlParser", true);
mongoose.connect(process.env.MONGODB_URI as string);
mongoose.connection.on("error", (err) => {
    console.error(err);
    console.log("MongoDB connection error.");
    process.exit();
});

const user = new Patient({
    email: "patient@email.com",
    password: "password",

    profile: {
        name: "Juan de urtubey",
        gender: "make",
        age: 18,

        medication: [],
        appointments: [],

        ssn: "111-11-1111"
    }
});

//@ts-ignore
user.profile.medication.push();
//@ts-ignore
user.appointments.push({date: new Date(), description: "Event"});

console.log(user);

user.save((err, doc) => {
    console.log(err || doc);
});