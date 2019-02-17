import { Patient } from "../src/models";
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
    _type: "patient",
    email: "test@email.com",
    password: "password",
    
    profile: {
        name: "William Ohio",
        address: "4001 Street Avenue, Dallas, TX 75205",
        gender: "male",
        age: 18,

        medicalHistory: new Map(),
        medication: new Map(),
        appointments: [{date: new Date(), description: "Example appointment today."}],

        ssn: "111-11-1111"
    }
});

console.log(user);

user.save((err, doc) => {
    console.log(err || doc);
});