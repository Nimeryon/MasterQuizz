const mongoose = require("mongoose");

const Categorie = mongoose.model("Categorie", {
    title: String
});

module.exports = Categorie;