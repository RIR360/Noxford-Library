//const fs = require("fs");
const express = require("express");
const app = express.Router();
const Helper = require("../helpers");
// mongodb
const {MongoClient} = require("mongodb");
const uri = process.env.DATABASE_URL
//const aclient = new MongoClient(uri);
// get method
app.get("/", async (req, res) => { 
    try {
        MongoClient.connect(uri, (err, response) => {
            if (err) throw err;
            response
            .db("Noxford-library")
            .collection("books")
            .findOne({name: req.query.name}, (err, result) => {
                if (err) throw err;
                res.render("pages/books", {title: result.name, book: result});
                response.close();
            });
        });
    } catch (error) {
        Helper.error(res, error);
    }
});

module.exports = app;

/*
Sample document:

{"_id":{"$oid":"61488eaa14e9f65c51a7db18"},"name":"The Golden Compass","author":"Philip Pullman","des":"Lyra is rushing to the cold, far North, where witch clans and armored bears rule. North, where the Gobblers take the children they steal--including her friend Roger. North, where her fearsome uncle Asriel is trying to build a bridge to a parallel world.","pub":{"$numberInt":"1995"},"cover":"covers/the-golden-compass.jpg"}
*/