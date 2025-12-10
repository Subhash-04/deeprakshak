import React, { useState, useRef } from 'react';
import './IntroScreen.css';

interface IntroScreenProps {
    onComplete: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
    const [showVideo, setShowVideo] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handlePlayIntro = () => {
        setShowVideo(true);
    };

    const handleVideoEnd = () => {
        // Video finished, go to landing page
        onComplete();
    };

    return (
        <div className="intro-screen">
            {/* Background */}
            <div className="bg-gradient"></div>
            <div className="bg-stars"></div>

            {!showVideo ? (
                // Title and Intro button
                <div className="intro-content">
                    <div className="intro-logo">🪔</div>
                    <h1 className="intro-title">Deeprakshak</h1>
                    <p className="intro-tagline">Light the Future</p>

                    <button className="btn btn-primary btn-large intro-btn" onClick={handlePlayIntro}>
                        ▶ Watch Intro
                    </button>
                </div>
            ) : (
                // Video player
                <div className="video-container">
                    <video
                        ref={videoRef}
                        className="intro-video"
                        src="/assets/intro.mp4"
                        autoPlay
                        onEnded={handleVideoEnd}
                        playsInline
                    />

                    {/* Skip button */}
                    <button className="skip-btn" onClick={onComplete}>
                        Skip →
                    </button>
                </div>
            )}
        </div>
    );
};

export default IntroScreen;
