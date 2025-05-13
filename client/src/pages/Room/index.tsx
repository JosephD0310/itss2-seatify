import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import config from "../../config";
import type { RoomData } from "../../types/roomdata";

function Room() {
    const location = useLocation();
    const item = location.state as RoomData;
    return (
        <div className="p-10">
            <div className="flex flex-row items-center gap-5">
                <Link to={config.routes.home} className="font-medium text-4xl">
                    Danh sách phòng tự học
                </Link>
                <FontAwesomeIcon icon={faChevronRight} />
                <h2 className="font-bold text-4xl">Phòng {item.name}</h2>
            </div>
            <div className="mx-10 mt-10 bg-white rounded-2xl shadow-xs p-10">
                
            </div>
        </div>
    );
}

export default Room;
