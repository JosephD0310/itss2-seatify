const Seat = require("../Models/Seat");  
const Room = require("../Models/Room");  

const getSeatsByRoom = async (req, res) => {
    try {
        const { roomId } = req.params;  
        const seats = await Seat.find({ roomId: roomId }).populate("roomId", "name location status");  
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

        // Validate required fields
        if (!session || !startTime || !usageDuration) {
            return res.status(400).json({ message: "Missing required fields: session, startTime, or usageDuration" });
        }

        // Tìm ghế
        const seat = await Seat.findById(seatId);
        if (!seat) {
            return res.status(404).json({ message: "Seat not found" });
        }

        // Kiểm tra trạng thái ghế
        if (seat.status !== "available") {
            return res.status(400).json({ message: `Seat is not available (current status: ${seat.status})` });
        }

        // Cập nhật thông tin ghế
        seat.status = "booked";
        seat.session = session;
        seat.startTime = new Date(startTime);
        seat.usageDuration = usageDuration;

        await seat.save();

        return res.status(200).json({
            message: "Seat booked successfully",
            seat
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getSeatsByRoom, bookSeat };
