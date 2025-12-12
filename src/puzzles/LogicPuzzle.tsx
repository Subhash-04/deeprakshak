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

    // EASIER PUZZLE: Simple Multiplication Table Pattern
    // Given a 3x3 matrix where each cell = row × column
    //
    // Row 1: 1×1=1  | 1×2=2  | 1×3=3
    // Row 2: 2×1=2  | 2×2=4  | 2×3=6
    // Row 3: 3×1=3  | 3×2=6  | 3×3=?
    //
    const correctAnswer = '9';

    const handleSubmit = () => {
        if (!userAnswer.trim()) return;

        setAttempts(prev => prev + 1);

        const normalizedAnswer = userAnswer.trim();

        if (normalizedAnswer === correctAnswer) {
            setFeedback({
                type: 'success',
                message: '🎉 Brilliant! You decoded the matrix pattern. The Guardian of Logic is impressed!'
            });
            setTimeout(onComplete, 2000);
        } else {
            if (attempts >= 2) {
                setFeedback({
                    type: 'hint',
                    message: '💡 Hint: This is a basic multiplication table! Each cell = row number × column number.'
                });
            } else if (attempts >= 1) {
                setFeedback({
                    type: 'hint',
                    message: '💡 Hint: Look at the diagonal: 1, 4, ?. What pattern do you see?'
                });
            } else {
                setFeedback({
                    type: 'error',
                    message: '❌ Incorrect. Think about how the row and column positions relate to each value!'
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
                        <p className="puzzle-subtitle">Decode the matrix pattern</p>
                    </div>

                    <div className="puzzle-content">
                        <div className="puzzle-question">
                            <p><strong>The Cipher Matrix:</strong></p>
                            <p style={{ marginBottom: '1rem' }}>
                                Each number in this grid follows a hidden formula based on its row and column position.
                                Discover the pattern and find the missing value.
                            </p>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'auto repeat(3, 70px)',
                                gap: '0.5rem',
                                maxWidth: '320px',
                                margin: '1.5rem auto',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                {/* Header row */}
                                <div style={{ padding: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}></div>
                                <div style={{ padding: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>C1</div>
                                <div style={{ padding: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>C2</div>
                                <div style={{ padding: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>C3</div>

                                {/* Row 1 */}
                                <div style={{ padding: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>R1</div>
                                <div className="pattern-cell" style={{ padding: '1rem', fontSize: '1.3rem' }}>1</div>
                                <div className="pattern-cell" style={{ padding: '1rem', fontSize: '1.3rem' }}>2</div>
                                <div className="pattern-cell" style={{ padding: '1rem', fontSize: '1.3rem' }}>3</div>
                                {/* Row 2 */}
                                <div style={{ padding: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>R2</div>
                                <div className="pattern-cell" style={{ padding: '1rem', fontSize: '1.3rem' }}>2</div>
                                <div className="pattern-cell" style={{ padding: '1rem', fontSize: '1.3rem' }}>4</div>
                                <div className="pattern-cell" style={{ padding: '1rem', fontSize: '1.3rem' }}>6</div>
                                {/* Row 3 */}
                                <div style={{ padding: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>R3</div>
                                <div className="pattern-cell" style={{ padding: '1rem', fontSize: '1.3rem' }}>3</div>
                                <div className="pattern-cell" style={{ padding: '1rem', fontSize: '1.3rem' }}>6</div>
                                <div className="pattern-cell mystery" style={{ padding: '1rem', fontSize: '1.3rem' }}>?</div>
                            </div>

                            <p style={{ marginTop: '1.5rem', color: 'var(--color-text-secondary)' }}>
                                What number belongs in the missing cell?
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
