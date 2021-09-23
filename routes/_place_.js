const express = require("express");
const app = express.Router();
const Helper = require("../helpers");
// mongodb
const {MongoClient} = require("mongodb");
const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri);
// place hold
app.post("/", async (req, res) => {
    if (req.session.userId != null) {
        try {
            // connect to database
            await client.connect();
            // getting the state to generate id number
            const stat = await client
                .db("Noxford-library")
                .collection("holdings")
                .stats();
            let idNum =  stat.count + 1;
            // buidling placement data
            const placeData = {
                holding: "hold_" + req.session.userId + idNum,
                user: req.session.userId,
                book: req.body.book,
                time: new Date().toLocaleString(),
                platform: req.body.platform,
                picked: false
            };
            // push data into
            await client
            .db("Noxford-library")
            .collection("holdings")
            .insertOne(placeData);
            // holding placement done
            res.render("member/dashboard", {
                title:"Dashboard", 
                flash: "Placement Success",
                type: "success"
            });
        } catch (err) {
            Helper.error(res, err);
        } finally {
            // close the mongo client here
            await client.close();
        } 
    } else {
        res.render("member/login",  {
            title:"Login", 
            flash: "Failed to place hold: Must be User",
            type: "danger"
        });
    }
});

module.exports = app;