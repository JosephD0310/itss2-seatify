const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

router.post("/create", (req, res) => {
    const existingSessionId = req.cookies.sessionId;

    if (existingSessionId) {
        return res.status(200).json({
            message: "Session already exists",
            sessionId: existingSessionId
        });
    }

    const newSessionId = uuidv4();

    res.cookie("sessionId", newSessionId, {
        maxAge: 30 * 60 * 1000, // 30 phút
        httpOnly: false,
        sameSite: "none",
        secure: true
    });

    res.status(200).json({
        message: "Session created successfully",
        sessionId: newSessionId
    });
});

module.exports = router;
