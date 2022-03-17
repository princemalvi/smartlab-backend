const Joi = require("joi");
const mongoose = require("mongoose");
Joi.objectId = require('joi-objectid')(Joi);

const responseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    sessionId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    questionId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    recordedAnswer: {
        type: String,
        required: true,
        default: null,
    },
    timestamp: {
        type: Date,
        required: true,
    },
    timetaken: {
        type: Number,
        reuqired: true
    }
});

const Response = mongoose.model("Response", responseSchema);

function validateResponse(response) {
    const schema = Joi.object({
        userId: Joi.objectId().required(),
        sessionId: Joi.objectId().required(),
        questionId: Joi.objectId().required(),
        recordedAnswer: Joi.string().required(),
        timetaken: Joi.number().required(),
    });

    return schema.validate(response);
}

exports.Response = Response;
exports.responseSchema = responseSchema;
exports.validate = validateResponse;
