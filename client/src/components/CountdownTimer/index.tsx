import { useEffect, useRef, useState } from 'react';

type CountdownTimerProps = {
    initialSeconds: number;
    onExpire?: () => void;
    showReturnButton?: boolean;
    onReturn?: () => void;
};

const CountdownTimer = ({ initialSeconds, onExpire, showReturnButton, onReturn }: CountdownTimerProps) => {
    const [remaining, setRemaining] = useState(initialSeconds);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const tick = () => {
        setRemaining((prev) => {
            if (prev <= 1) {
                onExpire?.();
                return 0;
            } else {
                timeoutRef.current = setTimeout(tick, 1000);
                return prev - 1;
            }
        });
    };

    useEffect(() => {
        // Reset remaining time
        setRemaining(initialSeconds);

        // Clear previous timeout if exists
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Start countdown
        timeoutRef.current = setTimeout(tick, 1000);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
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
