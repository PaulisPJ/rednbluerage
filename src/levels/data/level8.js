export const level8 = {
  id: 8,
  name: "Level 8: Synchronized Climb",
  height: 4000,
  isScrolling: true,
  p1Start: { x: 200, y: 3900 },
  p2Start: { x: 600, y: 3900 },
  platforms: [
    { x: 150, y: 3950, w: 500, h: 50, owner: 0 },
    { x: 100, y: 3800, w: 100, h: 20, owner: 1 },
    { x: 600, y: 3800, w: 100, h: 20, owner: 2 },
    { x: 350, y: 3650, w: 100, h: 20, owner: 3, requiresBoth: true },
  ],
  exit: { x: 360, y: 100, w: 80, h: 60 }
};
