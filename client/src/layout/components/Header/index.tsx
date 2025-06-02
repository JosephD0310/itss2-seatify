import { Link } from 'react-router-dom';
import config from '../../../config';
import { useEffect, useState } from 'react';

function Header() {
    const [bookedSeat, setBookedSeat] = useState<string | null>(null);
    const [currentRoom, setCurrentRoom] = useState<string | null>(null);
    const [currentLocation, setCurrentLocation] = useState<string | null>(null);

    // Đọc thông tin ghế đã đặt từ sessionStorage
    useEffect(() => {
        const updateBookedSeat = () => {
            const seat = sessionStorage.getItem("currentBookedSeat");
            const room = sessionStorage.getItem("currentRoom");
            setBookedSeat(seat);
            setCurrentRoom(room);
        };

        updateBookedSeat();

        // Theo dõi sự kiện thay đổi sessionStorage từ Room
        window.addEventListener('storage', updateBookedSeat);

        return () => {
            window.removeEventListener('storage', updateBookedSeat);
        };
    }, []);

    // Cập nhật lại khi user quay lại hoặc reload
    useEffect(() => {
        const interval = setInterval(() => {
            const seat = sessionStorage.getItem("currentBookedSeat");
            const room = sessionStorage.getItem("currentRoom");
            setBookedSeat(seat);
            setCurrentRoom(room);
        }, 1000); // cập nhật mỗi giây nếu có thay đổi

        return () => clearInterval(interval);
    }, []);
    
    return (
        <div className="w-full h-20 flex flex-row justify-center items-center px-10 mb-5 bg-[#00D856] shadow-xs relative">
            <Link to={config.routes.home}>
                <img className="h-20" src="/header.png" alt="" />
            </Link>

            {/* Hiển thị ghế đã đặt */}
            {bookedSeat && (
                <div className="absolute right-10 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-lg shadow text-black font-semibold">
                    Đã đặt ghế: <span className="text-green-600">{bookedSeat} {currentLocation}-{currentRoom}</span>
                </div>
            )}
        </div>
    );
}

export default Header;
