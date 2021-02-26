class RectElement {
  constructor(posX, posY, width = 30, height = 30) {
    this.x = posX;
    this.y = posY;
    this.w = width;
    this.h = height;
  }
}

export default class Map {
  constructor(gameWidth, gameHeight, mapId) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.elements = [];
    this.moving = [];

    this.lastCollisionIdx = -1;

    this.createMap(mapId);
  }

  drawMap(ctx) {
    ctx.fillStyle = "#ebebe0";
    ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
    this.elements.forEach((e, idx) => {
      ctx.fillStyle = "#ccccff";
      ctx.fillRect(e.x, e.y, e.w, e.h);
      ctx.fillStyle = "#000";
      ctx.fillText(`(${e.x}, ${e.y})`, e.x + 2, e.y + 7);
      ctx.fillText(`${idx}`, e.x + 50, e.y + 50);
      ctx.fillText(`(${e.x + e.w}, ${e.y + e.h})`, e.x + 50, e.y + 95);
    });
  }

  addMovingObject(obj, startX, startY) {
    obj.x = startX;
    obj.y = startY;
    this.moving.push(obj);
  }

  collitionDetect() {
    // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    this.lastCollisionIdx = -1;

    this.elements.forEach((e, idx) => {
      this.moving.forEach((m, mi) => {
        let x = m.x;
        let y = m.y;
        if (x > e.x && x < e.x + e.w && y > e.y && y < e.y + e.h) {
          this.lastCollisionIdx = idx;
        }
      });
    });
  }

  createMap(mapId) {
    switch (mapId) {
      case 0:
        break;

      default:
        this.createRandomRects(10);
        break;
    }
  }

  createRandomRects(num) {
    for (let i = 0; i < num; i++) {
      let randX = Math.floor(Math.random() * this.gameWidth) + 1;
      let randY = Math.floor(Math.random() * this.gameHeight) + 1;
      let e = new RectElement(randX, randY, 100, 100);
      this.elements.push(e);
    }
  }
}
