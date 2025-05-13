const express = require("express");
const router = express.Router();
const { getSeatsByRoom } = require("../Controllers/SeatController");

router.get("/:roomId", getSeatsByRoom);  // Thêm roomId vào URL

module.exports = router;
