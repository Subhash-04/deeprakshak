// Game state types for Deeprakshak
export type GuardianType = 'logic' | 'coding' | 'creativity' | 'strategy' | 'vision';

export type GameScreen = 'landing' | 'hub' | 'puzzle' | 'victory';

export interface Guardian {
    id: GuardianType;
    name: string;
    icon: string;
    description: string;
    skill: string;
}

export interface GameState {
    currentScreen: GameScreen;
    currentPuzzle: GuardianType | null;
    completedGuardians: GuardianType[];
    startTime: number | null;
    timeRemaining: number;
    isGameOver: boolean;
}

// Updated order: Logic → Coding → Strategy (Word Logic) → Creativity (4 Queens) → Vision (Sudoku)
export const GUARDIANS: Guardian[] = [
    {
        id: 'logic',
        name: 'Guardian of Logic',
        icon: '🧠',
        description: 'Decode the ancient number pattern to prove your reasoning abilities.',
        skill: 'Pattern Recognition'
    },
    {
        id: 'coding',
        name: 'Guardian of Code',
        icon: '💻',
        description: 'Predict the output of C code with pointer arithmetic.',
        skill: 'Programming'
    },
    {
        id: 'strategy',
        name: 'Guardian of Strategy',
        icon: '♟️',
        description: 'Solve word logic puzzles that test your linguistic wit.',
        skill: 'Word Logic'
    },
    {
        id: 'creativity',
        name: 'Guardian of Creativity',
        icon: '🎨',
        description: 'Place 4 queens on a board so none can attack each other.',
        skill: '4 Queens Puzzle'
    },
    {
        id: 'vision',
        name: 'Guardian of Vision',
        icon: '👁️',
        description: 'Complete the final Sudoku challenge to restore the light.',
        skill: 'Sudoku Master'
    }
];

export const GAME_DURATION = 45 * 60; // 45 minutes in seconds
