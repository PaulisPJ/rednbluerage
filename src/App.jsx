import React, { useState } from 'react';
import MainMenu from './components/MainMenu';
import Game from './components/Game';
import { LEVEL_DATA } from './levels/levelData';
import './App.css';

function App() {
  const [view, setView] = useState('menu');
  const [currentLevel, setCurrentLevel] = useState(1);

  const handleSelectLevel = (levelId) => {
    setCurrentLevel(levelId);
    setView('game');
  };

  const handleBackToMenu = () => {
    setView('menu');
  };

  const handleLevelComplete = () => {
    // Logic for completion can be handled inside Game.jsx victory overlay,
    // or we can transition back here if needed.
  };

  return (
    <div className="app-wrapper">
      {view === 'menu' ? (
        <MainMenu onSelectLevel={handleSelectLevel} />
      ) : (
        <Game 
          levelData={LEVEL_DATA[currentLevel]} 
          onBackToMenu={handleBackToMenu}
          onComplete={handleLevelComplete}
        />
      )}
      <div className="global-footer">
        {view === 'game' ? (
          <p>Red light reveals Blue. Blue light reveals Red. You cannot touch what you cannot see.</p>
        ) : (
          <p>Wander the darkness to find your path.</p>
        )}
      </div>
    </div>
  );
}

export default App;
