const cron = require("node-cron");
const Seat = require("../Models/Seat");

// Cronjob: chạy mỗi phút (*/1 * * * *) để kiểm tra ghế hết hạn đặt
const autoReleaseExpiredSeats = cron.schedule("*/1 * * * *", async () => {
  try {
    const now = new Date();

    // Lọc các ghế đang được đặt và có đủ thông tin cần thiết
    const bookedSeats = await Seat.find({
      status: "booked",
      startTime: { $ne: null },
      usageDuration: { $ne: null },
      session: { $ne: null }
    });

    for (const seat of bookedSeats) {
      // Kiểm tra nếu startTime và usageDuration là hợp lệ
      if (!seat.startTime || !seat.usageDuration) continue;

      const endTime = new Date(seat.startTime.getTime() + seat.usageDuration * 60000);

      // Nếu thời gian hiện tại đã vượt qua endTime → giải phóng ghế
      if (now >= endTime) {
        seat.status = "available";
        seat.startTime = null;
        seat.usageDuration = null;
        seat.session = null;

        await seat.save();
        console.log(`[AUTO-RELEASE] Seat ${seat._id} released at ${now.toISOString()}`);
      }
    }
  } catch (err) {
    console.error("[AUTO-RELEASE ERROR]:", err);
  }
});

module.exports = autoReleaseExpiredSeats;
