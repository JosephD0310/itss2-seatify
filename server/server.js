require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db.js");
const Room = require("./Models/Room.js");
const Seat = require("./Models/Seat.js");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
connectDB();
app.get("/", (req, res) => {
    res.send("🚀 API đang chạy!");
});

app.listen(port, () => {
    console.log(`Server chạy tại http://localhost:${port}`);
});