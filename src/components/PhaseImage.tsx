import React from 'react';
import './PhaseImage.css';

interface PhaseImageProps {
    phase: number; // 0-5
    size?: 'small' | 'medium' | 'large';
}

const PhaseImage: React.FC<PhaseImageProps> = ({ phase, size = 'large' }) => {
    // Map phase to image file
    const getImagePath = () => {
        if (phase === 2) {
            return '/assets/pahse2.png'; // Note: typo in filename
        }
        return `/assets/phase${phase}.png`;
    };

    return (
        <div className={`phase-image-container phase-${size}`}>
            {/* Main phase image */}
            <img
                src={getImagePath()}
                alt={`Phase ${phase}`}
                className="phase-image"
            />

            {/* Glow effect behind image */}
            <div
                className="phase-glow"
                style={{ opacity: 0.3 + (phase / 5) * 0.5 }}
            ></div>

            {/* Floating sparks */}
            <div className="sparks-container">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className={`spark ${phase > 0 ? 'active' : ''}`}
                        style={{
                            '--spark-delay': `${Math.random() * 4}s`,
                            '--spark-x': `${-50 + Math.random() * 100}px`,
                            '--spark-duration': `${2 + Math.random() * 3}s`,
                            '--spark-size': `${3 + Math.random() * 5}px`,
                            left: `${10 + Math.random() * 80}%`,
                        } as React.CSSProperties}
                    ></div>
                ))}
            </div>

            {/* Progress indicator */}
            <div className="phase-progress-label">
                <span className="phase-value">{phase * 20}%</span>
                <span className="phase-text">Light Restored</span>
            </div>
        </div>
    );
};

export default PhaseImage;
