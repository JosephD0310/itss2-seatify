const express = require("express");
const router = express.Router();
const { getSeatsByRoom, bookSeat, getSeatBookingInfo, getAllBookedSeat } = require("../Controllers/SeatController");

router.get("/:roomId", getSeatsByRoom);  // Thêm roomId vào URL
router.post("/book/:seatId", bookSeat);
router.get("/book/:seatId", getSeatBookingInfo);
router.get("/book", getAllBookedSeat); // Lấy tất cả ghế đã đặt
module.exports = router;
