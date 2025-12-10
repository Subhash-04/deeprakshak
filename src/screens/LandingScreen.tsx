import React, { useState } from 'react';
import PhaseImage from '../components/PhaseImage';
import './LandingScreen.css';

interface LandingScreenProps {
    onStart: () => void;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ onStart }) => {
    const [showForm, setShowForm] = useState(false);

    const handleBeginClick = () => {
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
        onStart();
    };

    return (
        <div className="landing-screen">
            {/* Background effects */}
            <div className="bg-gradient"></div>
            <div className="bg-stars"></div>

            {/* Registration Form Modal */}
            {showForm && (
                <div className="form-modal-overlay">
                    <div className="form-modal">
                        <div className="form-modal-header">
                            <h3>📋 Register to Begin</h3>
                            <button className="close-btn" onClick={handleFormClose}>✕</button>
                        </div>
                        <iframe
                            src="https://docs.google.com/forms/d/e/1FAIpQLSeREjIevdhs7nTJX-Xhi8BTDB6repaX6wwGuierPyhiALVC3g/viewform?embedded=true"
                            width="100%"
                            height="500"
                            frameBorder="0"
                            marginHeight={0}
                            marginWidth={0}
                            title="Registration Form"
                        >
                            Loading…
                        </iframe>
                        <button className="btn btn-primary" onClick={handleFormClose}>
                            Continue to Game →
                        </button>
                    </div>
                </div>
            )}

            {/* Main content - Split layout */}
            <div className="landing-split">
                {/* Left side - Phase Image */}
                <div className="landing-left">
                    <PhaseImage phase={0} size="large" />
                </div>

                {/* Right side - Content */}
                <div className="landing-right">
                    <div className="landing-content">
                        <h1 className="landing-title">Deeprakshak</h1>
                        <p className="landing-subtitle">Light the Future 🪔</p>

                        <p className="landing-lore">
                            The magical Diya's light has faded, and darkness threatens the world of technology.
                            You are chosen as a Guardian of Light. Defeat the five Avine Guardians,
                            prove your worth, and restore the Diya's brilliance!
                        </p>

                        <div className="event-info">
                            <div className="info-badge">
                                <span className="info-badge-icon">⏱️</span>
                                <span>45 Minutes</span>
                            </div>
                            <div className="info-badge">
                                <span className="info-badge-icon">🎯</span>
                                <span>5 Levels</span>
                            </div>
                            <div className="info-badge">
                                <span className="info-badge-icon">🧩</span>
                                <span>Technical + Puzzles</span>
                            </div>
                        </div>

                        <button className="btn btn-primary btn-large" onClick={handleBeginClick}>
                            ✨ Begin Your Journey
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingScreen;
