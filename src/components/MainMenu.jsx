import React, { useState } from 'react';
import { LEVEL_DATA } from '../levels/levelData';

function MainMenu({ onSelectLevel }) {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className="menu-container" onMouseMove={handleMouseMove}>
      <div 
        className="flashlight-overlay" 
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, transparent 0%, rgba(0,0,0,0.98) 150px)`
        }}
      />
      <div className="menu-content">
        <h1 className="menu-title">SHADOW SYNC</h1>
        <div className="level-selection-grid">
          {Object.keys(LEVEL_DATA).map(key => (
            <button 
              key={key} 
              className="level-btn"
              onClick={() => onSelectLevel(Number(key))}
            >
              Level {key}
            </button>
          ))}
        </div>
        <p className="menu-hint" style={{ marginTop: '50px' }}>Wander the darkness to find your path...</p>
      </div>
    </div>
  );
}

export default MainMenu;
