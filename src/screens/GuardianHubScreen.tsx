import React from 'react';
import Timer from '../components/Timer';
import ProgressIndicator from '../components/ProgressIndicator';
import Diya2D from '../components/Diya2D';
import { GUARDIANS, GuardianType, GAME_DURATION } from '../types';
import './GuardianHubScreen.css';

interface GuardianHubScreenProps {
    completedGuardians: GuardianType[];
    startTime: number;
    onSelectGuardian: (guardian: GuardianType) => void;
    onTimeUp: () => void;
}

const GuardianHubScreen: React.FC<GuardianHubScreenProps> = ({
    completedGuardians,
    startTime,
    onSelectGuardian,
    onTimeUp
}) => {
    const isCompleted = (id: GuardianType) => completedGuardians.includes(id);

    return (
        <div className="hub-screen">
            {/* Background */}
            <div className="bg-gradient"></div>
            <div className="bg-stars"></div>

            {/* Header */}
            <header className="game-header">
                <div className="game-title">🪔 Deeprakshak</div>
                <ProgressIndicator completedCount={completedGuardians.length} />
                <Timer
                    startTime={startTime}
                    duration={GAME_DURATION}
                    onTimeUp={onTimeUp}
                />
            </header>

            {/* Main content - Split layout */}
            <div className="hub-split">
                {/* Left side - Diya */}
                <div className="hub-left">
                    <Diya2D progress={completedGuardians.length} size="large" />
                </div>

                {/* Right side - Guardians */}
                <div className="hub-right">
                    <div className="hub-content">
                        <h2>Choose Your Challenge</h2>
                        <p className="hub-subtitle">Defeat all five Guardians to restore the Diya's light</p>

                        <div className="guardians-list">
                            {GUARDIANS.map((guardian) => {
                                const completed = isCompleted(guardian.id);

                                return (
                                    <div
                                        key={guardian.id}
                                        className={`guardian-row ${completed ? 'completed' : ''}`}
                                        onClick={() => !completed && onSelectGuardian(guardian.id)}
                                    >
                                        <div className="guardian-row-icon">{guardian.icon}</div>
                                        <div className="guardian-row-info">
                                            <h4 className="guardian-row-name">{guardian.name}</h4>
                                            <p className="guardian-row-skill">{guardian.skill}</p>
                                        </div>
                                        <div className={`guardian-row-status ${completed ? 'done' : 'active'}`}>
                                            {completed ? '✓ Defeated' : 'Challenge →'}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuardianHubScreen;
