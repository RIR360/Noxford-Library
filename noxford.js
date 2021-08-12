// modules
const fsystem = require("fs");
const express = require("express");
const layouts = require("express-ejs-layouts");
const bcrypt = require("bcrypt");
const Helper = require("./helpers");
// constants
const DATABASE = "database.json";

// app
const app = express();
const port = process.env.PORT || 3000;

// app configurting
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(layouts);
app.use(express.urlencoded({ limit: '10mb', extended: true }));

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
app.post("/login", async (req, res) => {
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
// register
app.get("/register", (req, res) => {
    res.render("register", {title: "Register"});
});
app.post("/register", async (req, res) => {
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