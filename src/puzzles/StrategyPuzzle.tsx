import React, { useState } from 'react';
import '../puzzles/PuzzleScreen.css';

interface StrategyPuzzleProps {
    onComplete: () => void;
    onBack: () => void;
    progress: number;
}

// Word Logic Puzzle - VERY HARD difficulty
const StrategyPuzzle: React.FC<StrategyPuzzleProps> = ({ onComplete, onBack, progress }) => {
    const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '' });
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'hint'; message: string } | null>(null);
    const [attempts, setAttempts] = useState(0);

    const handleChange = (field: string, value: string) => {
        setAnswers(prev => ({ ...prev, [field]: value.toUpperCase() }));
        setFeedback(null);
    };

    const handleSubmit = () => {
        setAttempts(prev => prev + 1);

        // Q1: RACECAR - palindrome that moves fast
        // Q2: SILENCE - anagram of LICENSE
        // Q3: ZERO - the mathematical void

        const correct = {
            q1: answers.q1.trim() === 'RACECAR',
            q2: answers.q2.trim() === 'SILENCE',
            q3: answers.q3.trim() === 'ZERO'
        };

        const correctCount = Object.values(correct).filter(Boolean).length;

        if (correctCount === 3) {
            setFeedback({
                type: 'success',
                message: '🎉 Incredible wordplay mastery! You decoded all three enigmas. The Guardian of Strategy bows to your wisdom!'
            });
            setTimeout(onComplete, 2000);
        } else if (correctCount >= 2) {
            setFeedback({
                type: 'hint',
                message: `💡 ${correctCount}/3 correct! Re-examine: ${!correct.q1 ? 'Q1 ' : ''}${!correct.q2 ? 'Q2 ' : ''}${!correct.q3 ? 'Q3' : ''}`
            });
        } else if (attempts >= 2) {
            setFeedback({
                type: 'hint',
                message: '💡 Hints: Q1 is about a type of word that mirrors itself. Q2 requires letter rearrangement. Q3 involves mathematical philosophy.'
            });
        } else {
            setFeedback({
                type: 'error',
                message: `❌ Only ${correctCount}/3 correct. These riddles require deep thinking!`
            });
        }
    };

    return (
        <div className="puzzle-screen">
            <div className="bg-gradient"></div>
            <div className="bg-stars"></div>

            <div className="puzzle-wrapper">
                <div className="puzzle-container">
                    <div className="puzzle-header">
                        <div className="puzzle-icon">♟️</div>
                        <h2 className="puzzle-title">Guardian of Strategy</h2>
                        <p className="puzzle-subtitle">Solve these word challenges</p>
                    </div>

                    <div className="puzzle-content">
                        <div className="puzzle-question">
                            <p><strong>Decode these cryptic word enigmas:</strong></p>
                        </div>

                        <div style={{ display: 'grid', gap: '1.5rem', marginTop: '1.5rem' }}>
                            {/* Puzzle 1 - Cryptic Palindrome */}
                            <div className="word-puzzle-box">
                                <div className="word-puzzle-number">1</div>
                                <p className="word-puzzle-clue">
                                    <strong>The Eternal Loop:</strong>
                                    <br />I am a word that chases itself in circles.
                                    <br />Read me forward, read me back—I remain unchanged.
                                    <br />I move fast, yet I am stationary.
                                    <br /><em>What 7-letter word am I? (Think: vehicles)</em>
                                </p>
                                <input
                                    type="text"
                                    className="input-field word-input"
                                    placeholder="Answer..."
                                    value={answers.q1}
                                    onChange={(e) => handleChange('q1', e.target.value)}
                                    maxLength={7}
                                />
                            </div>

                            {/* Puzzle 2 - Hard Anagram */}
                            <div className="word-puzzle-box">
                                <div className="word-puzzle-number">2</div>
                                <p className="word-puzzle-clue">
                                    <strong>The Library's Demand:</strong>
                                    <br />Rearrange all letters of <strong>LICENSE</strong> to find
                                    <br />what every library demands from its visitors.
                                    <br /><em>(7 letters, same letters rearranged)</em>
                                </p>
                                <input
                                    type="text"
                                    className="input-field word-input"
                                    placeholder="Answer..."
                                    value={answers.q2}
                                    onChange={(e) => handleChange('q2', e.target.value)}
                                    maxLength={7}
                                />
                            </div>

                            {/* Puzzle 3 - Philosophical Riddle */}
                            <div className="word-puzzle-box">
                                <div className="word-puzzle-number">3</div>
                                <p className="word-puzzle-clue">
                                    <strong>The Mathematical Void:</strong>
                                    <br />I am the absence that makes presence possible.
                                    <br />I hold the place when nothing else can.
                                    <br />Without me, counting would never have begun,
                                    <br />yet I represent nothing at all.
                                    <br /><em>What 4-letter number am I?</em>
                                </p>
                                <input
                                    type="text"
                                    className="input-field word-input"
                                    placeholder="Answer..."
                                    value={answers.q3}
                                    onChange={(e) => handleChange('q3', e.target.value)}
                                    maxLength={4}
                                />
                            </div>
                        </div>

                        {feedback && (
                            <div className={`feedback ${feedback.type}`}>
                                {feedback.message}
                            </div>
                        )}
                    </div>

                    <div className="puzzle-actions">
                        <button
                            className={`btn btn-primary`}
                            onClick={handleSubmit}
                            disabled={feedback?.type === 'success'}
                        >
                            Submit All Answers
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StrategyPuzzle;
