export const level7 = {
  id: 7,
  name: "Level 7: The Final Link",
  height: 500,
  p1Start: { x: 50, y: 400 },
  p2Start: { x: 720, y: 400 },
  platforms: [
    { x: 0, y: 450, w: 150, h: 50, owner: 0 },
    { x: 650, y: 450, w: 150, h: 50, owner: 0 },
    { x: 200, y: 350, w: 100, h: 20, owner: 1 },
    { x: 500, y: 350, w: 100, h: 20, owner: 2 },
    { x: 550, y: 220, w: 100, h: 20, owner: 2 },
    // Hidden platforms for P1 triggered by P2
    { x: 350, y: 250, w: 100, h: 20, owner: 1, isDynamic: true },
    // Static shared platform
    { x: 350, y: 120, w: 100, h: 20, owner: 0 },
  ],
  buttons: [
    { x: 530, y: 340, w: 40, h: 10, owner: 2, color: '#0000FF', targetId: 5 } // P2 standing here reveals platform index 5
  ],
  exit: { x: 360, y: 60, w: 80, h: 60 }
};
