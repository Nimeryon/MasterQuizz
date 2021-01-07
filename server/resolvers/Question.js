// Models
const Question = require("../models/Question");

const resolver = {
    Query: {
        question: async (_, { id }) => {
            return Question.findById(id);
        },
        questions: () => Question.find()
    },
    Mutation: {
        createQuestion: async (_, { title, answers, correct, categories }) => {
            const question = new Question({ title, answers, correct, categories });
            await question.save();
            return question;
        },
        updateQuestion: async (_, { id, title, answers, correct, categories }) => {
            await Question.findByIdAndUpdate(id, { title, answers, correct, categories });
            return true;
        },
        deleteQuestion: async (_, { id }) => {
            await Question.findByIdAndRemove(id);
            return true;
        }
    }
};

module.exports = resolver;