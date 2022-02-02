class Minimap {

  constructor(x, y, scale){
  this.x = x;
  this.y = y;
  this.scale = scale; // in pixels
  }
  draw() {
    // fill(255);
    noFill();
    noStroke();
    rect(this.x, this.y, mapWidth * this.scale, mapHeight * this.scale);

    fill(200);
    for(let y = 0; y < mapHeight; y++) {
      for(let x = 0; x < mapWidth; x++) {
        if(worldMap[y][x] != 0) {
          rect(this.x + x * this.scale, this.y + y * this.scale, this.scale, this.scale);
        }
      }
    }
  }

  drawGrid() {
    stroke(0);
    for(let x = 0; x <= mapWidth; x++) {
      line(this.x + x * this.scale, this.y, this.x + x * this.scale, this.y + mapHeight * this.scale);
    }
    for(let y = 0; y <= mapHeight; y++) {
      line(this.x, this.y + y * this.scale, this.x + mapWidth * this.scale, this.y + y * this.scale);
    }
  }
}
