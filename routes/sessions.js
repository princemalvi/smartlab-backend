const { Session } = require("../models/session");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/create", async (req, res) => {
    if (!req.body.userId) return res.status(400).send("User ID required!");

    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send("Invalid User!");

    const session = new Session({
        userId: user._id,
    });

    await session.save();

    return res.send(session);
});

router.get("/", async (req, res) => {
    const users = await User.find({}).select("-password");
    let userSessions = [];

    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const sessions = await Session.find({ userId: user._id });
        userSessions.push({ user: user, sessions: sessions });
    }

    // const sessions = await Session.find({}).sort({ userId: 1 });
    res.send(userSessions);
});

router.put("/:id", async (req, res) => {
    const sessionId = req.params.id;
    const session = await Session.findById(sessionId);
    if (!session) return res.status(400).send("Invalid Session!");

    if (!req.body.page || !req.body.timespent) return res.status(400).send('"page" & "timespent" are required!');

    const footprints = session.footprints;
    const doUpdate = footprints.length > 0 && footprints[footprints.length - 1].page == req.body.page;

    // Update the Footprint
    if (doUpdate) {
        footprints[footprints.length - 1].timespent = req.body.timespent;
    } else {
        // create new footprint
        footprints.push({
            page: req.body.page,
            timespent: req.body.timespent
        });
    }

    const newSession = await Session.findByIdAndUpdate(
        session._id,
        { footprints },
        { new: true },
    );

    res.send(newSession);
});

module.exports = router;
