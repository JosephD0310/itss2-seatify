import { useEffect, useState } from 'react';
import RoomCard from '../../components/RoomCard';
import useFetch from '../../services/hooks/useFetch';
import type { RoomData } from '../../types/roomdata';

function Home() {
    const { data, loading } = useFetch<RoomData[]>('http://localhost:3000/rooms');

    const [room, setRooms] = useState<RoomData[]>([]);

    useEffect(() => {
        if (data) {
            setRooms(data);
        }
    }, [data]);

    return (
        <div>
            <h2 className="font-bold text-4xl">Theo dõi danh sách phòng tự học</h2>
            <div className="flex flex-wrap gap-10 p-10 w-full">
                {loading ? (
                    'Loading please wait...'
                ) : (
                    room.map((item) => <RoomCard key={item._id} item={item} />)
                )}
            </div>
        </div>
    );
}

export default Home;
