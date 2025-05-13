const express = require("express");
const router = express.Router();
const { getSeatsByRoom, bookSeat } = require("../Controllers/SeatController");

router.get("/:roomId", getSeatsByRoom);  // Thêm roomId vào URL
router.post("/book/:seatId", bookSeat);
module.exports = router;
