require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db.js");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'https://itss2-seatify.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true, // Cho phép gửi cookie
}));
app.use(express.json());
app.use(cookieParser());
connectDB();

app.use("/rooms", require("./routes/roomRoute"));
app.use("/seats", require("./routes/seatRoute"));
app.use("/cookies", require("./routes/cookieRoute"));
app.get("/", (req, res) => {
  res.send("🚀 API đang chạy!");
});

app.listen(port, () => {
  console.log(`Server chạy tại http://localhost:${port}`);
});
