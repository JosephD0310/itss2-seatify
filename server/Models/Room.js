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
    seatsCount: {
        type: Number,
        required: true
    },
    status: {
        type: String, // ví dụ: "active", "maintenance"
        default: "active"
    }
});

module.exports = mongoose.model("Room", roomSchema);
