// loading environment
require('dotenv').config();
// modules
const express = require("express");
const app = express.Router();
const bcrypt = require("bcrypt");
const Helper = require("../helpers");
// mongodb
const {MongoClient} = require("mongodb");
const uri = process.env.DATABASE_URL
const client = new MongoClient(uri);
// get method
app.get("/", (req, res) => {
    res.render("member/login", {title: "Login"});
});
// post method
app.post("/", async (req, res) => {
    // get user credentials
    const email = req.body.email;
    const pwd = req.body.password;
    // connect to database
    await client.connect();
    // find the user
    const result = await client
    .db("Noxford-library")
    .collection("users")
    .findOne({
        "email": email
    });
    // check for users
    if (!result) {
        res.render("member/login", {
            title:"Login Failed", 
            flash: "Login failed: User doesn't exists",
            type: "danger"
        });
    } else {
        // basic validation
        if (!email || !pwd) {
            Helper.error(res);
        }
        else {
            // user found
            if (await bcrypt.compare(pwd, result.hash))
            {
                req.session.userId = result.userId;
                res.redirect("/");
            }
            else {
                res.render("member/login", {
                    title:"Login Failed", 
                    flash: "Login failed: Wrong Password",
                    type: "danger"
                });
            }
        }
    }
});

module.exports = app;