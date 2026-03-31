export const level5 = {
  id: 5,
  name: "Level 5: The Great Ascent",
  height: 2000,
  isScrolling: true,
  p1Start: { x: 300, y: 1900 },
  p2Start: { x: 500, y: 1900 },
  platforms: [
    { x: 250, y: 1950, w: 300, h: 50, owner: 0 },
    { x: 100, y: 1800, w: 150, h: 20, owner: 2 },
    { x: 550, y: 1800, w: 150, h: 20, owner: 1 },
    { x: 350, y: 1700, w: 100, h: 20, owner: 0 },
    { x: 100, y: 1600, w: 150, h: 20, owner: 2 },
    { x: 550, y: 1600, w: 150, h: 20, owner: 1 },
    { x: 350, y: 1500, w: 100, h: 20, owner: 3, requiresBoth: true },
    { x: 150, y: 1350, w: 100, h: 20, owner: 3, requiresBoth: true },
    { x: 350, y: 1250, w: 100, h: 20, owner: 3, requiresBoth: true },
    { x: 550, y: 1150, w: 100, h: 20, owner: 3, requiresBoth: true },
    { x: 350, y: 1050, w: 100, h: 20, owner: 3, requiresBoth: true },
  ],
  exit: { x: 360, y: 850, w: 80, h: 60 }
};
