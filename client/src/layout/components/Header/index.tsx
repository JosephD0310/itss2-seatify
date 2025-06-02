import { Link } from 'react-router-dom';
import config from '../../../config';

function Header() {
    return (
        <div className="w-full h-20 flex flex-row justify-center items-center px-10 mb-5 bg-[#00D856] shadow-xs">
            <Link to={config.routes.home}>
                <img className="h-20" src="/header.png" alt="" />
            </Link>
        </div>
    );
}

export default Header;
