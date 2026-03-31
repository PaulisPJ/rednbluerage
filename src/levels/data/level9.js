export const level9 = {
  id: 9,
  name: "Level 9: The Final Apex",
  height: 2500,
  isScrolling: true,
  p1Start: { x: 400, y: 2400 },
  p2Start: { x: 400, y: 2400 },
  platforms: [
    { x: 300, y: 2450, w: 200, h: 50, owner: 0 },
    { x: 100, y: 2300, w: 100, h: 20, owner: 1 },
    { x: 600, y: 2300, w: 100, h: 20, owner: 2, isDynamic: true }, // Opened by Button 1
    { x: 600, y: 2150, w: 100, h: 20, owner: 2 },
    { x: 100, y: 2150, w: 100, h: 20, owner: 1, isDynamic: true }, // Opened by Button 2
    { x: 350, y: 2000, w: 100, h: 20, owner: 3, requiresBoth: true },
    { x: 350, y: 1850, w: 100, h: 20, owner: 0 },
    { x: 100, y: 1700, w: 150, h: 20, owner: 1 },
    { x: 550, y: 1700, w: 150, h: 20, owner: 2 },
    { x: 350, y: 1600, w: 100, h: 20, owner: 3, requiresBoth: true },
  ],
  buttons: [
    { x: 130, y: 2290, w: 40, h: 10, owner: 1, color: '#FF0000', targetId: 2 }, // P1 reveals P2's step
    { x: 630, y: 2140, w: 40, h: 10, owner: 2, color: '#0000FF', targetId: 4 }, // P2 reveals P1's step
  ],
  exit: { x: 360, y: 2500, w: 80, h: 60 }
};
