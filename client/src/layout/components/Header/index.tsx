import { Link } from "react-router-dom";
import config from "../../../config";

function Header() {
    return (
        <Link to={config.routes.home}>
            <div className="w-full h-20 flex flex-row justify-center items-center px-10 mb-5 bg-[#00D856] shadow-xs">
                <img className="h-20" src="/header.png" alt="" />
            </div>
        </Link>
    );
}

export default Header;
