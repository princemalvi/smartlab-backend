const Joi = require("joi");
const mongoose = require("mongoose");
Joi.objectId = require('joi-objectid')(Joi);

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    options: {
        type: Array,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    page: {
        type: String,
        required: true
    }
});

const Question = mongoose.model("Question", questionSchema);

function validateQuestion(question) {
    const schema = Joi.object({
        question: Joi.string().required(),
        options: Joi.array().required(),
        answer: Joi.string().required(),
        difficulty: Joi.string().required(),
        page: Joi.string().required(),
    });

    return schema.validate(question);
}

exports.Question = Question;
exports.questionSchema = questionSchema;
exports.validate = validateQuestion;
