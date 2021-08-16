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
app.get("/", async (req, res) => {
    res.render("register", {title: "Register"});
});
// post method
app.post("/", async (req, res) => {
    // get user inputs
    const fname = req.body.fname;
    const email = req.body.email;
    const pwd = req.body.password;
    const c_pwd = req.body.confirm;
    // check if user already exists
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
    if (result) {
        Helper.error(res, "User already exists");
    } else {
        // validation check
        if (!fname || !email || !pwd) {
            Helper.error(res);
        }
        else if (fname.length > 45) {
            Helper.error(res, "Full name too long");
        }
        else if (pwd != c_pwd) {
            Helper.error(res, "Password Did not match");
        }
        else if (pwd.length < 8 || pwd.length > 40)
        {
            Helper.error(res, "Password too small or big");
        }
        else {
            // register the user
            // try inserting the user data
            try {
                // encrypting password
                const pass = bcrypt.hash(
                    req.body.password,
                    10
                );
                // getting user data
                const userData = {
                    fullname: req.body.fname,
                    email: req.body.email,
                    hash: await pass
                };
                // insert data into database
                await client
                .db("Noxford-library")
                .collection("users")
                .insertOne(userData);
                // go back to homepage
                res.redirect("/");
            } catch (err) {
                Helper.error(res, err);
            } finally {
                // close the mongo client here
                await client.close();
            }
        }
    }
});

module.exports = app;