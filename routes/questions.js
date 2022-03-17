const { Question } = require("../models/question");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/:page", async (req, res) => {
    const page = req.params.page;
    const questions = await Question.find({ page: page });
    res.send(questions);
});

module.exports = router;
