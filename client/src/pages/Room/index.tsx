import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import config from '../../config';
import type { RoomData } from '../../types/roomdata';
import useFetch from '../../services/hooks/useFetch';
import type { SeatData } from '../../types/seatdata';
import Seat from '../../components/SeatBox';
import { useEffect, useState } from 'react';
import Status from '../../components/Status';

function Room() {
    const location = useLocation();
    const item = location.state as RoomData;

    const { data, loading } = useFetch<SeatData[]>('http://localhost:3000/seats/' + item._id);

    const [seat, setSeats] = useState<SeatData[]>([]);

    useEffect(() => {
        if (data) {
            setSeats(data);
        }
    }, [data]);

    const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

    const handleSeatClick = (seatNumber: string) => {
        setSelectedSeat((prev) => (prev === seatNumber ? null : seatNumber));
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
                        <div className="mt-10 grid grid-cols-4 gap-x-10 gap-y-5">
                            {loading
                                ? 'Loading please wait...'
                                : seat.map((item) => (
                                      <Seat
                                          key={item.code}
                                          seatNumber={item.code}
                                          isSelected={selectedSeat === item.code}
                                          onClick={handleSeatClick}
                                      />
                                  ))}
                        </div>
                    </div>
                    <div className="border-5 border-[#00D856] p-10 rounded-2xl flex flex-col items-center gap-5">
                        <div className="w-[300px] px-7 py-5 border-b-3 border-[#00D856]">
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-row gap-5 items-center">
                                    <img className="w-36 rounded-2xl" src="./room.png" alt="" />
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
                        <p className="font-bold text-4xl">{selectedSeat}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Room;
