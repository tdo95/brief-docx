const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const logger = require("morgan");
const connectDB = require("./config/database");
const authRoutes = require("./routes/auth");
const documentRoutes = require("./routes/documents");
const summariesRoutes = require("./routes/summaries");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Setup Routes For Which The Server Is Listening
app.use("/auth", authRoutes);
app.use("/document", documentRoutes);
app.use("/summaries", summariesRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port ${process.env.PORT}, you better catch it!`);
});
