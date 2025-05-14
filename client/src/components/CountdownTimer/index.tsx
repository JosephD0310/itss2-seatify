// src/components/CountdownTimer.tsx
import { useEffect, useState } from 'react';

type CountdownTimerProps = {
    initialSeconds: number;
    onExpire?: () => void;
    showReturnButton?: boolean;
    onReturn?: () => void;
};

const CountdownTimer = ({ initialSeconds, onExpire, showReturnButton, onReturn }: CountdownTimerProps) => {
    const [remaining, setRemaining] = useState(initialSeconds);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemaining((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    onExpire?.();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [initialSeconds]);

    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;

    return (
        <div className="mt-4 text-center">
            <p className="text-2xl font-semibold">
                Còn lại: {minutes}:{seconds.toString().padStart(2, '0')}
            </p>
            {showReturnButton && (
                <button
                    className="mt-4 bg-red-500 text-white px-5 py-2 text-2xl font-bold rounded hover:bg-red-600"
                    onClick={onReturn}
                >
                    Trả chỗ
                </button>
            )}
        </div>
    );
};

export default CountdownTimer;
