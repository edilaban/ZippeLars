export default class Tank {
  constructor(gameWidth, gameHeight, tankType) {
    this.width = 40;
    this.length = 90;
    this.towerWidth = 30;
    this.towerLength = 50;
    this.barrelWidth = 8;
    this.barrelLength = 40;
    this.maxSpeed = 5;
    this.relativeSpeed = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.speedInc = 25;
    this.tankHeading = 0;

    this.position = {
      x: 200 * tankType, //gameWidth / 2 - this.widht / 2,
      y: 100 //gameHeight - this.length - 40
    };
  }

  draw(ctx) {
    // Adjust for angle
    var transPos = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.length / 2
    };
    ctx.translate(transPos.x, transPos.y);

    // Rotated rectangle
    ctx.rotate((this.tankHeading * Math.PI) / 180);
    ctx.translate(-transPos.x, -transPos.y);
    // vehicle
    ctx.fillStyle = "#996600"; //"#999966";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.length);

    // tower
    ctx.fillStyle = "#7a7a52";
    ctx.fillRect(
      this.position.x + this.width / 2 - this.towerWidth / 2,
      this.position.y + this.length / 2 - this.towerLength / 2,
      this.towerWidth,
      this.towerLength
    );

    // barrel
    ctx.fillStyle = "#4d4d33";
    ctx.fillRect(
      this.position.x + this.width / 2 - this.barrelWidth / 2,
      this.position.y + this.length - this.towerLength / 2,
      this.barrelWidth,
      this.barrelLength
    );

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    // point
    ctx.fillStyle = "#ff0000"; //"#999966";
    ctx.fillRect(this.position.x, this.position.y, 3, 3);
  }

  updatePostion(deltaTime) {
    if (!deltaTime) {
      return 0;
    }
    // https://stackoverflow.com/questions/43641798/how-to-find-x-and-y-coordinates-on-a-flipped-circle-using-javascript-methods
    //x = radius * Math.sin(Math.PI * 2 * angle / 360);
    //y = radius * Math.cos(Math.PI * 2 * angle / 360);

    this.speedX =
      this.relativeSpeed * -Math.sin((Math.PI * 2 * this.tankHeading) / 360);
    this.speedY =
      this.relativeSpeed * Math.cos((Math.PI * 2 * this.tankHeading) / 360);

    this.position.x += this.speedX / deltaTime;
    this.position.y += this.speedY / deltaTime;
  }

  changeSpeed(inc) {
    this.relativeSpeed += inc;
  }

  runFwd() {
    this.relativeSpeed = this.relativeSpeed < 0 ? 0 : this.speedInc;
  }

  runRev() {
    this.relativeSpeed = this.relativeSpeed > 0 ? 0 : -this.speedInc;
  }

  stop() {
    this.relativeSpeed = 0;
  }

  turnLeft() {
    this.tankHeading += -5;
  }

  turnRight() {
    this.tankHeading += 5;
  }
}
