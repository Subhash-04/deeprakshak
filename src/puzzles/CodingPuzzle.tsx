import React, { useState } from 'react';
import '../puzzles/PuzzleScreen.css';

interface CodingPuzzleProps {
    onComplete: () => void;
    onBack: () => void;
    progress: number;
}

const CodingPuzzle: React.FC<CodingPuzzleProps> = ({ onComplete, onBack, progress }) => {
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'hint'; message: string } | null>(null);
    const [attempts, setAttempts] = useState(0);

    // C code that does pointer arithmetic
    const cCode = `#include <stdio.h>

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int *ptr = arr;
    
    ptr = ptr + 2;
    *ptr = *ptr + *(ptr - 1) + *(ptr + 1);
    
    int result = 0;
    for (int i = 0; i < 5; i++) {
        result += arr[i];
    }
    
    printf("%d", result);
    return 0;
}`;

    // Explanation:
    // arr = {10, 20, 30, 40, 50}
    // ptr points to arr[2] (value 30)
    // *ptr = 30 + 20 + 40 = 90
    // arr becomes {10, 20, 90, 40, 50}
    // result = 10 + 20 + 90 + 40 + 50 = 210
    const correctAnswer = '210';

    const handleSubmit = () => {
        if (!userAnswer.trim()) return;

        setAttempts(prev => prev + 1);

        const normalizedAnswer = userAnswer.trim();

        if (normalizedAnswer === correctAnswer) {
            setFeedback({
                type: 'success',
                message: '🎉 Excellent! You correctly traced the pointer arithmetic. The Guardian of Code acknowledges your mastery!'
            });
            setTimeout(onComplete, 2000);
        } else {
            if (attempts >= 3) {
                setFeedback({
                    type: 'hint',
                    message: '💡 Final Hint: After ptr+2, *ptr modifies arr[2]. The new value = arr[1] + arr[2] + arr[3]. Then sum all 5 elements.'
                });
            } else if (attempts >= 2) {
                setFeedback({
                    type: 'hint',
                    message: '💡 Hint: ptr+2 points to the 3rd element (index 2). *(ptr-1) is the element before, *(ptr+1) is the element after.'
                });
            } else if (attempts >= 1) {
                setFeedback({
                    type: 'hint',
                    message: '💡 Hint: Trace the pointer carefully. ptr = ptr + 2 moves the pointer by 2 positions.'
                });
            } else {
                setFeedback({
                    type: 'error',
                    message: '❌ Incorrect. Trace through the code step by step with the given array values.'
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
                        <div className="puzzle-icon">💻</div>
                        <h2 className="puzzle-title">Guardian of Code</h2>
                        <p className="puzzle-subtitle">Predict the output of this C program</p>
                    </div>

                    <div className="puzzle-content">
                        <div className="puzzle-question">
                            <p><strong>What will be the output when this C code is executed?</strong></p>
                        </div>

                        <pre className="code-editor" style={{ fontSize: '0.85rem', textAlign: 'left' }}>{cCode}</pre>

                        <div style={{ marginTop: '1.5rem', maxWidth: '300px', margin: '1.5rem auto 0' }}>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="Enter the output..."
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

export default CodingPuzzle;
