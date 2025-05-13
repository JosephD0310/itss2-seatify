import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
type StatusProps = {
    content: string;
    option?: 'icon' | 'bg'; 
};

function Status({ content, option = 'icon' }: StatusProps) {
    const upperContent = content.toUpperCase();

    const bgColor =
        content === 'Mở'
            ? 'bg-[#DCFCE7] text-green-700'
            : content === 'Đóng'
            ? 'bg-[#FEF3C7] text-yellow-700'
            : 'bg-[#F3F4F6] text-gray-600';

    const iconColor = content === 'Mở' ? '#00D856' : content === 'Đóng' ? '#EB5624' : '#D4DBE6';

    return (
        <div className={`flex items-center`}>
            {option === 'icon' && <FontAwesomeIcon icon={faCircle} className="text-sm" color={iconColor} />}
            <div className={`rounded-full text-xl font-bold px-3 py-1 text-gray-700 ${option === 'bg' ? bgColor : ''}`}>
                {upperContent}
            </div>
        </div>
    );
}

export default Status;
