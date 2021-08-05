// modules
const express = require("express");
const layouts = require("express-ejs-layouts");

// app
const app = express();
const port = process.env.PORT || 3000;

// app configurting
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(layouts);
app.use(express.urlencoded({ extended: true }));

// ***** routing *****
// homepage
app.get("/", (req, res) => {
    res.render("home", {title: "Noxford Library"});
});
// collection
app.get("/collection", (req, res) => {
    res.render("collection", {title: "Noxford Library"});
});
// getcard
app.get("/getcard", (req, res) => {
    res.render("getcard", {title: "Get a card"});
});
// search
app.get("/search", (req, res) => {
    res.render("search", {title: "Search"});
});
// sign
app.get("/sign", (req, res) => {
    res.render("sign", {title: "Sign in"});
});
// donate
app.get("/donate", (req, res) => {
    res.render("donate", {title: "Donate"});
});
// 404 Error Page
app.get("*", (req, res) => {
    res.render("notFound", {title: "404 Not Found"});
});

// listening
app.listen(port);