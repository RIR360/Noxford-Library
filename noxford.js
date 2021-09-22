// loading environment
require('dotenv').config();
// modules
const express = require("express");
const layouts = require("express-ejs-layouts");
const session = require("express-session");
// routers
const _home_ = require("./routes/_home_.js");
const _login_ = require("./routes/_login_.js");
const _registration_ = require("./routes/_registration_.js");
const _collection_ = require("./routes/_collection_.js");
const _books_ = require("./routes/_books_.js");
const _place_ = require("./routes/_place_.js");

// app
const app = express();
const port = process.env.PORT || 3000; 

// app configurting
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(layouts);
app.use(express.urlencoded({ limit: '10mb', extended: false }));
app.use(session({
    secret: "user login status",
    resave: false,
    saveUninitialized: false,
    cookie: {userId: null}
}));
app.use(function(req, res, next) {
    res.locals.userId = req.session.userId;
    next();
});

// ***** routing *****
// homepage
app.use("/", _home_);

// collection
app.use("/collection", _collection_);
// books page
app.use("/books", _books_);
// place hold page
app.use("/place", _place_);

// getcard
app.get("/getcard", (req, res) => {
    res.render("getcard", {title: "Get a card"});
});
// search
app.get("/search", (req, res) => {
    res.render("search", {title: "Search"});
});
// login
app.use("/login", _login_);
// logout
app.use("/logout", (req, res) => {
    req.session.userId = null;
    res.redirect("/");
});
// register
app.use("/register", _registration_);
// donate
app.get("/donate", (req, res) => {
    res.render("donate", {title: "Donate"});
});
// 404 Error Page
app.get("*", (req, res) => {
    res.status(400).render("notFound", {title: "404 Not Found"});
});

// listening
app.listen(port);