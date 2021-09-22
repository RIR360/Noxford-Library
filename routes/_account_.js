const express = require("express");
const app = express.Router();
// mongodb
const {MongoClient} = require("mongodb");
const uri = process.env.DATABASE_URL
const client = new MongoClient(uri);
// get dashboard
app.get("/", async (req, res) => {
    if (req.session.userId != null) {

        // connect to database
        await client.connect();
        // find the user 
        const result = await client
        .db("Noxford-library")
        .collection("users")
        .findOne({
            "userId": req.session.userId
        });

        res.render("member/account", {title: "Account", user: result});
    } else {
        res.redirect("/login");
    }
});

module.exports = app;