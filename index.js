const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const cookieSession = require("cookie-session");
const passport = require("passport");
const authRoute = require("./routes/authRoutes");

//connect my database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database not connected", err));

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cookieSession({
    name: "session",
    keys: ["sav"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://savannah-assesment-frontend.vercel.app"],
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);
app.use("/", require("./routes/authRoutes"));

app.use("/auth", authRoute);

app.listen(process.env.PORT, () =>
  console.log("App is running on " + process.env.PORT)
);
