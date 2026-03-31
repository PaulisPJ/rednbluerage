export const level9 = {
  id: 9,
  name: "Level 9: The Final Apex",
  height: 4000,
  isScrolling: true,
  p1Start: { x: 400, y: 3900 },
  p2Start: { x: 400, y: 3900 },
  platforms: [
    { x: 300, y: 3950, w: 200, h: 50, owner: 0 },
    { x: 100, y: 3800, w: 100, h: 20, owner: 1 },
    { x: 600, y: 3800, w: 100, h: 20, owner: 2, isDynamic: true }, // Opened by Button 1
    { x: 600, y: 3650, w: 100, h: 20, owner: 2 },
    { x: 100, y: 3650, w: 100, h: 20, owner: 1, isDynamic: true }, // Opened by Button 2
    { x: 350, y: 3500, w: 100, h: 20, owner: 3, requiresBoth: true },
    { x: 350, y: 3350, w: 100, h: 20, owner: 0 },
    { x: 100, y: 3200, w: 150, h: 20, owner: 1 },
    { x: 550, y: 3200, w: 150, h: 20, owner: 2 },
    { x: 350, y: 3100, w: 100, h: 20, owner: 3, requiresBoth: true },
  ],
  buttons: [
    { x: 130, y: 3790, w: 40, h: 10, owner: 1, color: '#FF0000', targetId: 2 }, // P1 reveals P2's step
    { x: 630, y: 3640, w: 40, h: 10, owner: 2, color: '#0000FF', targetId: 4 }, // P2 reveals P1's step
  ],
  exit: { x: 360, y: 2900, w: 80, h: 60 }
};
