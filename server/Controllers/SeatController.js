const Seat = require("../Models/Seat");
const Room = require("../Models/Room");

const getSeatsByRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const seats = await Seat.find({ roomId: roomId }).populate(
      "roomId",
      "name location status"
    );
    if (!seats) {
      return res.status(404).json({ message: "No seats found for this room." });
    }
    return res.status(200).json(seats);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

const bookSeat = async (req, res) => {
  try {
    const { seatId } = req.params;
    const { session, startTime, usageDuration } = req.body;

    // Kiểm tra session đã đặt chỗ nào chưa
    const existingBooking = await Seat.findOne({
      status: "booked",
      session: session,
    });

    if (existingBooking) {
      return res.status(400).json({ message: "Bạn đã đặt một chỗ rồi." });
    }

    // Validate required fields
    if (!session || !startTime || !usageDuration) {
      return res
        .status(400)
        .json({
          message:
            "Missing required fields: session, startTime, or usageDuration",
        });
    }

    // Tìm ghế
    const seat = await Seat.findById(seatId);
    if (!seat) {
      return res.status(404).json({ message: "Seat not found" });
    }

    // Kiểm tra trạng thái ghế
    if (seat.status !== "available") {
      return res
        .status(400)
        .json({
          message: `Seat is not available (current status: ${seat.status})`,
        });
    }

    // Cập nhật thông tin ghế
    seat.status = "booked";
    seat.session = session;
    seat.startTime = new Date(startTime);
    seat.usageDuration = usageDuration;

    await seat.save();

    return res.status(200).json({
      message: "Seat booked successfully",
      seat,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const cancelSeatBooking = async (req, res) => {
  try {
    const { seatId } = req.params;

    // Tìm ghế
    const seat = await Seat.findById(seatId);
    if (!seat) {
      return res.status(404).json({ message: "Seat not found" });
    }

    // Kiểm tra trạng thái ghế
    if (seat.status !== "booked") {
      return res
        .status(400)
        .json({
          message: `Seat is not booked (current status: ${seat.status})`,
        });
    }

    // Cập nhật thông tin ghế
    seat.status = "available";
    seat.session = null;
    seat.startTime = null;
    seat.usageDuration = null;

    await seat.save();

    return res.status(200).json({
      message: "Seat booking canceled successfully",
      seat,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
const getSeatBookingInfo = async (req, res) => {
  try {
    const { seatId } = req.params;

    const seat = await Seat.findById(seatId).populate(
      "roomId",
      "name location"
    );
    if (!seat) {
      return res.status(404).json({ message: "Seat not found" });
    }

    if (seat.status !== "booked" || !seat.startTime || !seat.usageDuration) {
      return res.status(200).json({
        seat,
        remainingMinutes: null,
        message: "Seat is not currently booked",
      });
    }

    const now = new Date();
    const endTime = new Date(
      seat.startTime.getTime() + seat.usageDuration * 60000
    );
    const remainingMs = endTime - now;
    const remainingMinutes = Math.max(Math.ceil(remainingMs / 60000), 0);

     if (remainingMinutes <= 0) {
      seat.status = "available";
      seat.startTime = null;
      seat.usageDuration = null;
      await seat.save();

      return res.status(200).json({
        seat,
        remainingMinutes: null,
        message: "Booking has expired, seat is now available",
      });
    }
    
    return res.status(200).json({
      seat,
      remainingMinutes,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAllBookedSeat = async (req, res) => {
  try {
    const bookedSeats = await Seat.find({ status: "booked" });
    if (!bookedSeats) {
      return res.status(404).json({ message: "No booked seats found." });
    }
    return res.status(200).json(bookedSeats);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getSeatsByRoom,
  bookSeat,
  getSeatBookingInfo,
  getAllBookedSeat,
  cancelSeatBooking,
};
