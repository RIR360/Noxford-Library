const fsystem = require("fs");
const express = require("express");
const app = express.Router();
const bcrypt = require("bcrypt");
const Helper = require("../helpers");
// constants
const DATABASE = "database.json";

app.get("/", (req, res) => {
    res.render("login", {title: "Login"});
});
app.post("/", async (req, res) => {
    // get user credentials
    const email = req.body.email;
    const pwd = req.body.password;
    // basic validation
    if (!email || !pwd) {
        Helper.error(res);
    }
    else {
        // log the user in
        // load up database
        const database = JSON.parse(
            fsystem.readFileSync(DATABASE)
        );
        var logger;
        // check if user already exists
        for (user of database)
        {
            if (user.email == email) {
                logger = user;
                break;
            }
        }
        if (!logger) {
            Helper.error(res, "User doesn't exists");
        }
        else {
            // user found
            if (await bcrypt.compare(pwd, logger.hash))
            {
                Helper.log(res, "Wow! you logged in");
            }
            else {
                res.redirect("/login");
            }
        }
    }
});

module.exports = app;