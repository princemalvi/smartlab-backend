const express = require("express");
const cors = require("cors");
const users = require("../routes/users");
const sessions = require("../routes/sessions");
const responses = require("../routes/responses");
const questions = require("../routes/questions");
const reports = require("../routes/reports");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/sessions", sessions);
  app.use("/api/responses", responses);
  app.use("/api/questions", questions);
  app.use("/api/reports", reports);
};
