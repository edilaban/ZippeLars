export default class InputHandler {
  constructor(tank) {
    this.tank = tank;
    document.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        case 87:
          // W;
          this.tank.stop();
          break;
        case 83:
          // S;
          this.tank.stop();
          break;
        default:
          break;
      }
    });

    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        /*
        case 37:
          // move left;
          this.tank.turnLeft();
          break;
        case 39:
          // move right;
          this.tank.turnRight();
          break;
        case 38:
          // speed up;
          this.tank.runFwd();
          break;
        case 40:
          // speed down;
          this.tank.runRev();
          break;
        */
        case 87:
          // W;
          this.tank.runFwd();
          break;
        case 83:
          // S;
          this.tank.runRev();
          break;
        case 65:
          // A;
          this.tank.turnLeft();
          break;
        case 68:
          // D;
          this.tank.turnRight();
          break;

        default:
          //alert(event.keyCode);
          break;
      }
    });
  }
}
