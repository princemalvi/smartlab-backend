const { Report, validate } = require("../models/report");
const { User } = require("../models/user");
const { Session } = require("../models/session");
const { Response } = require("../models/response");
const { Question } = require("../models/question");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/all", async (req, res) => {
  const userId = req.body.userId;

  const user = await User.findById(userId);
  if (!user) return res.status(400).send("Invalid User!");

  const sessions = await Session.find({ userId: userId });

  const responseData = [];

  for (let i = 0; i < sessions.length; i++) {
    const s = sessions[i];
    const testResponses = await Response.find({
      userId: userId,
      sessionId: s._id,
    });

    const reports = await Report.find({
      userId: userId,
      sessionId: s._id,
    });

    responseData.push({
      session: s,
      testResponses: testResponses,
      reports: reports,
    });
  }

  return res.send(responseData);
});

router.post("/:id", async (req, res) => {
  const id = req.params.id;
  const userId = req.body.userId;

  const report = await Report.find({ userId: userId, _id: id });
  const sessionId = report[0].sessionId;

  const session = await Session.find({ sessionId: sessionId, userId: userId });
  const testResponses = await Response.find({
    sessionId: sessionId,
    userId: userId,
  });

  // const responses = [];

  // for (let i = 0; i < testResponses.length; i++) {
  //   const obj = { ...testResponses[i] };
  //   const question = await Question.findById(obj.questionId);
  //   obj.question = question;
  //   responses.push(question);
  // }

  // const responsesData = {
  //   easy: { correct: 0, incorrect: 0 },
  //   medium: { correct: 0, incorrect: 0 },
  //   hard: { correct: 0, incorrect: 0 },
  // };

  // responsesData.easy.correct = responses.filter(
  //   (r) =>
  //     r.question.difficulty == "easy" && r.question.answer == r.recordedAnswer
  // ).length;
  // responsesData.easy.incorrect = responses.filter(
  //   (r) =>
  //     r.question.difficulty == "easy" && r.question.answer != r.recordedAnswer
  // ).length;

  // responsesData.medium.correct = responses.filter(
  //   (r) =>
  //     r.question.difficulty == "medium" && r.question.answer == r.recordedAnswer
  // ).length;
  // responsesData.medium.incorrect = responses.filter(
  //   (r) =>
  //     r.question.difficulty == "medium" && r.question.answer != r.recordedAnswer
  // ).length;

  // responsesData.hard.correct = responses.filter(
  //   (r) =>
  //     r.question.difficulty == "hard" && r.question.answer == r.recordedAnswer
  // ).length;
  // responsesData.hard.incorrect = responses.filter(
  //   (r) =>
  //     r.question.difficulty == "hard" && r.question.answer != r.recordedAnswer
  // ).length;

  return res.send({
    report: report,
    session: session,
    testResponses: testResponses,
  });
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid User!");

  const session = await Session.find({
    _id: req.body.sessionId,
    userId: user._id,
  });
  if (!session) return res.status(400).send("Invalid Session!");

  const report = new Report({
    userId: user._id,
    sessionId: req.body.sessionId,
    responses: req.body.responses ? req.body.responses : [],
  });

  await report.save();

  return res.send(report);
});

router.put("/:id", async (req, res) => {
  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid User!");

  const session = await Session.find({
    _id: req.body.sessionId,
    userId: user._id,
  });
  if (!session) return res.status(400).send("Invalid Session!");

  const reportId = req.params.id;

  let report = null;

  try {
    report = await Report.findById(reportId);
  } catch (_) {
    report = new Report({
      userId: user._id,
      sessionId: req.body.sessionId,
      responses: [],
    });
  }

  if (!report)
    report = new Report({
      userId: user._id,
      sessionId: req.body.sessionId,
      responses: [],
    });

  if (req.body.response) report.responses.push(req.body.response);

  await report.save();

  return res.send(report);
});

module.exports = router;
