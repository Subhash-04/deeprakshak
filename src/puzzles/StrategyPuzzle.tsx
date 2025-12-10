import React, { useState } from 'react';
import '../puzzles/PuzzleScreen.css';

interface StrategyPuzzleProps {
    onComplete: () => void;
    onBack: () => void;
    progress: number;
}

// Word Logic Puzzle - Moderate difficulty
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

        // Q1: FACE - Remove first letter from TRACE, add F at start
        // Q2: STAR - Anagram of RATS
        // Q3: ECHO - What bounces back and repeats? 4 letters
        const correct = {
            q1: answers.q1.trim() === 'FACE',
            q2: answers.q2.trim() === 'STAR',
            q3: answers.q3.trim() === 'ECHO'
        };

        const correctCount = Object.values(correct).filter(Boolean).length;

        if (correctCount === 3) {
            setFeedback({
                type: 'success',
                message: '🎉 Brilliant wordplay! You decoded all three puzzles. The Guardian of Strategy salutes your wit!'
            });
            setTimeout(onComplete, 2000);
        } else if (correctCount >= 2) {
            setFeedback({
                type: 'hint',
                message: `💡 ${correctCount}/3 correct! Re-read the clues for: ${!correct.q1 ? 'Q1 ' : ''}${!correct.q2 ? 'Q2 ' : ''}${!correct.q3 ? 'Q3' : ''}`
            });
        } else if (attempts >= 2) {
            setFeedback({
                type: 'hint',
                message: '💡 Hints: Q1 involves replacing a letter. Q2 is a rearrangement. Q3 uses initial letters.'
            });
        } else {
            setFeedback({
                type: 'error',
                message: `❌ Only ${correctCount}/3 correct. Read each clue carefully!`
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
                        <p className="puzzle-subtitle">Solve these word logic puzzles</p>
                    </div>

                    <div className="puzzle-content">
                        <div className="puzzle-question">
                            <p><strong>Decode these word puzzles:</strong></p>
                        </div>

                        <div style={{ display: 'grid', gap: '1.5rem', marginTop: '1.5rem' }}>
                            {/* Puzzle 1 */}
                            <div className="word-puzzle-box">
                                <div className="word-puzzle-number">1</div>
                                <p className="word-puzzle-clue">
                                    Remove the first letter from <strong>TRACE</strong>, then add <strong>F</strong> at the start.
                                    <br />What 4-letter word do you get?
                                </p>
                                <input
                                    type="text"
                                    className="input-field word-input"
                                    placeholder="Answer..."
                                    value={answers.q1}
                                    onChange={(e) => handleChange('q1', e.target.value)}
                                    maxLength={4}
                                />
                            </div>

                            {/* Puzzle 2 */}
                            <div className="word-puzzle-box">
                                <div className="word-puzzle-number">2</div>
                                <p className="word-puzzle-clue">
                                    Rearrange the letters in <strong>RATS</strong> to form something that shines in the night sky.
                                </p>
                                <input
                                    type="text"
                                    className="input-field word-input"
                                    placeholder="Answer..."
                                    value={answers.q2}
                                    onChange={(e) => handleChange('q2', e.target.value)}
                                    maxLength={4}
                                />
                            </div>

                            {/* Puzzle 3 */}
                            <div className="word-puzzle-box">
                                <div className="word-puzzle-number">3</div>
                                <p className="word-puzzle-clue">
                                    <strong>Riddle:</strong> I speak without a mouth. I hear without ears.
                                    <br />I have no body, but I come alive with the wind.
                                    <br /><em>What am I? (4 letters)</em>
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
