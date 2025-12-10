import React from 'react';
import './Diya2D.css';

interface Diya2DProps {
    progress: number; // 0-5 representing flames lit
    size?: 'small' | 'medium' | 'large';
}

const Diya2D: React.FC<Diya2DProps> = ({ progress, size = 'large' }) => {
    const flames = [0, 1, 2, 3, 4];

    return (
        <div className={`diya-container diya-${size}`}>
            {/* Main Diya lamp */}
            <div className="diya-lamp">
                {/* Flames - 5 flames for 5 guardians */}
                <div className="flames-container">
                    {flames.map((index) => (
                        <div
                            key={index}
                            className={`flame flame-${index + 1} ${index < progress ? 'active' : 'inactive'}`}
                            style={{
                                animationDelay: `${index * 0.1}s`,
                                '--flame-hue': `${40 + index * 10}`
                            } as React.CSSProperties}
                        >
                            <div className="flame-inner"></div>
                            <div className="flame-core"></div>
                        </div>
                    ))}
                </div>

                {/* Wick */}
                <div className="wick"></div>

                {/* Oil surface */}
                <div className="oil-surface">
                    <div className="oil-shimmer"></div>
                </div>

                {/* Lamp body */}
                <div className="lamp-body">
                    <div className="lamp-decoration lamp-dec-1"></div>
                    <div className="lamp-decoration lamp-dec-2"></div>
                    <div className="lamp-decoration lamp-dec-3"></div>
                </div>

                {/* Lamp base */}
                <div className="lamp-base">
                    <div className="base-ring"></div>
                </div>

                {/* Glow effect */}
                <div
                    className="diya-glow"
                    style={{ opacity: 0.2 + (progress / 5) * 0.6 }}
                ></div>
            </div>

            {/* Floating particles */}
            <div className="diya-particles">
                {Array.from({ length: 15 }).map((_, i) => (
                    <div
                        key={i}
                        className={`particle ${progress > 0 ? 'active' : ''}`}
                        style={{
                            '--particle-delay': `${Math.random() * 3}s`,
                            '--particle-x': `${-30 + Math.random() * 60}px`,
                            '--particle-duration': `${2 + Math.random() * 2}s`
                        } as React.CSSProperties}
                    ></div>
                ))}
            </div>

            {/* Progress indicator */}
            <div className="diya-progress-label">
                <span className="progress-value">{progress * 20}%</span>
                <span className="progress-text">Light Restored</span>
            </div>
        </div>
    );
};

export default Diya2D;
