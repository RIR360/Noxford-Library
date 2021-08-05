// modules
const express = require("express");
const layouts = require("express-ejs-layouts");

// app
const app = express();
const port = process.env.PORT || 3000;

// app configurting
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/img", express.static(__dirname + "public/img"));
app.use(layouts);
app.use(express.urlencoded({ extended: true }));

// routing
app.get("/", (req, res) => {
    res.render("home", {title: "Noxford Library"});
});

// 404 Error Page
app.get("*", (req, res) => {
    res.render("notFound", {title: "404 Not Found"});
});

// listening
app.listen(port);