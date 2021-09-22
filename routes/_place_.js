const express = require("express");
const app = express.Router();
const Helper = require("../helpers");
// get dashboard
app.get("/", (req, res) => {
    if (req.session.userId != null) {

        Helper.log(res, req.session.userId);
        
    } else {
        res.render("member/login",  {
            title:"Login", 
            flash: "Failed to place hold: Must be User",
            type: "danger"
        });
    }
});

module.exports = app;