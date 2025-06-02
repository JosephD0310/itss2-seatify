import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import { faChevronRight, faDoorOpen, faPlugCircleBolt } from '@fortawesome/free-solid-svg-icons';
import config from '../../config';
import type { RoomData } from '../../types/roomdata';
import useFetch from '../../services/hooks/useFetch';
import type { SeatData } from '../../types/seatdata';
import Seat from '../../components/SeatBox';
import { useEffect, useState } from 'react';
import Status from '../../components/Status';
import CountdownTimer from '../../components/CountdownTimer';

function Room() {
    const sessionId = localStorage.getItem('sessionId');
    console.log(sessionId);
    const location = useLocation();
    const item = location.state as RoomData;

    const { data, reFetch } = useFetch<SeatData[]>('https://itss2-seatify-tevf.onrender.com/seats/' + item._id);

    const [seat, setSeats] = useState<SeatData[]>([]);

    const [duration, setDuration] = useState<number>(0);

    const [countdown, setCountdown] = useState<number>(0);
    const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
    const [selectedSeatData, setSelectedSeatData] = useState<SeatData | null>(null);

    useEffect(() => {
        if (data) {
            const now = new Date();

            const enrichedSeats = data.map((s) => {
                let timeRemaining = null;
                if (s.status === 'booked' && s.startTime && s.usageDuration) {
                    const start = new Date(s.startTime);
                    const end = new Date(start.getTime() + s.usageDuration * 60000);
                    const remaining = Math.floor((end.getTime() - now.getTime()) / 1000);
                    timeRemaining = Math.max(remaining, 0);
                }

                return { ...s, timeRemaining };
            });

            setSeats(enrichedSeats);
        }
    }, [data]);

    useEffect(() => {
        if (selectedSeat && data) {
            const updated = data.find((s) => s.code === selectedSeat) || null;
            setSelectedSeatData(updated);
        }
    }, [data, selectedSeat]);

    const handleBooking = async () => {
        if (!selectedSeatData || duration < 10) {
            alert('Vui lòng nhập thời gian hợp lệ (>= 10 phút)');
            return;
        }
        if (!selectedSeatData || duration > 180) {
            alert('Vui lòng nhập thời gian hợp lệ (<= 180 phút)');
            return;
        }
        const now = new Date();
        const startTime = now.toISOString();
        const payload = {
            session: sessionId,
            startTime,
            usageDuration: duration,
        };
        console.log('Booking payload:', payload);
        try {
            const res = await fetch(`https://itss2-seatify-tevf.onrender.com/seats/book/${selectedSeatData._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (res.ok) {
                alert('Đặt chỗ thành công!');
                await reFetch();
                setCountdown(duration * 60); // đếm ngược theo giây
            } else {
                alert(`Lỗi: ${result.message}`);
            }
        } catch (error) {
            console.error('Booking error:', error);
            alert('Đặt chỗ thất bại!');
        }
    };
    useEffect(() => {
        if (!countdown) return;

        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (!prev) return 0;
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [countdown]);

    const handleSeatClick = async (seatId: string) => {
        if (selectedSeat === seatId) {
            setSelectedSeat(null);
            setSelectedSeatData(null);
        } else {
            await reFetch();
            const clickedSeat = seat.find((s) => s.code === seatId) || null;
            setSelectedSeat(seatId);
            setSelectedSeatData(clickedSeat);
            console.log(clickedSeat);
            setCountdown(clickedSeat?.timeRemaining ?? 0);
            console.log('Remaining time:', clickedSeat?.timeRemaining);
        }
    };

    const handleReturn = async () => {
        if (!selectedSeatData) return;

        try {
            const res = await fetch(`https://itss2-seatify-tevf.onrender.com/seats/return/${selectedSeatData._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ session: sessionId }),
            });

            const result = await res.json();

            if (res.ok) {
                alert('Trả chỗ thành công!');
                await reFetch();
                setCountdown(0);
            } else {
                alert(`Lỗi: ${result.message}`);
            }
        } catch (error) {
            console.error('Return error:', error);
            alert('Trả chỗ thất bại!');
        }
    };

    return (
        <div>
            <div className="flex flex-row items-center gap-5">
                <Link to={config.routes.home} className="font-bold text-4xl">
                    Danh sách phòng tự học
                </Link>
                <FontAwesomeIcon icon={faChevronRight} />
                <h2 className="font-bold text-4xl">Phòng {item.name}</h2>
            </div>
            <div className="mx-10 mt-10 bg-white rounded-2xl shadow-xs p-10">
                <div className="flex flex-row justify-around">
                    <div className="flex flex-col items-center">
                        <h2 className="font-bold">Vị trí chỗ ngồi</h2>
                        <div className="mt-10 flex flex-row gap-10">
                            <div className="flex flex-col gap-2 justify-around">
                                <FontAwesomeIcon icon={faPlugCircleBolt} />
                                <FontAwesomeIcon icon={faPlugCircleBolt} />
                                <FontAwesomeIcon icon={faPlugCircleBolt} />
                                <FontAwesomeIcon icon={faPlugCircleBolt} />
                                <FontAwesomeIcon icon={faPlugCircleBolt} />
                            </div>
                            <div className="grid grid-cols-4 gap-x-10 gap-y-5">
                                {[...seat]
                                    .sort((a, b) => {
                                        const colA = a.code[0]; // chữ cái
                                        const colB = b.code[0];
                                        const rowA = parseInt(a.code.slice(1)); // số
                                        const rowB = parseInt(b.code.slice(1));

                                        // Ưu tiên theo hàng (số) tăng dần
                                        if (rowA !== rowB) return rowA - rowB;
                                        // Nếu cùng hàng, sắp theo cột (chữ) tăng dần
                                        return colA.localeCompare(colB);
                                    })
                                    .map((item) => (
                                        <Seat
                                            key={item.code}
                                            seatNumber={item.code}
                                            status={item.status}
                                            isSelected={selectedSeat === item.code}
                                            onClick={handleSeatClick}
                                        />
                                    ))}
                            </div>

                            <div className="flex flex-col gap-2 justify-around">
                                <FontAwesomeIcon icon={faPlugCircleBolt} />
                                <FontAwesomeIcon icon={faPlugCircleBolt} />
                                <FontAwesomeIcon icon={faPlugCircleBolt} />
                                <FontAwesomeIcon icon={faPlugCircleBolt} />
                                <FontAwesomeIcon icon={faPlugCircleBolt} />
                            </div>
                        </div>
                        <span className="mt-5">
                            <FontAwesomeIcon icon={faDoorOpen} />
                            <span className="ml-2">Cửa ra vào</span>
                        </span>
                    </div>
                    <div className="border-5 border-[#00D856] p-10 rounded-2xl flex flex-col items-center gap-5">
                        <div className="w-[300px] px-7 py-5 border-b-3 border-[#00D856]">
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-row gap-5 items-center">
                                    <img className="w-36 rounded-2xl" src="/room.png" alt="" />
                                    <div className="w-full">
                                        <div className="w-full flex flex-row justify-between items-center">
                                            <p className="text-3xl font-bold">Phòng {item.name}</p>
                                            <Status content={item.status === 'available' ? 'Mở' : 'Đóng'} />
                                        </div>
                                        <div className="mt-3">
                                            <p>Vị trí: {item.location}</p>
                                            <p>
                                                Chỗ trống: {item.availableSeats}/{item.totalSeats}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-3xl">Thông tin chỗ ngồi</p>
                        <p className="font-bold text-4xl">{selectedSeatData?.code}</p>

                        {/* Nếu chỗ đang được chọn và đang rảnh => form đặt chỗ */}
                        {selectedSeatData?.status === 'available' && (
                            <div className="flex flex-col items-center gap-4 mt-4">
                                <label className="text-3xl font-semibold">Đặt thời gian:</label>
                                <div className="flex flex-row items-center gap-2">
                                    <input
                                        type="number"
                                        min="10"
                                        step="10"
                                        placeholder="Nhập số phút"
                                        value={duration}
                                        onChange={(e) => setDuration(parseInt(e.target.value))}
                                        className="border border-gray-300 rounded px-4 py-2 w-40 text-3xl placeholder:text-base leading-normal"
                                    />
                                    <span className="text-3xl">phút</span>
                                </div>
                                <button
                                    className="mt-25 bg-green-500 text-white text-3xl font-bold px-6 py-3 rounded hover:bg-green-600"
                                    onClick={handleBooking}
                                >
                                    Đặt chỗ
                                </button>
                            </div>
                        )}

                        {/* Nếu chỗ đã được đặt => hiện thời gian đếm ngược và nút trả chỗ nếu đúng người */}
                        {selectedSeatData?.status === 'booked' && (
                            <CountdownTimer
                                initialSeconds={countdown}
                                showReturnButton={selectedSeatData?.session === sessionId}
                                onReturn={handleReturn}
                                onExpire={() => {
                                    setCountdown(0);
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Room;
