import React, { useState, useCallback } from 'react';
import '../puzzles/PuzzleScreen.css';
import './QueensPuzzle.css';

interface CreativityPuzzleProps {
    onComplete: () => void;
    onBack: () => void;
    progress: number;
}

// Knight's Tour Puzzle - Complete a knight's tour on a 4x4 board
// All possible knight moves (module-scope so hooks don't need it as a dependency)
const KNIGHT_MOVES: [number, number][] = [
    [-2, -1], [-2, 1], [-1, -2], [-1, 2],
    [1, -2], [1, 2], [2, -1], [2, 1]
];

const CreativityPuzzle: React.FC<CreativityPuzzleProps> = ({ onComplete, onBack, progress }) => {
    const BOARD_SIZE = 4;

    // Track the order of moves (0 = not visited, 1-36 = order visited)
    const [board, setBoard] = useState<number[][]>(
        Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(0))
    );
    const [currentPos, setCurrentPos] = useState<[number, number] | null>(null);
    const [moveCount, setMoveCount] = useState(0);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'hint'; message: string } | null>(null);

    // Note: knight moves are defined at module scope as `KNIGHT_MOVES`

    const isValidMove = useCallback((fromRow: number, fromCol: number, toRow: number, toCol: number): boolean => {
        const rowDiff = Math.abs(toRow - fromRow);
        const colDiff = Math.abs(toCol - fromCol);
        return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
    }, []);

    const getValidMoves = useCallback((row: number, col: number): [number, number][] => {
        const moves: [number, number][] = [];
        for (const [dr, dc] of KNIGHT_MOVES) {
            const newRow = row + dr;
            const newCol = col + dc;
            if (newRow >= 0 && newRow < BOARD_SIZE &&
                newCol >= 0 && newCol < BOARD_SIZE &&
                board[newRow][newCol] === 0) {
                moves.push([newRow, newCol]);
            }
        }
        return moves;
    }, [board, BOARD_SIZE]);

    const handleCellClick = (row: number, col: number) => {
        // If feedback is success, don't allow more moves
        if (feedback?.type === 'success') return;

        // First move - place knight anywhere
        if (currentPos === null) {
            const newBoard = board.map(r => [...r]);
            newBoard[row][col] = 1;
            setBoard(newBoard);
            setCurrentPos([row, col]);
            setMoveCount(1);
            setFeedback(null);
            return;
        }

        const [curRow, curCol] = currentPos;

        // Check if it's a valid knight move
        if (!isValidMove(curRow, curCol, row, col)) {
            setFeedback({
                type: 'error',
                message: '❌ Invalid move! A knight moves in an "L" shape: 2 squares in one direction and 1 square perpendicular.'
            });
            return;
        }

        // Check if cell is already visited
        if (board[row][col] !== 0) {
            setFeedback({
                type: 'error',
                message: '❌ This square has already been visited! Each square can only be visited once.'
            });
            return;
        }

        // Valid move
        const newBoard = board.map(r => [...r]);
        const newMoveCount = moveCount + 1;
        newBoard[row][col] = newMoveCount;
        setBoard(newBoard);
        setCurrentPos([row, col]);
        setMoveCount(newMoveCount);
        setFeedback(null);

        // Check if tour is complete (13 or more squares visited)
        if (newMoveCount >= 13) {
            setFeedback({
                type: 'success',
                message: '🎉 Incredible! You completed the Knight\'s Tour! The Guardian of Creativity marvels at your strategic genius!'
            });
            setTimeout(onComplete, 2500);
        }
    };

    const undoLastMove = () => {
        if (moveCount === 0) return;

        const newBoard = board.map(r => [...r]);

        if (moveCount === 1) {
            // Undo first move - reset completely
            setBoard(Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(0)));
            setCurrentPos(null);
            setMoveCount(0);
        } else {
            // Find the current position and clear it
            for (let r = 0; r < BOARD_SIZE; r++) {
                for (let c = 0; c < BOARD_SIZE; c++) {
                    if (newBoard[r][c] === moveCount) {
                        newBoard[r][c] = 0;
                    }
                    if (newBoard[r][c] === moveCount - 1) {
                        setCurrentPos([r, c]);
                    }
                }
            }
            setBoard(newBoard);
            setMoveCount(moveCount - 1);
        }
        setFeedback(null);
    };

    const resetBoard = () => {
        setBoard(Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(0)));
        setCurrentPos(null);
        setMoveCount(0);
        setFeedback(null);
    };

    const showHint = () => {
        if (currentPos === null) {
            setFeedback({
                type: 'hint',
                message: '💡 Tip: Starting from a corner is often easier for finding a complete tour.'
            });
        } else {
            const validMoves = getValidMoves(currentPos[0], currentPos[1]);
            if (validMoves.length === 0) {
                setFeedback({
                    type: 'hint',
                    message: '💡 You\'re stuck! No valid moves left. Use "Undo" to backtrack and try a different path.'
                });
            } else {
                setFeedback({
                    type: 'hint',
                    message: `💡 Warnsdorff's Rule: Choose squares with fewer onward options first. You have ${validMoves.length} valid moves available.`
                });
            }
        }
    };

    const isValidNextMove = (row: number, col: number): boolean => {
        if (currentPos === null || board[row][col] !== 0) return false;
        return isValidMove(currentPos[0], currentPos[1], row, col);
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
                        <p className="puzzle-subtitle">Complete the Knight's Tour</p>
                    </div>

                    <div className="puzzle-content">
                        <div className="puzzle-question">
                            <p><strong>The Knight's Challenge:</strong></p>
                            <p>Move a knight to visit every square on the 4×4 board exactly once.</p>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                A knight moves in an "L" shape: 2 squares in one direction, then 1 square perpendicular.
                            </p>
                        </div>

                        {/* Chess board - proper 4x4 grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 65px)',
                            gridTemplateRows: 'repeat(4, 65px)',
                            gap: '0',
                            border: '3px solid var(--color-flame-mid)',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: '0 0 30px rgba(255, 165, 0, 0.3)',
                            margin: '1.5rem auto',
                            width: 'fit-content'
                        }}>
                            {board.map((row, rowIndex) => (
                                row.map((cell, colIndex) => {
                                    const isCurrentPos = currentPos && currentPos[0] === rowIndex && currentPos[1] === colIndex;
                                    const isVisited = cell > 0;
                                    const isValidTarget = isValidNextMove(rowIndex, colIndex);
                                    const isLight = (rowIndex + colIndex) % 2 === 0;

                                    return (
                                        <div
                                            key={`${rowIndex}-${colIndex}`}
                                            onClick={() => handleCellClick(rowIndex, colIndex)}
                                            style={{
                                                width: '65px',
                                                height: '65px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: (currentPos === null || isValidTarget) ? 'pointer' : 'not-allowed',
                                                background: isCurrentPos
                                                    ? 'linear-gradient(135deg, #ffd700, #ff8c00)'
                                                    : isVisited && !isCurrentPos
                                                        ? (isLight ? 'rgba(100, 200, 100, 0.5)' : 'rgba(60, 140, 60, 0.6)')
                                                        : isValidTarget
                                                            ? (isLight ? 'rgba(100, 255, 100, 0.3)' : 'rgba(60, 180, 60, 0.4)')
                                                            : isLight
                                                                ? 'linear-gradient(135deg, #e8d5b7 0%, #d4c4a8 100%)'
                                                                : 'linear-gradient(135deg, #8b6914 0%, #6b4f12 100%)',
                                                boxShadow: isCurrentPos
                                                    ? '0 0 15px rgba(255, 215, 0, 0.6)'
                                                    : isValidTarget
                                                        ? 'inset 0 0 10px rgba(0, 255, 0, 0.4)'
                                                        : 'none',
                                                transition: 'all 0.2s ease',
                                                position: 'relative'
                                            }}
                                        >
                                            {isCurrentPos && (
                                                <span style={{
                                                    fontSize: '2.2rem',
                                                    color: '#1a1a2e',
                                                    textShadow: '0 0 10px rgba(255, 215, 0, 0.8)'
                                                }}>♞</span>
                                            )}
                                            {isVisited && !isCurrentPos && (
                                                <span style={{
                                                    fontSize: '0.9rem',
                                                    fontWeight: 'bold',
                                                    color: isLight ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.8)'
                                                }}>{cell}</span>
                                            )}
                                        </div>
                                    );
                                })
                            ))}
                        </div>

                        <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--color-text-muted)' }}>
                            Squares visited: {moveCount}/{BOARD_SIZE * BOARD_SIZE}
                        </p>

                        {feedback && (
                            <div className={`feedback ${feedback.type}`}>
                                {feedback.message}
                            </div>
                        )}
                    </div>

                    <div className="puzzle-actions" style={{ gap: '0.5rem', flexWrap: 'wrap' }}>
                        <button className="btn btn-secondary" onClick={undoLastMove} disabled={moveCount === 0}>
                            ↩️ Undo
                        </button>
                        <button className="btn btn-secondary" onClick={resetBoard}>
                            🔄 Reset
                        </button>
                        <button className="btn btn-secondary" onClick={showHint}>
                            💡 Hint
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreativityPuzzle;
