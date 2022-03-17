const _ = require("lodash");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/me", async (req, res) => {
    const user = await User.findById(req.body._id).select("-password");
    res.send(user);
});

router.post("/login", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email, password: req.body.password });
    if (!user) return res.status(400).send("Invalid credentials!");

    res.send(_.pick(user, ["_id", "email"]));
});

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");

    user = new User(_.pick(req.body, ["email", "password"]));
    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    res.send(_.pick(user, ["_id", "email"]));
});

module.exports = router;
