const express = require("express");
const app = express.Router();
const Helper = require("../helpers");
// mongodb
const {MongoClient} = require("mongodb");
const uri = process.env.DATABASE_URL;
// get dashboard
app.get("/", (req, res) => {
    if (req.session.userId != null) {
        res.redirect("/dashboard");
    } else {
        res.render("pages/home", {title: "Home"});
    }
});
// get dashboard
app.get("/dashboard", (req, res) => {
    if (req.session.userId != null) {
        try {
            MongoClient.connect(uri, (err, response) => {
                if (err) throw err;
                response
                .db("Noxford-library")
                .collection("holdings")
                .find({user: req.session.userId}).toArray((err, result) => {
                    if (err) throw err;
                    res.render("member/dashboard", {title: "Dashboard", data: result});
                    response.close();
                });
            });
        } catch (error) {
            Helper.error(res, error);
        }
    } else {
        res.redirect("/login");
    }
});

module.exports = app;