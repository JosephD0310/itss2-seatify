import React from 'react';

interface SeatProps {
    seatNumber: string;
    isSelected: boolean;
    onClick: (seatNumber: string) => void;
}

const Seat: React.FC<SeatProps> = ({ seatNumber, isSelected, onClick }) => {
    return (
        <div
            onClick={() => onClick(seatNumber)}
            className={`w-12 h-12 flex items-center justify-center rounded-xl cursor-pointer text-2xl font-bold transition-colors duration-200 shadow-xs hover:bg-gray-400 ${
                isSelected ? 'bg-green-500 text-white' : 'bg-gray-300'
            }`}
        >
            {seatNumber}
        </div>
    );
};

export default Seat;
