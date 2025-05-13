require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db.js");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());
connectDB();

app.use("/rooms", require("./routes/roomRoute"));
app.use("/seats", require("./routes/seatRoute"));
app.get("/", (req, res) => {
  res.send("🚀 API đang chạy!");
});

app.listen(port, () => {
  console.log(`Server chạy tại http://localhost:${port}`);
});
