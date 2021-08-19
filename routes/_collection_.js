//const fs = require("fs");
const express = require("express");
const app = express.Router();
// get method
app.get("/", (req, res) => {

    const books_data = require("../books.json");
    res.render("collection", {title: "Collection", data: books_data});
});

module.exports = app;