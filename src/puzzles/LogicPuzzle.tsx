import React, { useState } from 'react';
import '../puzzles/PuzzleScreen.css';

interface LogicPuzzleProps {
    onComplete: () => void;
    onBack: () => void;
    progress: number;
}

const LogicPuzzle: React.FC<LogicPuzzleProps> = ({ onComplete, onBack, progress }) => {
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'hint'; message: string } | null>(null);
    const [attempts, setAttempts] = useState(0);

    // HARD PUZZLE: Complex pattern recognition
    // Pattern: Each term = (previous term × 2) + position
    // Position: 1, 2, 3, 4, 5, 6
    // Sequence: 3, 8, 19, 42, 89, ?
    // 3 (given)
    // 3×2 + 2 = 8
    // 8×2 + 3 = 19
    // 19×2 + 4 = 42
    // 42×2 + 5 = 89
    // 89×2 + 6 = 184
    const correctAnswer = '184';

    const handleSubmit = () => {
        if (!userAnswer.trim()) return;

        setAttempts(prev => prev + 1);

        const normalizedAnswer = userAnswer.trim();

        if (normalizedAnswer === correctAnswer) {
            setFeedback({
                type: 'success',
                message: '🎉 Brilliant! You cracked the pattern. The Guardian of Logic is impressed by your genius!'
            });
            setTimeout(onComplete, 2000);
        } else {
            if (attempts >= 3) {
                setFeedback({
                    type: 'hint',
                    message: '💡 Final Hint: Each term involves doubling AND adding something that increases...'
                });
            } else if (attempts >= 2) {
                setFeedback({
                    type: 'hint',
                    message: '💡 Hint: The pattern involves multiplication AND addition. Look at the position of each number.'
                });
            } else if (attempts >= 1) {
                setFeedback({
                    type: 'hint',
                    message: '💡 Hint: This is not a simple arithmetic or geometric sequence. Think recursively.'
                });
            } else {
                setFeedback({
                    type: 'error',
                    message: '❌ Incorrect. This is a challenging pattern. Study it carefully!'
                });
            }
        }
    };

    return (
        <div className="puzzle-screen">
            <div className="bg-gradient"></div>
            <div className="bg-stars"></div>

            <div className="puzzle-wrapper">
                <div className="puzzle-container">
                    <div className="puzzle-header">
                        <div className="puzzle-icon">🧠</div>
                        <h2 className="puzzle-title">Guardian of Logic</h2>
                        <p className="puzzle-subtitle">Only the sharpest minds can decode this sequence</p>
                    </div>

                    <div className="puzzle-content">
                        <div className="puzzle-question">
                            <p><strong>The Ancient Cipher:</strong></p>
                            <p style={{ marginBottom: '1rem' }}>
                                A mysterious sequence guards the first fragment of light.
                                Each number follows a hidden rule that combines two operations.
                            </p>

                            <div className="pattern-grid">
                                <div className="pattern-cell">3</div>
                                <div className="pattern-cell">8</div>
                                <div className="pattern-cell">19</div>
                                <div className="pattern-cell">42</div>
                                <div className="pattern-cell">89</div>
                                <div className="pattern-cell mystery">?</div>
                            </div>

                            <p style={{ marginTop: '1.5rem', color: 'var(--color-text-secondary)' }}>
                                What is the next number in this sequence?
                            </p>
                        </div>

                        <div style={{ maxWidth: '300px', margin: '0 auto' }}>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="Enter your answer..."
                                value={userAnswer}
                                onChange={(e) => {
                                    setUserAnswer(e.target.value);
                                    setFeedback(null);
                                }}
                                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                style={{ textAlign: 'center', fontSize: '1.5rem' }}
                            />
                        </div>

                        {feedback && (
                            <div className={`feedback ${feedback.type}`}>
                                {feedback.message}
                            </div>
                        )}
                    </div>

                    <div className="puzzle-actions">
                        <button
                            className={`btn btn-primary ${!userAnswer.trim() ? 'btn-disabled' : ''}`}
                            onClick={handleSubmit}
                            disabled={!userAnswer.trim() || feedback?.type === 'success'}
                        >
                            Submit Answer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogicPuzzle;
