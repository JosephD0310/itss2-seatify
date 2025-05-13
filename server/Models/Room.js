const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "active"
    }
});

module.exports = mongoose.model("Room", roomSchema);
