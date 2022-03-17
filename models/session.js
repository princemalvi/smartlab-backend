const { userSchema } = require("./user");
const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        unique: false,
    },
    footprints: {
        type: Array,
        default: [],
    },
});

const Session = mongoose.model("Session", sessionSchema);

exports.Session = Session;
