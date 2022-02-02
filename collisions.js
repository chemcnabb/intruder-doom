
function horizontalCollision(up, angle) {
  var x = floor(player.gridX);
  var y = up ? floor(player.gridY) : floor(player.gridY) + 1;
  var aY = y * minimap.scale;
  var aX = player.x - (player.y - aY) / tan(angle);
  var dX = minimap.scale / tan(angle);
  var dY = minimap.scale;
  var distance = [1000, 0]; // arbitrary large number
  var i = 0;

  // moving up
  if (up) {
    // while inside the map
    while ((aY - i * dY) >= minimap.y) {
      // cordinate positions
      var posX = aX - i * dX;
      var posY = aY - i * dY;
      // grid positions
      var gX = floor(posX / minimap.scale);
      var gY = (posY / minimap.scale) - 1;

      if ((gX < mapWidth) && (gY >= 0) && worldMap[gY][gX] != 0) {
        distance = [dist(player.x, player.y, posX, posY), 0];
        break;
      }
      i++;
    }
    // moving down
  } else {
    while ((aY + i * dY) <= minimap.y + mapHeight * minimap.scale) {
      var posX = aX + i * dX;
      var posY = aY + i * dY;
      var gX = floor(posX / minimap.scale);
      var gY = (posY) / minimap.scale;

      if ((gX < mapWidth) && (gY >= 0) && worldMap[gY][gX] != 0) {
        distance = [dist(player.x, player.y, posX, posY), 1];
        break;
      }
      i++;
    }
  }
  return distance;
}

function verticalCollision(right, angle) {
  var x = right ? floor(player.gridX) + 1 : floor(player.gridX);
  var y = floor(player.gridY);
  var aX = x * minimap.scale;
  var aY = player.y + (aX - player.x) * tan(angle);
  var dY = minimap.scale * tan(angle);
  var dX = minimap.scale;

  var distance = [1000, 0]; // arbitrary large number
  var i = 0;
  fill(255, 0, 255);

  // moving right
  if (right) {
    // while inside the map
    while ((aX + i * dX) <= minimap.x + mapWidth * minimap.scale) {
      // cordinate positions
      var posX = aX + i * dX;
      var posY = aY + i * dY;
      // grid positions
      var gX = posX / minimap.scale;
      var gY = floor(posY / minimap.scale);

      if ((gX < mapWidth) && (gY >= 0) && (gY < mapHeight) && worldMap[gY][gX] != 0) {

        distance = [dist(player.x, player.y, posX, posY), 2];
        break;
      }
      i++;
    }
  } else {
    // while inside the map
    while ((aX - i * dX) >= minimap.x) {
      // cordinate positions
      var posX = aX - i * dX;
      var posY = aY - i * dY;
      // grid positions
      var gX = (posX / minimap.scale) - 1;
      var gY = floor(posY / minimap.scale);

      if ((gX >= 0) && (gY >= 0) && (gY < mapHeight) && worldMap[gY][gX] != 0) {
        distance = [dist(player.x, player.y, posX, posY), 3];
        break;
      }
      i++;
    }
  }
  return distance;
}

