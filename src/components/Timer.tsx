import React, { useEffect, useState } from 'react';

interface TimerProps {
    startTime: number | null;
    duration: number;
    onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ startTime, duration, onTimeUp }) => {
    const [timeRemaining, setTimeRemaining] = useState(duration);

    useEffect(() => {
        if (!startTime) return;

        const interval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            const remaining = Math.max(0, duration - elapsed);
            setTimeRemaining(remaining);

            if (remaining === 0) {
                onTimeUp();
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime, duration, onTimeUp]);

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    const getTimerClass = () => {
        if (timeRemaining <= 60) return 'timer danger';
        if (timeRemaining <= 300) return 'timer warning';
        return 'timer';
    };

    return (
        <div className={getTimerClass()}>
            <span>⏱️</span>
            <span>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
        </div>
    );
};

export default Timer;
