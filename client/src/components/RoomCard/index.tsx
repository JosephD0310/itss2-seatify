import { Link } from 'react-router-dom';
import Status from '../Status';
import config from '../../config';
import type { RoomData } from '../../types/roomdata';

type RoomCardProps = {
    item: RoomData
}

function RoomCard({ item }: RoomCardProps) {
    return (
        <Link key={item._id} to={config.routes.generateRoomDetail(item._id)} state={item}>
            <div className="bg-white w-[300px] rounded-2xl shadow-xs px-7 py-5">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-row gap-5 items-center">
                        <img className="w-36 rounded-2xl" src="./room.png" alt="" />
                        <div className="w-full">
                            <div className="w-full flex flex-row justify-between items-center">
                                <p className="text-3xl font-bold">Phòng {item.name}</p>
                                <Status content={item.status === "available" ? "Mở" : "Đóng"} />
                            </div>
                            <div className="mt-3">
                                <p>Vị trí: {item.location}</p>
                                <p>Chỗ trống: {item.availableSeats}/{item.totalSeats}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default RoomCard;
