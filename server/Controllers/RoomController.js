const Room = require("../Models/Room");
const Seat = require("../Models/Seat");

// GET /rooms - Lấy danh sách phòng kèm số ghế trống
exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find();

        const roomsWithSeatStats = await Promise.all(rooms.map(async (room) => {
            const totalSeats = await Seat.countDocuments({ roomId: room._id });
            const availableSeats = await Seat.countDocuments({ roomId: room._id, status: "available" });

            return {
                _id: room._id,
                name: room.name,
                location: room.location,
                status: room.status,
                totalSeats,
                availableSeats
            };
        }));

        res.json(roomsWithSeatStats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "error", error: error.message });
    }
};