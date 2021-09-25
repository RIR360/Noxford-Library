const express = require("express");
const app = express.Router();
const Helper = require("../helpers");
// mongodb
const {MongoClient} = require("mongodb");
const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri);
// string sanitizer
function sanitize(str){
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    return str.trim();
}
// search normal page
app.get("/",(req, res) => {
    res.render("pages/search", {title: "Search", data: null});
});
// search result page
app.post("/", async (req, res) => {
    try {
        var sort_method;
        if (req.body.sort == "name")
            sort_method = {name: 1};
        else if (req.body.sort == "pub")
            sort_method = {pub: 1};
        else if (req.body.sort == "stars")
            sort_method = {stars: 1};
        // search database
        MongoClient.connect(uri, (err, response) => {
            if (err) throw err;
            response
            .db("Noxford-library")
            .collection("books")
            .find({name: {$regex : sanitize(req.body.search), '$options': 'i'}})
            .sort(sort_method)
            .toArray((err, result) => {
                if (err) throw err;
                res.render("pages/search", {title: "Search", data: result});
                response.close();
            });
        });
    } catch (err) {
        Helper.error(res, err);
    } finally {
        // close the mongo client here
        await client.close();
    }
});

module.exports = app;