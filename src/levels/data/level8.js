export const level8 = {
  id: 8,
  name: "Level 8: Synchronized Climb",
  height: 2000,
  isScrolling: true,
  p1Start: { x: 200, y: 1900 },
  p2Start: { x: 600, y: 1900 },
  platforms: [
    { x: 150, y: 1950, w: 500, h: 50, owner: 0 },
    { x: 100, y: 1800, w: 100, h: 20, owner: 1 },
    { x: 600, y: 1800, w: 100, h: 20, owner: 2 },
    { x: 350, y: 1650, w: 100, h: 20, owner: 3, requiresBoth: true },
    { x: 100, y: 1500, w: 100, h: 20, owner: 2 },
    { x: 600, y: 1500, w: 100, h: 20, owner: 1 },
    { x: 400, y: 1350, w: 100, h: 20, owner: 3, requiresBoth: true },
    { x: 100, y: 1200, w: 100, h: 20, owner: 1 },
    { x: 600, y: 1200, w: 100, h: 20, owner: 2 },
    { x: 400, y: 1050, w: 100, h: 20, owner: 3, requiresBoth: true },
    { x: 350, y: 900, w: 100, h: 20, owner: 0 },
  ],
  exit: { x: 360, y: 840, w: 80, h: 60 }
};
