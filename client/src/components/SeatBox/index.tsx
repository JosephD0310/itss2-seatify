import React from 'react';

interface SeatProps {
    seatNumber: string;
    isSelected: boolean;
    status: string;
    onClick: (seatNumber: string) => void;
}

const Seat: React.FC<SeatProps> = ({ seatNumber, isSelected, status, onClick }) => {
       const bgColor =  status === 'booked'
            ? 'bg-red-500 text-white'
            : 'bg-gray-300 text-black';

    return (
        <div
            onClick={() => onClick(seatNumber)}
            className={`w-12 h-12 flex items-center justify-center rounded-xl cursor-pointer text-2xl font-bold transition-colors duration-200 shadow-xs hover:bg-gray-400 ${isSelected ? 'bg-green-500 text-white' : 'bg-gray-300'
                } ${bgColor} `}
        >
            {seatNumber}
        </div>
    );
};

export default Seat;
