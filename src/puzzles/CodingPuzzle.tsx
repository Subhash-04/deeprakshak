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

    // Hard Java code with String operations and loops
    const javaCode = `public class Main {
    public static void main(String[] args) {
        String s = "JAVA";
        int sum = 0;
        
        // Loop converts each character to its alphabet position (A=1, B=2,...,Z=26)
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            sum += (c - 'A' + 1);
        }
        
        int result = sum % 10 + sum / 10;
        System.out.print(result);
    }
}`;

    // Explanation:
    // 'J' - 'A' + 1 = 74 - 65 + 1 = 10
    // 'A' - 'A' + 1 = 65 - 65 + 1 = 1
    // 'V' - 'A' + 1 = 86 - 65 + 1 = 22
    // 'A' - 'A' + 1 = 65 - 65 + 1 = 1
    //
    // sum = 10 + 1 + 22 + 1 = 34
    // result = 34 % 10 + 34 / 10 = 4 + 3 = 7

    const correctAnswer = '7';

    const handleSubmit = () => {
        if (!userAnswer.trim()) return;

        setAttempts(prev => prev + 1);

        const normalizedAnswer = userAnswer.trim();

        if (normalizedAnswer === correctAnswer) {
            setFeedback({
                type: 'success',
                message: '🎉 Excellent! You decoded the character arithmetic. The Guardian of Code acknowledges your mastery!'
            });
            setTimeout(onComplete, 2000);
        } else {
            if (attempts >= 3) {
                setFeedback({
                    type: 'hint',
                    message: '💡 Final Hint: J=10, A=1, V=22, A=1. Sum=34. Then 34%10 + 34/10 = 4+3.'
                });
            } else if (attempts >= 2) {
                setFeedback({
                    type: 'hint',
                    message: '💡 Hint: (c - \'A\' + 1) gives position in alphabet. J=10, A=1, V=22. Sum them, then apply the formula.'
                });
            } else if (attempts >= 1) {
                setFeedback({
                    type: 'hint',
                    message: '💡 Hint: In ASCII, \'A\'=65, \'J\'=74, \'V\'=86. So (char - \'A\' + 1) gives alphabet position.'
                });
            } else {
                setFeedback({
                    type: 'error',
                    message: '❌ Incorrect. Think about ASCII values and character arithmetic!'
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
                        <p className="puzzle-subtitle">Predict the output of this Java program</p>
                    </div>

                    <div className="puzzle-content">
                        <div className="puzzle-question">
                            <p><strong>What will be the output when this Java code is executed?</strong></p>
                        </div>

                        <pre className="code-editor" style={{ fontSize: '0.85rem', textAlign: 'left' }}>{javaCode}</pre>

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
