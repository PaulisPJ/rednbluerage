import React, { useEffect, useRef, useState } from 'react';

const GRAVITY = 0.4;
const FRICTION = 0.8;
const MAX_SPEED = 6;
const JUMP_FORCE = -12;
const ACCELERATION = 1.5;
const LIGHT_RADIUS = 250;

class Player {
  constructor(x, y, color, controls, id) {
    this.id = id;
    this.startX = x;
    this.startY = y;
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.color = color;
    this.vx = 0;
    this.vy = 0;
    this.controls = controls;
    this.isGrounded = false;
  }
  update(keys, canvas, levelHeight) {
    if (keys[this.controls.left]) this.vx -= ACCELERATION;
    else if (keys[this.controls.right]) this.vx += ACCELERATION;
    else this.vx *= FRICTION;

    this.vx = Math.max(Math.min(this.vx, MAX_SPEED), -MAX_SPEED);
    if (keys[this.controls.up] && this.isGrounded) {
      this.vy = JUMP_FORCE;
      this.isGrounded = false;
    }
    this.vy += GRAVITY;
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) { this.x = 0; this.vx = 0; }
    if (this.x + 30 > canvas.width) { this.x = canvas.width - 30; this.vx = 0; }
    
    // Death detection based on actual level height or bottom of viewport
    if (this.y > levelHeight + 100) this.respawn();
    this.isGrounded = false;
  }
  respawn() {
    this.x = this.startX;
    this.y = this.startY;
    this.vx = 0; this.vy = 0;
  }
  draw(ctx, cameraY) {
    ctx.save();
    ctx.translate(0, -cameraY);
    ctx.shadowBlur = 15;
    ctx.shadowColor = this.color;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  }
}

class Platform {
  constructor(x, y, w, h, owner = 0, isDynamic = false, requiresBoth = false) {
    this.x = x; this.y = y; this.w = w; this.h = h;
    this.owner = owner;
    this.isDynamic = isDynamic;
    this.requiresBoth = requiresBoth;
    this.opacity = isDynamic ? 0 : 1;
    this.visibleOpacity = 0;
  }
  updateOpacity(active) {
    if (!this.isDynamic) return;
    const target = active ? 1 : 0;
    this.opacity += (target - this.opacity) * 0.1;
  }
  draw(ctx, p1, p2, cameraY) {
    let dist = Infinity;
    const centerX = this.x + this.w/2;
    const centerY = this.y + this.h/2;
    const d1 = Math.sqrt(Math.pow(centerX - (p1.x + 15), 2) + Math.pow(centerY - (p1.y + 15), 2));
    const d2 = Math.sqrt(Math.pow(centerX - (p2.x + 15), 2) + Math.pow(centerY - (p2.y + 15), 2));

    if (this.owner === 1) dist = d2;
    else if (this.owner === 2) dist = d1;
    else dist = Math.min(d1, d2);

    let lightTarget = 0;
    if (this.requiresBoth) {
      if (d1 < LIGHT_RADIUS && d2 < LIGHT_RADIUS) {
        lightTarget = Math.min(1 - (d1 / LIGHT_RADIUS), 1 - (d2 / LIGHT_RADIUS));
      }
    } else {
      lightTarget = dist < LIGHT_RADIUS ? 1 - (dist / LIGHT_RADIUS) : 0;
    }

    this.visibleOpacity += (lightTarget - this.visibleOpacity) * 0.1;

    const finalAlpha = Math.min(this.opacity, this.visibleOpacity);
    if (finalAlpha < 0.05 && this.owner !== 0) return;

    ctx.save();
    ctx.translate(0, -cameraY);
    if (this.owner !== 0) ctx.globalAlpha = finalAlpha;
    if (this.owner === 0) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    } else if (this.owner === 1) {
      ctx.fillStyle = 'rgba(255, 50, 50, 0.3)';
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.8)';
    } else if (this.owner === 2) {
      ctx.fillStyle = 'rgba(50, 50, 255, 0.3)';
      ctx.strokeStyle = 'rgba(0, 0, 255, 0.8)';
    } else if (this.owner === 3) { // Dual World (Purple)
      ctx.fillStyle = 'rgba(138, 43, 226, 0.4)';
      ctx.strokeStyle = 'rgba(138, 43, 226, 0.8)';
    }
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeRect(this.x, this.y, this.w, this.h);
    ctx.restore();
  }
}

class Button {
  constructor(x, y, w, h, owner, color, targetPlatformIndex) {
    this.x = x; this.y = y; this.w = w; this.h = h;
    this.owner = owner;
    this.color = color;
    this.targetId = targetPlatformIndex;
    this.isPressed = false;
    this.holdFrames = 0;
  }
  checkPressed(p1, p2) {
    const p1On = (p1.id === this.owner && p1.x < this.x + this.w && p1.x + 30 > this.x && p1.y < this.y + this.h && p1.y + 30 > this.y);
    const p2On = (p2.id === this.owner && p2.x < this.x + this.w && p2.x + 30 > this.x && p2.y < this.y + this.h && p2.y + 30 > this.y);
    
    if (p1On || p2On) {
      this.holdFrames = 60; // 1 second hold
    } else {
      this.holdFrames = Math.max(0, this.holdFrames - 1);
    }
    
    this.isPressed = this.holdFrames > 0;
    return this.isPressed;
  }
  draw(ctx, cameraY) {
    const yOff = this.isPressed ? 5 : 0;
    ctx.save();
    ctx.translate(0, -cameraY);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = 0.6;
    ctx.fillRect(this.x, this.y + yOff, this.w, this.h - yOff);
    ctx.strokeStyle = this.color;
    ctx.globalAlpha = 1;
    ctx.strokeRect(this.x, this.y + yOff, this.w, this.h - yOff);
    ctx.restore();
  }
}

class ExitDoor {
  constructor(x, y, w, h) {
    this.x = x; this.y = y; this.w = w; this.h = h;
  }
  check(p1, p2) {
    const o1 = p1.x < this.x + this.w && p1.x + 30 > this.x && p1.y < this.y + this.h && p1.y + 30 > this.y;
    const o2 = p2.x < this.x + this.w && p2.x + 30 > this.x && p2.y < this.y + this.h && p2.y + 30 > this.y;
    return o1 && o2;
  }
  draw(ctx, cameraY) {
    ctx.save();
    ctx.translate(0, -cameraY);
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#00FF00';
    ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeStyle = '#00FF00';
    ctx.lineWidth = 3;
    ctx.strokeRect(this.x, this.y, this.w, this.h);
    ctx.restore();
  }
}

function Game({ levelData, onBackToMenu, onComplete }) {
  const canvasRef = useRef(null);
  const [levelFinished, setLevelFinished] = useState(false);
  const [camY, setCamY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const keys = {};
    const handleKD = (e) => (keys[e.key] = true, keys[e.key.toLowerCase()] = true);
    const handleKU = (e) => (keys[e.key] = false, keys[e.key.toLowerCase()] = false);
    window.addEventListener('keydown', handleKD);
    window.addEventListener('keyup', handleKU);

    const p1 = new Player(levelData.p1Start.x, levelData.p1Start.y, '#FF0000', { up: 'w', left: 'a', right: 'd' }, 1);
    const p2 = new Player(levelData.p2Start.x, levelData.p2Start.y, '#0000FF', { up: 'ArrowUp', left: 'ArrowLeft', right: 'ArrowRight' }, 2);
    const platforms = levelData.platforms.map(p => new Platform(p.x, p.y, p.w, p.h, p.owner, p.isDynamic, p.requiresBoth));
    const buttons = (levelData.buttons || []).map(b => new Button(b.x, b.y, b.w, b.h, b.owner, b.color, b.targetId));
    const exit = new ExitDoor(levelData.exit.x, levelData.exit.y, levelData.exit.w, levelData.exit.h);

    function checkColl(plr, plt) {
      // PREVENT INTERACTION WITH OTHER PLAYER WORLD
      // owner 1 = Red, owner 2 = Blue, owner 3 = Purple (both can touch)
      if (plt.owner !== 0 && plt.owner !== 3 && plt.owner !== plr.id) return;
      if (plt.isDynamic && plt.opacity < 0.5) return;
      if (plt.requiresBoth && plt.visibleOpacity < 0.5) return;

      if (plr.x < plt.x + plt.w && plr.x + 30 > plt.x && plr.y < plt.y + plt.h && plr.y + 30 > plt.y) {
        if (plr.vy > 0 && plr.y + 30 - plr.vy <= plt.y) { plr.isGrounded = true; plr.y = plt.y - 30; plr.vy = 0; }
        else if (plr.vy < 0 && plr.y - plr.vy >= plt.y + plt.h) { plr.y = plt.y + plt.h; plr.vy = 0; }
        else if (plr.vx > 0 && plr.x + 30 - plr.vx <= plt.x) { plr.x = plt.x - 30; plr.vx = 0; }
        else if (plr.vx < 0 && plr.x - plr.vx >= plt.x + plt.w) { plr.x = plt.x + plt.w; plr.vx = 0; }
      }
    }

    let animId;
    function loop() {
      // Camera Logic
      if (levelData.isScrolling) {
        const higherY = Math.min(p1.y, p2.y);
        const targetCamY = Math.max(0, Math.min(levelData.height - 500, higherY - 250));
        setCamY(prev => prev + (targetCamY - prev) * 0.1);
      } else {
        setCamY(0);
      }

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Local ref for drawing
      const curCamY = levelData.isScrolling ? Math.max(0, Math.min(levelData.height - 500, Math.min(p1.y, p2.y) - 250)) : 0;

      function drawLight(p, color, radius = LIGHT_RADIUS) {
        let cx = p.x + (p.w ? p.w / 2 : 15);
        let cy = p.y + (p.h ? p.h / 2 : 15) - curCamY;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, color + '66');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      drawLight(p1, '#FF0000');
      drawLight(p2, '#0000FF');
      drawLight(exit, '#00FF00', 100);

      p1.update(keys, canvas, levelData.height);
      p2.update(keys, canvas, levelData.height);

      buttons.forEach(btn => {
        btn.checkPressed(p1, p2);
        if (btn.targetId !== undefined) {
          platforms[btn.targetId].updateOpacity(btn.isPressed);
        }
        btn.draw(ctx, curCamY);
      });

      platforms.forEach(plat => {
        checkColl(p1, plat);
        checkColl(p2, plat);
        plat.draw(ctx, p1, p2, curCamY);
      });

      exit.draw(ctx, curCamY);
      p1.draw(ctx, curCamY);
      p2.draw(ctx, curCamY);

      if (exit.check(p1, p2)) {
        setLevelFinished(true);
        onComplete();
      } else {
        animId = requestAnimationFrame(loop);
      }
    }

    animId = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('keydown', handleKD);
      window.removeEventListener('keyup', handleKU);
      cancelAnimationFrame(animId);
    };
  }, [levelData]);

  return (
    <div className="game-container">
      <div className="game-header">
        <h1>{levelData.name}</h1>
        <button className="back-btn" onClick={onBackToMenu}>MENU</button>
      </div>
      <div style={{ position: 'relative', backgroundColor: '#000', borderRadius: '12px', overflow: 'hidden' }}>
        <canvas ref={canvasRef} id="gameCanvas" width="800" height="500"></canvas>
        {levelFinished && (
          <div className="victory-overlay">
            <h2>LEVEL COMPLETE</h2>
            <div className="victory-btns">
              <button className="victory-btn" onClick={onBackToMenu}>MAIN MENU</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Game;
