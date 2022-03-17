const { Response, validate } = require("../models/response");
const { User } = require("../models/user");
const { Session } = require("../models/session");
const { Question } = require("../models/question");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send("Invalid User!");

    const session = await Session.find({ _id: req.body.sessionId, userId: user._id });
    if (!session) return res.status(400).send("Invalid Session!");

    const question = await Question.find({ _id: req.body.questionId });
    if (!question) return res.status(400).send("Invalid Question!");

    const response = new Response({
        userId: user._id,
        sessionId: req.body.sessionId,
        questionId: req.body.questionId,
        recordedAnswer: req.body.recordedAnswer,
        timestamp: new Date().toISOString(),
        timetaken: req.body.timetaken
    });

    await response.save();

    return res.send(response);
});

module.exports = router;
