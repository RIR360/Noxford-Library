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
const _account_ = require("./routes/_account_.js");
const _search_ = require("./routes/_search_.js");

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
    res.render("pages/getcard", {title: "Get a card"});
});
// search
app.use("/search", _search_);

// account page
app.use("/account", _account_);

// login
app.use("/login", _login_);
// logout
app.use("/logout", (req, res) => {
    req.session.userId = null;
    res.redirect("/");
});

// register
app.use("/register", _registration_);

// donate get
app.get("/donate", (req, res) => {
    res.render("pages/donate", {title: "Donate"});
});
// donate post
app.post("/donate", (req, res) => {
    res.render("pages/donate", {
        title: "Donate",
        flash: "Cannot Donate: No donation system available",
        type: "warning"
    });
});

// others page
app.get("/others", (req, res) => {
    res.render("pages/others", {title: "Others"});
});
// about page
app.get("/about", (req, res) => {
    res.render("pages/about", {title: "About"});
});

// 404 Error Page
app.get("*", (req, res) => {
    res.status(400).render("misc/notFound", {title: "404 Not Found"});
});

// listening
app.listen(port);
console.log("Noxford Library Started Successfully!");