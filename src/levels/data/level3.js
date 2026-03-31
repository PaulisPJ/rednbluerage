export const level3 = {
  id: 3,
  name: "Level 3: Mirror Hall",
  height: 500,
  p1Start: { x: 50, y: 400 },
  p2Start: { x: 700, y: 400 },
  platforms: [
    { x: 0, y: 450, w: 100, h: 50, owner: 0 },
    { x: 700, y: 450, w: 100, h: 50, owner: 0 },
    { x: 120, y: 380, w: 100, h: 20, owner: 2 },
    { x: 580, y: 380, w: 100, h: 20, owner: 1 },
    { x: 250, y: 320, w: 100, h: 20, owner: 2 },
    { x: 450, y: 320, w: 100, h: 20, owner: 1 },
    { x: 350, y: 220, w: 100, h: 20, owner: 0 },
    { x: 350, y: 440, w: 100, h: 20, owner: 3, requiresBoth: true },
  ],
  exit: { x: 360, y: 500, w: 80, h: 60 }
};
