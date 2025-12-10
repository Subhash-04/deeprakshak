import React, { useState, useEffect } from 'react';
import PhaseImage from '../components/PhaseImage';
import './VictoryScreen.css';

interface VictoryScreenProps {
    timeSpent: number;
    onRestart: () => void;
}

const VictoryScreen: React.FC<VictoryScreenProps> = ({ timeSpent, onRestart }) => {
    const [showForm, setShowForm] = useState(false);
    const [showConfetti, setShowConfetti] = useState(true);

    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    // Prefilled form URL with time
    const formUrl = `https://docs.google.com/forms/d/e/1FAIpQLSfyS4nGRc5vbc9VDRiBPKKFCysHLKIeWTpfK5LGsFZMMbGz4Q/viewform?embedded=true&entry.2039261618=${encodeURIComponent(timeString)}`;

    // Generate confetti
    const confetti = Array.from({ length: 80 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 2,
        color: ['#ffd700', '#ff9500', '#ff5722', '#9c27b0', '#e91e63', '#4caf50'][Math.floor(Math.random() * 6)]
    }));

    // Fireworks effect
    useEffect(() => {
        const interval = setInterval(() => {
            setShowConfetti(prev => !prev);
            setTimeout(() => setShowConfetti(true), 100);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = () => {
        setShowForm(true);
    };

    return (
        <div className="victory-screen">
            {/* Background */}
            <div className="bg-gradient victory-gradient"></div>
            <div className="bg-stars"></div>

            {/* Confetti */}
            {showConfetti && confetti.map((piece) => (
                <div
                    key={piece.id}
                    className="confetti-piece"
                    style={{
                        left: `${piece.left}%`,
                        backgroundColor: piece.color,
                        animationDelay: `${piece.delay}s`,
                        animationDuration: `${piece.duration}s`,
                        borderRadius: Math.random() > 0.5 ? '50%' : '0'
                    }}
                />
            ))}

            {/* Celebration sparkles */}
            <div className="celebration-sparkles">
                {Array.from({ length: 30 }).map((_, i) => (
                    <div
                        key={i}
                        className="sparkle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`
                        }}
                    >✨</div>
                ))}
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="form-modal-overlay">
                    <div className="form-modal victory-form">
                        <div className="form-modal-header">
                            <h3>🏆 Submit Your Victory!</h3>
                            <button className="close-btn" onClick={() => setShowForm(false)}>✕</button>
                        </div>
                        <iframe
                            src={formUrl}
                            width="100%"
                            height="500"
                            frameBorder="0"
                            marginHeight={0}
                            marginWidth={0}
                            title="Victory Form"
                        >
                            Loading…
                        </iframe>
                    </div>
                </div>
            )}

            {/* Main content - Split layout */}
            <div className="victory-split">
                {/* Left side - Fully lit Phase 5 */}
                <div className="victory-left">
                    <PhaseImage phase={5} size="large" />
                </div>

                {/* Right side - Content */}
                <div className="victory-right">
                    <div className="victory-content">
                        <div className="victory-trophy">🏆</div>
                        <h1 className="victory-title">🪔 The Light Returns! 🪔</h1>

                        <p className="victory-message">
                            Congratulations, Guardian of Light! You have defeated all five Avine Guardians
                            and restored the Diya's brilliance. The era of innovation shines once more!
                        </p>

                        <div className="victory-stats">
                            <div className="stat-item time-stat">
                                <div className="stat-value highlight">{timeString}</div>
                                <div className="stat-label">Time Taken</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">5/5</div>
                                <div className="stat-label">Guardians Defeated</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">100%</div>
                                <div className="stat-label">Diya Restored</div>
                            </div>
                        </div>

                        <div className="victory-actions">
                            <button className="btn btn-primary btn-large victory-submit" onClick={handleSubmit}>
                                🎉 Submit Your Score
                            </button>
                            <button className="btn btn-secondary" onClick={onRestart}>
                                🔄 Play Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VictoryScreen;
