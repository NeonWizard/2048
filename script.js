let grid = [];
for (let i = 0; i < 4; i++) { grid.push([]); }

let largestTile = 2;

function updateTile(x, y) {
	let tile = document.querySelector(`.row${y}.col${x}`);
	// tile.style.backgroundColor = `rgb(${100 - value * 4}, 75, ${255 - value * 16})`;
	// Just copy maryn and do the grayscale cuz I honestly like how it looks
	let color = 240 - Math.log2(grid[x][y]) * 30;
	tile.style.color = "white";
	if (color > 180) tile.style.color = "rgb(40, 40, 40)";
	tile.style.backgroundColor = `rgb(${color}, ${color}, ${color})`;
	tile.innerHTML = grid[x][y];
}

function addTile(x, y, value) {
	if (grid[x][y]) return false;

	grid[x][y] = value;

	let tile = document.createElement("DIV");
	tile.className = `row${y} col${x} tile`;
	tile.x = x;
	tile.y = y;
	tile.style.left = `${8 + tile.x * 156}px`;
	tile.style.top =  `${8 + tile.y * 156}px`;
	document.getElementById("tile-container").appendChild(tile);

	updateTile(x, y);

	return true;
}

function addRandomTile(value) {
	if (!checkForOpenCells()) return;

	while (!addTile(Math.floor(Math.random() * 4),
	Math.floor(Math.random() * 4),
	value)) {
		continue;
	}
}

function moveTile(x, y, newx, newy) {
	let tile = document.querySelector(`.row${y}.col${x}`);
	tile.className = `row${newy} col${newx} tile`;
	tile.x = newx;
	tile.y = newy;
	tile.style.left = `${8 + tile.x * 156}px`;
	tile.style.top = `${8 + tile.y * 156}px`;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function mergeTiles() {
	for (let x = 0; x < 4; x++) {
		for (let y = 0; y < 4; y++) {
			if (!grid[x][y]) continue;

			if (grid[x][y].length == 2) {
				// merge the tiles and update new one
				grid[x][y] = grid[x][y][0] + grid[x][y][1]; // update to new value
				document.getElementById("tile-container").removeChild(document.querySelector(`.row${y}.col${x}`)) // remove old element
				updateTile(x, y); // update style of tile

				// update high score
				if (grid[x][y] > largestTile) largestTile = grid[x][y];
			}
		}
	}
}

// -- Movement functions --
function moveLeft() {
	let movementMade = false;

	for (let y = 0; y < 4; y++) {
		for (let x = 1; x < 4; x++) {
			if (!grid[x][y]) continue;

			let newPos = x-1;
			while (newPos >= 0 && !grid[newPos][y]) {
				movementMade = true;
				grid[newPos][y] = grid[newPos+1][y];
				grid[newPos+1][y] = undefined;
				newPos -= 1;
			}
			newPos += 1; // after while loop, newPos is one off
			if (newPos <= 0) { // if tile is already pressed to the edge of screen it can't merge with anything
				moveTile(x, y, newPos, y);
				continue;
			}

			if (grid[newPos][y] == grid[newPos-1][y]) {
				movementMade = true;
				grid[newPos-1][y] = [grid[newPos-1][y], grid[newPos][y]]; // eg (2, 2), (4, 4), etc
				grid[newPos][y] = undefined;
				newPos -= 1;
			}
			moveTile(x, y, newPos, y);
		}
	}
	return movementMade;
}
function moveRight() {
	let movementMade = false;
	for (let y = 0; y < 4; y++) {
		for (let x = 2; x >= 0; x--) {
			if (!grid[x][y]) continue;

			let newPos = x+1;
			while (newPos < 4 && !grid[newPos][y]) {
				movementMade = true;
				grid[newPos][y] = grid[newPos-1][y];
				grid[newPos-1][y] = undefined;
				newPos += 1;
			}
			newPos -= 1; // after while loop, newPos is one off
			if (newPos >= 3) { // if tile is already pressed to the edge of screen it can't merge with anything
				moveTile(x, y, newPos, y);
				continue;
			}

			if (grid[newPos][y] == grid[newPos+1][y]) {
				movementMade = true;
				grid[newPos+1][y] = [grid[newPos+1][y], grid[newPos][y]]; // eg (2, 2), (4, 4), etc
				grid[newPos][y] = undefined;
				newPos += 1;
			}
			moveTile(x, y, newPos, y);
		}
	}
	return movementMade;
}
function moveUp() {
	let movementMade = false;
	for (let x = 0; x < 4; x++) {
		for (let y = 1; y < 4; y++) {
			if (!grid[x][y]) continue;

			let newPos = y-1;
			while (newPos >= 0 && !grid[x][newPos]) {
				movementMade = true;
				grid[x][newPos] = grid[x][newPos+1];
				grid[x][newPos+1] = undefined;
				newPos -= 1;
			}
			newPos += 1; // after while loop, newPos is one off
			if (newPos <= 0) { // if tile is already pressed to the edge of screen it can't merge with anything
				moveTile(x, y, x, newPos);
				continue;
			}

			if (grid[x][newPos] == grid[x][newPos-1]) {
				movementMade = true;
				grid[x][newPos-1] = [grid[x][newPos-1], grid[x][newPos]]; // eg (2, 2), (4, 4), etc
				grid[x][newPos] = undefined;
				newPos -= 1;
			}
			moveTile(x, y, x, newPos);
		}
	}
	return movementMade;
}
function moveDown() {
	let movementMade = false;
	for (let x = 0; x < 4; x++) {
		for (let y = 2; y >= 0; y--) {
			if (!grid[x][y]) continue;

			let newPos = y+1;
			while (newPos < 4 && !grid[x][newPos]) {
				movementMade = true;
				grid[x][newPos] = grid[x][newPos-1];
				grid[x][newPos-1] = undefined;
				newPos += 1;
			}
			newPos -= 1; // after while loop, newPos is one off
			if (newPos >= 3) { // if tile is already pressed to the edge of screen it can't merge with anything
				moveTile(x, y, x, newPos);
				continue;
			}

			if (grid[x][newPos] == grid[x][newPos+1]) {
				movementMade = true;
				grid[x][newPos+1] = [grid[x][newPos+1], grid[x][newPos]]; // eg (2, 2), (4, 4), etc
				grid[x][newPos] = undefined;
				newPos += 1;
			}
			moveTile(x, y, x, newPos);
		}
	}
	return movementMade;
}

function checkForOpenCells() {
	for (let x = 0; x < 4; x++) {
		for (let y = 0; y < 4; y++) {
			if (!grid[x][y]) return true;
		}
	}
	return false;
}

// Bind keys
document.addEventListener("keydown", function(e) {
	let keynum = e.keyCode;

	let movementMade = false;
	// move tiles
	if (keynum === 39 || keynum === 68) {
		movementMade = moveRight();
	} else if (keynum === 37 || keynum == 65) {
		movementMade = moveLeft();
	} else if (keynum === 87 || keynum == 38) {
		movementMade = moveUp();
	} else if (keynum === 83 || keynum == 40) {
		movementMade = moveDown();
	}

	// merge tiles
	mergeTiles();

	// add new tile
	if (keynum == 39 || keynum == 68 || keynum == 37 || keynum == 65 || keynum == 87 || keynum == 38 || keynum == 83 || keynum == 40) {
		if (movementMade) {
			addRandomTile(Math.random() < 0.9 ? 2 : 4);
		}
	}
});

addRandomTile(2);
addRandomTile(2);
