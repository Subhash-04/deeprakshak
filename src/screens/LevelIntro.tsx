import React from 'react';
import PhaseImage from '../components/PhaseImage';
import { Guardian, GUARDIANS } from '../types';
import './LevelIntro.css';

interface LevelIntroProps {
    currentLevel: number; // 0-4
    onContinue: () => void;
}

const LevelIntro: React.FC<LevelIntroProps> = ({ currentLevel, onContinue }) => {
    const guardian: Guardian = GUARDIANS[currentLevel];

    return (
        <div className="level-intro-screen">
            <div className="bg-gradient"></div>
            <div className="bg-stars"></div>

            <div className="level-intro-split">
                {/* Left side - Phase Image (current progress) */}
                <div className="level-intro-left">
                    <PhaseImage phase={currentLevel} size="medium" />
                </div>

                {/* Right side - Level info */}
                <div className="level-intro-right">
                    <div className="level-intro-content">
                        <div className="level-badge">
                            Level {currentLevel + 1} of 5
                        </div>

                        <div className="guardian-preview">
                            <span className="guardian-preview-icon">{guardian.icon}</span>
                        </div>

                        <h1 className="level-intro-title">{guardian.name}</h1>
                        <p className="level-intro-skill">{guardian.skill}</p>

                        <p className="level-intro-description">
                            {guardian.description}
                        </p>

                        <button className="btn btn-primary btn-large" onClick={onContinue}>
                            ⚔️ Face the Guardian
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LevelIntro;
