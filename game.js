let octopus;
let obstacle = [];
let score = 0;
let octopusSprite;
let obstacleSprite;
let bg;
let gameoverFrame = 0;
let isGoingUp = false;
let isGoingDown = false;
let isGoingRight = false;
let isGoingLeft = false;
let obstacleGo = true;
let isOver = false;
let crash = false;

const DIVERS = 7;
const electron = require('electron');
const app = electron.app
const BrowserWindow = electron.BrowserWindow;
let mainWindow;
app.on('ready',function(){
  mainWindow = new BrowserWindow({width: 835, height:676, backgroundColor:'./sprite/tloelectron.png'})
mainWindow.loadFile('./index.html')
});


function setup() {
  createCanvas(800, 600);
  bg = loadImage("sprite/sea.png");
  octopusSprite = loadImage("sprite/octopus.png");
  octopus = new Octopus(octopusSprite)
  obstacleSprite = loadImage("sprite/dive.png");

  for (let i = 0; i < DIVERS; i++) {
    obstacle[i] = new Obstacle(obstacleSprite)
    obstacle[i].x = random(width, width)
    obstacle[i].y = Math.floor(random(0, height));
  }
}

function draw() {
  background(bg, 0, 0);

  showScores();
  octopus.show();
  octopus.update();

  for (let i = 0; i < obstacle.length; i++) {
    obstacle[i].show();
    if (obstacleGo) {
      obstacle[i].left()
    }

    if (obstacle[i].pass(octopus)) {
      score++
    }
    if (obstacle[i].crashWith(octopus, i)) {
      gameover()
    }

    if (obstacle[i].x < -500) {
      obstacle[i] = new Obstacle(obstacleSprite)
      obstacle[i].x = random(width, width * 1.3)
      obstacle[i].y = Math.floor(random(0, height));
    }
  }

  if (isGoingRight) {
    octopus.right()
  }
  if (isGoingLeft) {
    octopus.left()
  }
  if (isGoingUp) {
    octopus.up()
  }
}

function keyPressed() {

  if (keyCode == UP_ARROW) {
    isGoingUp = true
  } else if (keyCode == DOWN_ARROW) {
    isGoingDown = true
  } else if (keyCode == LEFT_ARROW) {
    isGoingLeft = true
  } else if (keyCode == RIGHT_ARROW) {
    isGoingRight = true
  } else if (keyCode == 32) {
    reset();
    obstacleGo = true
  }
}

function keyReleased() {
  if (keyCode == UP_ARROW) {
    isGoingUp = false
  } else if (keyCode == DOWN_ARROW) {
    isGoingDown = false
  } else if (keyCode == LEFT_ARROW) {
    isGoingLeft = false
  } else if (keyCode == RIGHT_ARROW) {
    isGoingRight = false
  }
}

function showScores() {
  score += 1;
  textSize(30);
  text('score: ' + score, 1, 30);
}

function gameover() {
  textSize(64);
  textAlign(CENTER, CENTER);
  text('GAME OVER', width / 2, height / 2);
  textAlign(LEFT, BASELINE);
  maxScore = max(score, maxScore);
  isOver = true;
  obstacleGo = false;
  noLoop();
}

function reset() {
  console.log("restart")
  isOver = false;
  score = 0;
  octopus = new Octopus(octopusSprite)
  for (let i = 0; i < DIVERS; i++) {
    obstacle[i] = new Obstacle(obstacleSprite)
    obstacle[i].x = random(width, width * 1.2)
    obstacle[i].y = Math.floor(random(0, height));
  }
  loop();
}