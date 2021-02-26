import Tank from "../src/Tank.js";
import Map from "../src/Map.js";
import InputHandler from "../src/InputHandler.js";

/*
  Tutorials:
  - https://www.youtube.com/watch?v=3EMxBkqC4z0&feature=emb_logo

  - https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate


  Resources:
  - https://www.w3schools.com/colors/colors_picker.asp
  */

let canvas = document.getElementById("gameScreen");

let ctx = canvas.getContext("2d");
let infoTextCount = 0;

const GAME_WIDTH = 1000;
const GAME_HEIGHT = 1000;

ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

//ctx.fillStyle = "#f00";
//ctx.fillRect(20, 20, 100, 100);

//ctx.fillStyle = "#00f";
//ctx.fillRect(200, 250, 60, 170);

let tank1 = new Tank(GAME_WIDTH, GAME_HEIGHT, 1);
tank1.draw(ctx);

let map = new Map(GAME_WIDTH, GAME_HEIGHT);
map.addMovingObject(tank1, 150, 150);

new InputHandler(tank1);

/*
let tank2 = new Tank(GAME_WIDTH, GAME_HEIGHT, 2);
tank2.draw(ctx);
*/

let lastTime = 0;

function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  tank1.updatePostion(deltaTime);

  map.collitionDetect();
  map.drawMap(ctx);
  tank1.draw(ctx);

  // Tank Info
  infoTextCount = 0;
  appendInfo("Tank angle: " + tank1.tankHeading);
  appendInfo("Tank pos X: " + tank1.x);
  appendInfo("Tank pos Y: " + tank1.y);
  appendInfo("Tank speed R: " + tank1.relativeSpeed);
  appendInfo("Tank speed X: " + tank1.speedX);
  appendInfo("Tank speed Y: " + tank1.speedY);
  appendInfo("Map objects: " + map.elements.length);
  appendInfo("Collision: " + map.lastCollisionIdx);

  requestAnimationFrame(gameLoop);
}

gameLoop();

function appendInfo(txt) {
  infoTextCount++;
  ctx.fillStyle = "#000";
  ctx.fillText(txt, 10, 10 * infoTextCount);
}
