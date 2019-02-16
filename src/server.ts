import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import connectMongo from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";
import path from "path";

const app = express();
const MongoStore = connectMongo(session);

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useNewUrlParser", true);
mongoose.connect(process.env.MONGODB_URI as string);
mongoose.connection.on("error", (err) => {
    console.error(err);
    console.log("MongoDB connection error. Please make sure MongoDB is running.");
    process.exit();
});

app.use(express.static(path.resolve(__dirname + "/../../website/dist")))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET as string,
    cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
    store: new MongoStore({
        url: process.env.MONGODB_URI as string,
        autoReconnect: true,
    })
}));
app.use(passport.initialize());
app.use(passport.session());

export default app;