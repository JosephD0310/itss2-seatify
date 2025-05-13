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

module.exports = { getSeatsByRoom };
