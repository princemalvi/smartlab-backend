const Joi = require("joi");
const joiObjectid = require("joi-objectid");
const mongoose = require("mongoose");
Joi.objectId = require("joi-objectid")(Joi);

const reportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  sessionId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  responses: {
    type: Array,
    default: [],
  },
  timestamp: {
    type: Date,
    default: new Date(),
  },
});

const Report = mongoose.model("Report", reportSchema);

function validateReport(report) {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    sessionId: Joi.objectId().required(),
    responses: Joi.array(),
  });

  return schema.validate(report);
}

exports.Report = Report;
exports.ReportSchema = reportSchema;
exports.validate = validateReport;
