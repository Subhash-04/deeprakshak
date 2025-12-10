import React, { useState } from 'react';
import '../puzzles/PuzzleScreen.css';
import './QueensPuzzle.css';

interface CreativityPuzzleProps {
    onComplete: () => void;
    onBack: () => void;
    progress: number;
}

// 4 Queens Puzzle - Place 4 queens on a 4x4 board so none attack each other
const CreativityPuzzle: React.FC<CreativityPuzzleProps> = ({ onComplete, onBack, progress }) => {
    const [board, setBoard] = useState<boolean[][]>(
        Array(4).fill(null).map(() => Array(4).fill(false))
    );
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'hint'; message: string } | null>(null);
    const [attempts, setAttempts] = useState(0);

    const countQueens = (): number => {
        let count = 0;
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (board[r][c]) count++;
            }
        }
        return count;
    };

    const toggleCell = (row: number, col: number) => {
        const newBoard = board.map(r => [...r]);
        newBoard[row][col] = !newBoard[row][col];
        setBoard(newBoard);
        setFeedback(null);
    };

    const checkSolution = (): { valid: boolean; conflicts: [number, number][] } => {
        const conflicts: [number, number][] = [];
        const queens: [number, number][] = [];

        // Find all queens
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (board[r][c]) {
                    queens.push([r, c]);
                }
            }
        }

        // Check for conflicts
        for (let i = 0; i < queens.length; i++) {
            for (let j = i + 1; j < queens.length; j++) {
                const [r1, c1] = queens[i];
                const [r2, c2] = queens[j];

                // Same row
                if (r1 === r2) {
                    conflicts.push(queens[i], queens[j]);
                }
                // Same column
                else if (c1 === c2) {
                    conflicts.push(queens[i], queens[j]);
                }
                // Same diagonal
                else if (Math.abs(r1 - r2) === Math.abs(c1 - c2)) {
                    conflicts.push(queens[i], queens[j]);
                }
            }
        }

        return { valid: queens.length === 4 && conflicts.length === 0, conflicts };
    };

    const handleSubmit = () => {
        setAttempts(prev => prev + 1);

        const queenCount = countQueens();

        if (queenCount !== 4) {
            setFeedback({
                type: 'error',
                message: `❌ You need exactly 4 queens. Currently placed: ${queenCount}`
            });
            return;
        }

        const { valid, conflicts } = checkSolution();

        if (valid) {
            setFeedback({
                type: 'success',
                message: '🎉 Brilliant! You solved the 4 Queens puzzle. The Guardian of Creativity admires your strategic thinking!'
            });
            setTimeout(onComplete, 2000);
        } else {
            if (attempts >= 2) {
                setFeedback({
                    type: 'hint',
                    message: '💡 Hint: Try placing one queen per row. No two queens can share a row, column, or diagonal.'
                });
            } else {
                setFeedback({
                    type: 'error',
                    message: `❌ ${conflicts.length / 2} queen(s) are attacking each other! Remember: queens attack horizontally, vertically, and diagonally.`
                });
            }
        }
    };

    const resetBoard = () => {
        setBoard(Array(4).fill(null).map(() => Array(4).fill(false)));
        setFeedback(null);
    };

    return (
        <div className="puzzle-screen">
            <div className="bg-gradient"></div>
            <div className="bg-stars"></div>

            <div className="puzzle-wrapper">
                <div className="puzzle-container">
                    <div className="puzzle-header">
                        <div className="puzzle-icon">🎨</div>
                        <h2 className="puzzle-title">Guardian of Creativity</h2>
                        <p className="puzzle-subtitle">Solve the classic 4 Queens puzzle</p>
                    </div>

                    <div className="puzzle-content">
                        <div className="puzzle-question">
                            <p><strong>The Challenge:</strong></p>
                            <p>Place <strong>4 Queens</strong> on the board so that no queen can attack another.</p>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                Queens attack horizontally ↔, vertically ↕, and diagonally ↗↘
                            </p>
                        </div>

                        {/* Chess board */}
                        <div className="queens-board">
                            {board.map((row, rowIndex) => (
                                <div key={rowIndex} className="queens-row">
                                    {row.map((hasQueen, colIndex) => (
                                        <div
                                            key={colIndex}
                                            className={`queens-cell ${(rowIndex + colIndex) % 2 === 0 ? 'light' : 'dark'} ${hasQueen ? 'has-queen' : ''}`}
                                            onClick={() => toggleCell(rowIndex, colIndex)}
                                        >
                                            {hasQueen && <span className="queen-piece">♛</span>}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--color-text-muted)' }}>
                            Queens placed: {countQueens()}/4
                        </p>

                        {feedback && (
                            <div className={`feedback ${feedback.type}`}>
                                {feedback.message}
                            </div>
                        )}
                    </div>

                    <div className="puzzle-actions">
                        <button className="btn btn-secondary" onClick={resetBoard}>
                            Reset Board
                        </button>
                        <button
                            className={`btn btn-primary ${countQueens() !== 4 ? 'btn-disabled' : ''}`}
                            onClick={handleSubmit}
                            disabled={countQueens() !== 4 || feedback?.type === 'success'}
                        >
                            Check Solution
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreativityPuzzle;
