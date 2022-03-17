const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
    const db = config.get("db");
    console.log(`Trying to connect '${db}'...`);
    mongoose.connect(db).then(() => console.log(`Connected to '${db}'...`));
}