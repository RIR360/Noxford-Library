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
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ***** Helper functions *****
function error(res, message) {
    if (!message) {
        message = "Something wen't wrong";
    }
    res.render("error", {title: "Error", message: message});
}

// ***** routing *****
// homepage
app.get("/", (req, res) => {
    res.render("home", {title: "Home"});
});
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
// sign
app.get("/login", (req, res) => {
    res.render("login", {title: "Login"});
});
app.post("/login", (req, res) => {

    let email = req.body.email;
    let pwd = req.body.password;

    if (!email || !pwd) {
        error(res);
    }
    else {
        // log the user in
        res.redirect("/");
    }
});
// register
app.get("/register", (req, res) => {
    res.render("register", {title: "Register"});
});
app.post("/register", (req, res) => {

    let fname = req.body.fname;
    let email = req.body.email;
    let pwd = req.body.password;
    let c_pwd = req.body.confirm;

    if (!fname || !email || !pwd) {
        error(res);
    }
    else if (fname.length > 45) {
        error(res, "Full name too long");
    }
    else if (pwd != c_pwd) {
        error(res, "Password Did not match");
    }
    else {
        // register the user
        res.redirect("/");
    }
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