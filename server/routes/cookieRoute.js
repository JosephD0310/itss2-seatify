const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

router.post("/create", (req, res) => {
    const sessionId = uuidv4(); // Tạo mã định danh duy nhất

    res.cookie("sessionId", sessionId, {
        maxAge: 30 * 60 * 1000, // 30 phút
        httpOnly: true, // cookie chỉ được gửi trong request, không truy cập từ JS
        sameSite: "strict" // bảo mật CSRF
    });

    res.status(200).json({
        message: "Session created successfully",
        sessionId
    });
});

module.exports = router;