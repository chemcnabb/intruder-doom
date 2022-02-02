// Ray Casting
// aruvham





var screenWidth = 1024, // px
  screenHeight = 900; // px

var FOV = 45, // degrees
  resolution = 2, // px
  numberOfRays = screenWidth / resolution;

let bgImg;
function preload(){
  bgImage = loadImage("ship.png");
}
function setup() {
  createCanvas(screenWidth*2, screenHeight);
  minimap = new Minimap(0, 0, 10);
  player = new Player(screenWidth/2, 25);
}

function renderView(){
  noStroke();
  background(255);
  fill(255);
  rect(screenWidth, 0, screenWidth, screenHeight);
  fill(0);
  rect(screenWidth, 0, screenWidth, screenHeight/2);
  fill(200);
  rect(screenWidth, screenHeight/2, screenWidth, screenHeight/2);
}

function draw() {
  renderView();


image(bgImage, 0, 0, screenWidth, screenHeight);
  minimap.draw();

  minimap.drawGrid();

  castRays();

  player.update();
  player.draw();

}

function castRays() {
  var angleStep = FOV / numberOfRays; // 60 / 80 = 0.75
  var radianStep = (angleStep / 180) * PI // 0.013
  var initialAngle = player.dir - (0.5 * FOV / 180) * PI;
  stroke(0);

  for (var i = 0; i < numberOfRays; i++) {

    // make sure angle is between 0 and 2PI rads
    var newAngle = initialAngle + (radianStep * i);
    if (newAngle < 0) newAngle = (2 * PI) + newAngle;
    var distance = castSingleRay(newAngle);
    stroke("#FFF1A7");
    line(player.x, player.y, player.x + distance[0] * cos(newAngle), player.y + distance[0] * sin(newAngle));

    // render
    var z = (distance[0] / 10);
    var z = z * cos(player.dir - newAngle);
    var wallHeight = screenHeight / z;
    if (wallHeight > screenHeight) wallHeight = screenHeight;

    fill("#01A1A1");
    stroke("#01A1A1");
    if (distance[1] == 0 || distance[1] == 1) {
      fill("#016666");
      stroke("#016666");
    }
    rect(screenWidth + i * resolution, (screenHeight/2) - (0.5 * wallHeight), resolution, wallHeight);
    //rect(screenWidth + i * resolution, (screenHeight/2) - (0.5 * wallHeight), resolution, wallHeight);
  }
}

function castSingleRay(angle) {
  // Moving right/left? up/down? Determined by
  // which quadrant the angle is in
  var right = angle > (3 * PI / 2) || (angle >= 0 && angle < PI / 2);
  var up = angle > PI && angle < 2 * PI;

  // HORIZONTAL WALL COLLISIONS
  var hCol = horizontalCollision(up, angle);
  var vCol = verticalCollision(right, angle);
  return (hCol[0] < vCol[0]) ? hCol : vCol;
}



function keyPressed() {
  if (keyCode == UP_ARROW) player.speed = 1;
  if (keyCode == DOWN_ARROW) player.speed = -1;
  if (keyCode == LEFT_ARROW) player.rot = -1;
  if (keyCode == RIGHT_ARROW) player.rot = 1;
}

function keyReleased() {
  if (keyCode == UP_ARROW || keyCode == DOWN_ARROW) player.speed = 0;
  if (keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW) player.rot = 0;
}

window.addEventListener("keydown", function(e) {
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
}, false);
