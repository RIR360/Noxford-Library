// loading environment
require('dotenv').config();
// modules
const express = require("express");
const layouts = require("express-ejs-layouts");
// routers
const __home__ = require("./routes/home.js");
const __login__ = require("./routes/login.js");
const __registration__ = require("./routes/registration.js");

// app
const app = express();
const port = process.env.PORT || 3000; 

// app configurting
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(layouts);
app.use(express.urlencoded({ limit: '10mb', extended: false }));

// ***** routing *****
// homepage
app.use("/", __home__);

// collection
app.get("/collection", (req, res) => {
    res.render("collection", {title: "Collection"});
});
// getcard
app.get("/getcard", (req, res) => {
    res.render("getcard", {title: "Get a card"});
});
// search
app.get("/search", (req, res) => {
    res.render("search", {title: "Search"});
});
// login
app.use("/login", __login__);
// register
app.use("/register", __registration__);
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