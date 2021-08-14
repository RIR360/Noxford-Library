// modules
const fsystem = require("fs");
const express = require("express");
const app = express.Router();
const bcrypt = require("bcrypt");
const Helper = require("../helpers");
// constants
const DATABASE = "database.json";

app.get("/", (req, res) => {
    res.render("register", {title: "Register"});
});
app.post("/", async (req, res) => {
    // get user inputs
    const fname = req.body.fname;
    const email = req.body.email;
    const pwd = req.body.password;
    const c_pwd = req.body.confirm;
    // read the database
    const database = JSON.parse(
        fsystem.readFileSync(DATABASE)
    );
    // check if user already exists
    for (user of database)
    {
        if (user.email == email)
        {
            Helper.error(res, "User already exists");
            process.exit();
        }
    }
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
        // encrypting password
        try {
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
            // push  userdata in the database
            database.push(userData);
            // write database
            fsystem.writeFileSync(
                "database.json", 
                JSON.stringify(database, null, 2), 
                err => {
                    if (err) {
                        Helper.error(err);
                    }
                }
            );
            // go back to homepage
            res.redirect("/");   
        } catch (err) {
            Helper.error(res, err);
        }
    }
});

module.exports = app;