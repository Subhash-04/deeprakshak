import React from 'react';

interface ProgressIndicatorProps {
    completedCount: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ completedCount }) => {
    return (
        <div className="progress-container">
            <span>🪔</span>
            <div className="diya-progress">
                {[0, 1, 2, 3, 4].map((index) => (
                    <div
                        key={index}
                        className={`flame-segment ${index < completedCount ? 'active' : ''}`}
                    />
                ))}
            </div>
            <span>{completedCount * 20}%</span>
        </div>
    );
};

export default ProgressIndicator;
