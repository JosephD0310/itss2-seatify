const express = require("express");
const router = express.Router();
const { getAllRooms } = require("../Controllers/RoomController.js");

router.get("/", getAllRooms); // GET /rooms

module.exports = router;
