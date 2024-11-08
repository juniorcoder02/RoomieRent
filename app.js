//required packages
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const path = require("path");
const methodOverirde = require("method-override");
const engine = require("ejs-mate");
const expressError = require("./utils/expressError");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./model/user.js");

//routers
const propertiesRouter = require("./routes/properties.js");
const reviewsRouter = require("./routes/review.js");
const usersRouter = require("./routes/user.js");

//view engine set-up
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


const dbUrl = process.env.ATLASDB_URL;

// Connect to MongoDB
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverirde("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.engine("ejs", engine);

const store = mongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret:process.env.SECRET,
  },
  touchAfter:24*3600
});

store.on("error",()=>{
  console.error("Error connecting to MongoDB store:",err);
})

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

//index route
app.get("/", (req, res) => {
  res.render("home");
});

//property route
app.use("/properties", propertiesRouter);

//reviews route
app.use("/properties/:id/reviews", reviewsRouter);

//users router
app.use("/", usersRouter);

// 404 route
app.all("*", (req, res, next) => {
  next(new expressError(404, "page not found"));
});

//error handling middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error", { message });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
