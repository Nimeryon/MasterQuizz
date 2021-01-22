const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const QuestionSchema = new Schema({
    title: String,
    categories: [String],
    answers: [String],
    correct: String
});;
const Question = mongoose.model("Question", QuestionSchema);

const QuestionResolver = {
    question: async ({ id }) => {
        try {
            return Question.findById(id);
        } catch (error) {
            throw error;
        }
    },
    questions: () => {
        try {
            return Question.find();
        } catch (error) {
            throw error;
        }
    },
    createQuestion: async ({ title, answers, correct, categories }) => {
        try {
            const question = new Question({ title, answers, correct, categories });
            await question.save();
            return question;
        } catch (error) {
            throw error;
        }
    },
    updateQuestion: async ({ id, title, answers, correct, categories }) => {
        try {
            await Question.findByIdAndUpdate(id, { title, answers, correct, categories });
            return true;
        } catch (error) {
            throw error;
        }
    },
    deleteQuestion: async ({ id }) => {
        try {
            await Question.findByIdAndRemove(id);
            return true;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = QuestionResolver;