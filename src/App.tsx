import React, { useState, useCallback } from 'react';
import { GuardianType, GUARDIANS, GAME_DURATION } from './types';
import IntroScreen from './screens/IntroScreen';
import LandingScreen from './screens/LandingScreen';
import LevelIntro from './screens/LevelIntro';
import VictoryScreen from './screens/VictoryScreen';
import TimeUpScreen from './screens/TimeUpScreen';
import LogicPuzzle from './puzzles/LogicPuzzle';
import CodingPuzzle from './puzzles/CodingPuzzle';
import CreativityPuzzle from './puzzles/CreativityPuzzle';
import StrategyPuzzle from './puzzles/StrategyPuzzle';
import VisionPuzzle from './puzzles/VisionPuzzle';
import Timer from './components/Timer';
import ProgressIndicator from './components/ProgressIndicator';
import './App.css';

type GameScreen = 'intro' | 'landing' | 'levelIntro' | 'puzzle' | 'victory' | 'timeup';

// Fixed order of guardians (swapped strategy and creativity)
const LEVEL_ORDER: GuardianType[] = ['logic', 'coding', 'strategy', 'creativity', 'vision'];

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('intro');
  const [currentLevel, setCurrentLevel] = useState(0); // 0-4
  const [startTime, setStartTime] = useState<number | null>(null);

  // After intro video, go to landing page
  const handleIntroComplete = useCallback(() => {
    setCurrentScreen('landing');
  }, []);

  // Start the game - go to first level intro
  const handleStart = useCallback(() => {
    setStartTime(Date.now());
    setCurrentLevel(0);
    setCurrentScreen('levelIntro');
  }, []);

  // Continue from level intro to puzzle
  const handleStartPuzzle = useCallback(() => {
    setCurrentScreen('puzzle');
  }, []);

  // Complete current puzzle and move to next
  const handleCompletePuzzle = useCallback(() => {
    const nextLevel = currentLevel + 1;

    if (nextLevel >= 5) {
      // All levels complete!
      setCurrentScreen('victory');
    } else {
      // Move to next level intro
      setCurrentLevel(nextLevel);
      setCurrentScreen('levelIntro');
    }
  }, [currentLevel]);

  // Time's up - show TimeUp screen
  const handleTimeUp = useCallback(() => {
    setCurrentScreen('timeup');
  }, []);

  // Restart the game
  const handleRestart = useCallback(() => {
    setCurrentScreen('intro');
    setCurrentLevel(0);
    setStartTime(null);
  }, []);

  // Calculate time spent for victory screen
  const getTimeSpent = () => {
    if (!startTime) return 0;
    return Math.floor((Date.now() - startTime) / 1000);
  };

  // Get current guardian type
  const getCurrentGuardian = (): GuardianType => LEVEL_ORDER[currentLevel];

  // Render puzzle based on current level
  const renderPuzzle = () => {
    const puzzleProps = {
      onComplete: handleCompletePuzzle,
      onBack: () => { },
      progress: currentLevel
    };

    switch (getCurrentGuardian()) {
      case 'logic':
        return <LogicPuzzle {...puzzleProps} />;
      case 'coding':
        return <CodingPuzzle {...puzzleProps} />;
      case 'creativity':
        return <CreativityPuzzle {...puzzleProps} />;
      case 'strategy':
        return <StrategyPuzzle {...puzzleProps} />;
      case 'vision':
        return <VisionPuzzle {...puzzleProps} />;
      default:
        return null;
    }
  };

  // Render current screen
  const renderScreen = () => {
    // Intro screen (before landing)
    if (currentScreen === 'intro') {
      return <IntroScreen onComplete={handleIntroComplete} />;
    }

    // Landing screen (after intro video)
    if (currentScreen === 'landing') {
      return <LandingScreen onStart={handleStart} />;
    }

    // Time Up screen
    if (currentScreen === 'timeup') {
      return <TimeUpScreen onRestart={handleRestart} />;
    }

    if (currentScreen === 'victory') {
      return (
        <VictoryScreen
          timeSpent={getTimeSpent()}
          onRestart={handleRestart}
        />
      );
    }

    if (currentScreen === 'levelIntro') {
      return (
        <>
          <LevelIntro
            currentLevel={currentLevel}
            onContinue={handleStartPuzzle}
          />
          <header className="game-header">
            <div className="game-title">🪔 Deeprakshak</div>
            <ProgressIndicator completedCount={currentLevel} />
            <Timer
              startTime={startTime}
              duration={GAME_DURATION}
              onTimeUp={handleTimeUp}
            />
          </header>
        </>
      );
    }

    if (currentScreen === 'puzzle') {
      return (
        <>
          {renderPuzzle()}
          <header className="game-header">
            <div className="game-title">🪔 Level {currentLevel + 1}: {GUARDIANS[currentLevel].name}</div>
            <ProgressIndicator completedCount={currentLevel} />
            <Timer
              startTime={startTime}
              duration={GAME_DURATION}
              onTimeUp={handleTimeUp}
            />
          </header>
        </>
      );
    }

    return null;
  };

  return (
    <div className="app-container">
      {renderScreen()}
    </div>
  );
};

export default App;
