const mongoose = require("mongoose");

const Question = mongoose.model("Question", {
    title: String,
    categories: [String],
    answers: [String],
    correct: String
});;

module.exports = Question;