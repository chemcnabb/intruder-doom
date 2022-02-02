class Player {
  constructor(x, y) {
    this.x = x + minimap.x;
    this.y = y + minimap.y;
    this.gridX = this.x / minimap.scale;
    this.gridY = this.y / minimap.scale;
    this.dir = 0; // angle
    this.rot = 0;
    this.speed = 0;
    this.moveSpeed = 1;
    this.rotSpeed = 2.5 * PI / 180;
    this.radius = 4;
  }

  draw() {
    var squareSize = (2 * this.radius) * (2 * this.radius);
    squareSize /= 2;
    squareSize = sqrt(squareSize);
    fill(255, 0, 0);
    stroke(255, 0, 0);
    rectMode(CENTER);
    rect(this.x, this.y, squareSize, squareSize);
    rectMode(CORNER);
  }

  update() {
    // so player angle is always between 0 and 2PI rads
    this.dir += (this.rot > 0) ? this.rot * this.rotSpeed : 2 * PI + this.rot * this.rotSpeed;
    this.dir %= 2 * PI;
    let newX = this.x + this.speed * this.moveSpeed * cos(this.dir);
    let newY = this.y + this.speed * this.moveSpeed * sin(this.dir);

    if (!this.collision(newX, newY)) {
      this.x = newX;
      this.y = newY;
    }

    this.gridX = this.x / minimap.scale;
    this.gridY = this.y / minimap.scale;
  }

  collision(newX, newY) {
    if (newX - this.radius < minimap.x ||
      newX + this.radius > minimap.x + mapWidth * minimap.scale ||
      newY - this.radius < minimap.y ||
      newY + this.radius > minimap.y + mapHeight * minimap.scale) {
      return true;
    }
    return worldMap[floor((newY - minimap.y) / minimap.scale)][floor((newX - minimap.x) / minimap.scale)] != 0;
  }
}