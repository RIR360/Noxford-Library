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
        // find stats
        const books_count = await client
        .db("Noxford-library")
        .collection("holdings")
        .count({user: req.session.userId});
        // render account page
        res.render("member/account", {
            title: "Account", 
            user: result, 
            books: books_count
        });
        // close connection
        await client.close();
    } else {
        res.redirect("/login");
    }
});

module.exports = app;