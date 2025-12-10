import React, { useState, useEffect, useCallback } from 'react';
import '../puzzles/PuzzleScreen.css';
import './SudokuPuzzle.css';

interface VisionPuzzleProps {
    onComplete: () => void;
    onBack: () => void;
    progress: number;
}

// Sudoku: Fewer clues for harder challenge (about 25 given)
const INITIAL_PUZZLE = [
    [0, 2, 0, 0, 0, 4, 3, 0, 0],
    [9, 0, 0, 3, 0, 0, 0, 0, 8],
    [0, 4, 0, 6, 0, 0, 0, 5, 0],
    [0, 0, 0, 4, 0, 8, 0, 0, 0],
    [4, 0, 0, 0, 0, 0, 0, 0, 9],
    [0, 0, 0, 9, 0, 2, 0, 0, 0],
    [0, 8, 0, 0, 0, 5, 0, 1, 0],
    [1, 0, 0, 0, 0, 6, 0, 0, 3],
    [0, 0, 9, 0, 0, 0, 0, 6, 0]
];

// Complete solution (blue numbers filled in)
const SOLUTION = [
    [8, 2, 7, 1, 5, 4, 3, 9, 6],
    [9, 6, 5, 3, 2, 7, 1, 4, 8],
    [3, 4, 1, 6, 8, 9, 7, 5, 2],
    [5, 9, 3, 4, 6, 8, 2, 7, 1],
    [4, 7, 2, 5, 1, 3, 6, 8, 9],
    [6, 1, 8, 9, 7, 2, 4, 3, 5],
    [7, 8, 6, 2, 3, 5, 9, 1, 4],
    [1, 5, 4, 7, 9, 6, 8, 2, 3],
    [2, 3, 9, 8, 4, 1, 5, 6, 7]
];

const VisionPuzzle: React.FC<VisionPuzzleProps> = ({ onComplete, onBack, progress }) => {
    const [board, setBoard] = useState<number[][]>(INITIAL_PUZZLE.map(row => [...row]));
    const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
    const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
    const [conflicts, setConflicts] = useState<Set<string>>(new Set());
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'hint'; message: string } | null>(null);
    const [isEraseMode, setIsEraseMode] = useState(false);

    const isInitialCell = (row: number, col: number): boolean => {
        return INITIAL_PUZZLE[row][col] !== 0;
    };

    // Find conflicts in the grid
    const findConflicts = useCallback(() => {
        const newConflicts = new Set<string>();

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const value = board[row][col];
                if (value !== 0) {
                    // Check row
                    for (let c = 0; c < 9; c++) {
                        if (c !== col && board[row][c] === value) {
                            newConflicts.add(`${row}-${col}`);
                            newConflicts.add(`${row}-${c}`);
                        }
                    }
                    // Check column
                    for (let r = 0; r < 9; r++) {
                        if (r !== row && board[r][col] === value) {
                            newConflicts.add(`${row}-${col}`);
                            newConflicts.add(`${r}-${col}`);
                        }
                    }
                    // Check 3x3 box
                    const boxRow = Math.floor(row / 3) * 3;
                    const boxCol = Math.floor(col / 3) * 3;
                    for (let r = boxRow; r < boxRow + 3; r++) {
                        for (let c = boxCol; c < boxCol + 3; c++) {
                            if ((r !== row || c !== col) && board[r][c] === value) {
                                newConflicts.add(`${row}-${col}`);
                                newConflicts.add(`${r}-${c}`);
                            }
                        }
                    }
                }
            }
        }

        setConflicts(newConflicts);
        return newConflicts;
    }, [board]);

    useEffect(() => {
        findConflicts();
    }, [board, findConflicts]);

    const getFilledCount = (): number => {
        return board.flat().filter(cell => cell !== 0).length;
    };

    const getProgress = (): number => {
        return Math.round((getFilledCount() / 81) * 100);
    };

    const handleCellClick = (row: number, col: number) => {
        if (isInitialCell(row, col)) return;

        setSelectedCell([row, col]);

        if (isEraseMode) {
            const newBoard = board.map(r => [...r]);
            newBoard[row][col] = 0;
            setBoard(newBoard);
        } else if (selectedNumber !== null) {
            const newBoard = board.map(r => [...r]);
            newBoard[row][col] = selectedNumber;
            setBoard(newBoard);
        }
    };

    const handleNumberSelect = (num: number) => {
        setSelectedNumber(num);
        setIsEraseMode(false);

        // If cell is selected, place number
        if (selectedCell && !isInitialCell(selectedCell[0], selectedCell[1])) {
            const newBoard = board.map(r => [...r]);
            newBoard[selectedCell[0]][selectedCell[1]] = num;
            setBoard(newBoard);
        }
    };

    const handleErase = () => {
        setIsEraseMode(true);
        setSelectedNumber(null);

        if (selectedCell && !isInitialCell(selectedCell[0], selectedCell[1])) {
            const newBoard = board.map(r => [...r]);
            newBoard[selectedCell[0]][selectedCell[1]] = 0;
            setBoard(newBoard);
        }
    };

    const resetGrid = () => {
        setBoard(INITIAL_PUZZLE.map(row => [...row]));
        setSelectedCell(null);
        setSelectedNumber(null);
        setFeedback(null);
    };

    const validateSolution = () => {
        const emptyCount = 81 - getFilledCount();
        const currentConflicts = findConflicts();

        if (emptyCount > 0) {
            setFeedback({
                type: 'error',
                message: `❌ ${emptyCount} cells are still empty. Fill all cells first!`
            });
            return;
        }

        if (currentConflicts.size > 0) {
            setFeedback({
                type: 'error',
                message: `⚠️ ${currentConflicts.size / 2} conflicts detected. Fix them to achieve harmony!`
            });
            return;
        }

        // All filled and no conflicts = Victory!
        setFeedback({
            type: 'success',
            message: '🎉 Celestial Harmony Achieved! The Guardian of Vision bows to your wisdom!'
        });
        setTimeout(onComplete, 2500);
    };

    const getHarmonyLevel = (): string => {
        if (conflicts.size === 0) return 'Perfect';
        if (conflicts.size <= 4) return 'Good';
        return 'Disrupted';
    };

    const getBoxIndex = (row: number, col: number): number => {
        return Math.floor(row / 3) * 3 + Math.floor(col / 3);
    };

    return (
        <div className="puzzle-screen sudoku-screen">
            <div className="bg-gradient"></div>
            <div className="bg-stars"></div>

            {/* Floating particles */}
            <div className="sudoku-particles">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="sudoku-particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`
                        }}
                    />
                ))}
            </div>

            <div className="puzzle-wrapper sudoku-wrapper">
                <div className="puzzle-container sudoku-container">
                    <div className="puzzle-header">
                        <div className="puzzle-icon">👁️</div>
                        <h2 className="puzzle-title">Hall of Reflections</h2>
                        <p className="puzzle-subtitle">Celestial Sudoku Harmony Challenge</p>
                    </div>

                    {/* Status Bar */}
                    <div className="sudoku-status-bar">
                        <div className="status-item">
                            <span className="status-label">Progress</span>
                            <div className="progress-bar-mini">
                                <div className="progress-fill-mini" style={{ width: `${getProgress()}%` }}></div>
                            </div>
                            <span className="status-value">{getProgress()}%</span>
                        </div>
                        <div className="status-item">
                            <span className="status-label">Conflicts</span>
                            <span className={`status-value ${conflicts.size > 0 ? 'conflict-text' : ''}`}>
                                {Math.floor(conflicts.size / 2)}
                            </span>
                        </div>
                        <div className="status-item">
                            <span className="status-label">Harmony</span>
                            <span className={`status-value harmony-${getHarmonyLevel().toLowerCase()}`}>
                                {getHarmonyLevel()}
                            </span>
                        </div>
                    </div>

                    <div className="puzzle-content">
                        <div className="puzzle-question">
                            <p><strong>🌌 Challenging:</strong> Only 20 clues given! Fill the grid so each row, column, and 3×3 box contains 1-9.</p>
                        </div>

                        {/* Sudoku Grid */}
                        <div className="sudoku-grid">
                            {board.map((row, rowIndex) => (
                                <div key={rowIndex} className="sudoku-row">
                                    {row.map((cell, colIndex) => {
                                        const isSelected = selectedCell && selectedCell[0] === rowIndex && selectedCell[1] === colIndex;
                                        const isFixed = isInitialCell(rowIndex, colIndex);
                                        const hasConflict = conflicts.has(`${rowIndex}-${colIndex}`);
                                        const boxIndex = getBoxIndex(rowIndex, colIndex);

                                        return (
                                            <div
                                                key={colIndex}
                                                className={`sudoku-cell 
                          ${isFixed ? 'fixed' : 'editable'} 
                          ${isSelected ? 'selected' : ''}
                          ${hasConflict ? 'conflict' : ''}
                          ${boxIndex % 2 === 0 ? 'box-light' : 'box-dark'}
                          ${colIndex % 3 === 2 && colIndex !== 8 ? 'border-right' : ''}
                          ${rowIndex % 3 === 2 && rowIndex !== 8 ? 'border-bottom' : ''}
                        `}
                                                onClick={() => handleCellClick(rowIndex, colIndex)}
                                            >
                                                {cell !== 0 ? cell : ''}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>

                        {/* Number Selection */}
                        <div className="number-selection">
                            <h4 className="selection-title">✨ Celestial Numbers</h4>
                            <div className="number-palette">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                                    <button
                                        key={num}
                                        className={`num-btn ${selectedNumber === num ? 'active' : ''}`}
                                        onClick={() => handleNumberSelect(num)}
                                    >
                                        {num}
                                    </button>
                                ))}
                                <button
                                    className={`num-btn erase-btn ${isEraseMode ? 'active' : ''}`}
                                    onClick={handleErase}
                                >
                                    🧹
                                </button>
                            </div>
                        </div>

                        {feedback && (
                            <div className={`feedback ${feedback.type}`}>
                                {feedback.message}
                            </div>
                        )}
                    </div>

                    <div className="puzzle-actions">
                        <button className="btn btn-secondary" onClick={resetGrid}>
                            🔄 Reset
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={validateSolution}
                            disabled={feedback?.type === 'success'}
                        >
                            ✅ Validate Harmony
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisionPuzzle;
