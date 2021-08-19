const express = require("express");
const app = express.Router();
// get dashboard
app.get("/", (req, res) => {
    if (req.session.logged) {
        res.redirect("/dashboard");
    } else {
        res.render("home", {title: "Home"});
    }
});
// get dashboard
app.get("/dashboard", (req, res) => {
    if (req.session.logged) {
        res.render("dashboard", {title: "Dashboard"})
    } else {
        res.redirect("/login");
    }
});

module.exports = app;