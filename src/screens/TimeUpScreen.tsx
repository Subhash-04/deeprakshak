import React, { useState } from 'react';
import './TimeUpScreen.css';

interface TimeUpScreenProps {
    onRestart: () => void;
}

const TimeUpScreen: React.FC<TimeUpScreenProps> = ({ onRestart }) => {
    const [showForm, setShowForm] = useState(false);

    // Prefilled form URL with time 45:00
    const formUrl = `https://docs.google.com/forms/d/e/1FAIpQLSdzjitbPdrEC7XoYKM727s-F333Qy5woD2RYqw68liQ0GanOg/viewform?embedded=true&entry.2039261618=${encodeURIComponent('45:00')}`;

    const handleFeedback = () => {
        setShowForm(true);
    };

    return (
        <div className="timeup-screen">
            {/* Background */}
            <div className="bg-gradient timeup-gradient"></div>
            <div className="bg-stars"></div>

            {/* Fading particles */}
            <div className="fading-particles">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="fade-particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="form-modal-overlay">
                    <div className="form-modal timeup-form">
                        <div className="form-modal-header">
                            <h3>📝 Share Your Feedback</h3>
                            <button className="close-btn" onClick={() => setShowForm(false)}>✕</button>
                        </div>
                        <iframe
                            src={formUrl}
                            width="100%"
                            height="500"
                            frameBorder="0"
                            marginHeight={0}
                            marginWidth={0}
                            title="Feedback Form"
                        >
                            Loading…
                        </iframe>
                    </div>
                </div>
            )}

            {/* Main content */}
            <div className="timeup-content">
                <div className="timeup-icon">⏰</div>
                <h1 className="timeup-title">Mission Aborted</h1>
                <p className="timeup-subtitle">Time Has Run Out</p>

                <div className="timeup-message">
                    <p>The darkness has prevailed... for now.</p>
                    <p>The Diya's light fades, but hope remains.</p>
                    <p>Your journey can begin anew.</p>
                </div>

                <div className="timeup-stats">
                    <div className="timeup-stat">
                        <span className="stat-value">45:00</span>
                        <span className="stat-label">Time Elapsed</span>
                    </div>
                </div>

                <div className="timeup-actions">
                    <button className="btn btn-primary btn-large" onClick={handleFeedback}>
                        📝 Submit Feedback
                    </button>
                    <button className="btn btn-secondary" onClick={onRestart}>
                        🔄 Try Again
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimeUpScreen;
