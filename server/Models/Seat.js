const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true
    },
    status: {
        type: String, // "available", "booked", "broken"
        default: "available"
    },
    session: {
        type: String, // "morning", "afternoon", "evening"
    },
    startTime: {
        type: Date
    },
    usageDuration: {
        type: Number // tính bằng phút hoặc giờ
    }
});

module.exports = mongoose.model("Seat", seatSchema);
