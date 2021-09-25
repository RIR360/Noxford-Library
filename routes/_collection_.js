//const fs = require("fs");
const express = require("express");
const app = express.Router();
const Helper = require("../helpers");
// mongodb
const {MongoClient} = require("mongodb");
const uri = process.env.DATABASE_URL;
// get method
app.get("/", async (req, res) => { 
    try {
        MongoClient.connect(uri, (err, response) => {
            if (err) throw err;
            response
            .db("Noxford-library")
            .collection("books")
            .find({}).toArray((err, result) => {
                if (err) throw err;
                res.render("pages/collection", {title: "Collection", data: result});
                response.close();
            });
        });
    } catch (error) {
        Helper.error(res, error);
    }
});

module.exports = app;