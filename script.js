let grid = [];
for (let i = 0; i < 4; i++) { grid.push([]); }

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
	tile.style.left = `${8 + tile.x * 166}px`;
	tile.style.top =  `${8 + tile.y * 166}px`;
	document.getElementById("tile-container").appendChild(tile);

	updateTile(x, y);

	return true;
}

function moveTile(x, y, newx, newy) {
	let tile = document.querySelector(`.row${y}.col${x}`);
	tile.className = `row${newy} col${newx} tile`;
	tile.x = newx;
	tile.y = newy;
	tile.style.left = `${8 + tile.x * 166}px`;
	tile.style.top = `${8 + tile.y * 166}px`;
}

// addTile(0, 0, value=2);
// addTile(1, 0, value=2);
// addTile(2, 0, value=4);
// // addTile(3, 0, value=8);
// // addTile(3, 0, value=16);
// addTile(0, 1, value=8);
// addTile(1, 1, value=32);
// addTile(2, 2, value=64);

addTile(0, 0, 2);
addTile(0, 1, 2);
addTile(0, 2, 2);
addTile(0, 3, 2);

function mergeTiles() {
	for (let x = 0; x < 4; x++) {
		for (let y = 0; y < 4; y++) {
			if (!grid[x][y]) continue;

			if (grid[x][y].length == 2) {
				grid[x][y] = grid[x][y][0] + grid[x][y][1]; // update to new value
				document.getElementById("tile-container").removeChild(document.querySelector(`.row${y}.col${x}`)) // remove old element
				updateTile(x, y); // update style of tile
			}
		}
	}
}

// -- Movement functions --
function moveLeft() {
	for (let y = 0; y < 4; y++) {
		for (let x = 1; x < 4; x++) {
			if (!grid[x][y]) continue;

			let newPos = x-1;
			while (newPos >= 0 && !grid[newPos][y]) {
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
				grid[newPos-1][y] = [grid[newPos-1][y], grid[newPos][y]]; // eg (2, 2), (4, 4), etc
				grid[newPos][y] = undefined;
				newPos -= 1;
			}
			moveTile(x, y, newPos, y);
		}
	}
}
function moveRight() {
	for (let y = 0; y < 4; y++) {
		for (let x = 2; x >= 0; x--) {
			if (!grid[x][y]) continue;

			let newPos = x+1;
			while (newPos < 4 && !grid[newPos][y]) {
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
				grid[newPos+1][y] = [grid[newPos+1][y], grid[newPos][y]]; // eg (2, 2), (4, 4), etc
				grid[newPos][y] = undefined;
				newPos += 1;
			}
			moveTile(x, y, newPos, y);
		}
	}
}
function moveUp() {
	for (let x = 0; x < 4; x++) {
		for (let y = 1; y < 4; y++) {
			if (!grid[x][y]) continue;

			let newPos = y-1;
			while (newPos >= 0 && !grid[x][newPos]) {
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
				grid[x][newPos-1] = [grid[x][newPos-1], grid[x][newPos]]; // eg (2, 2), (4, 4), etc
				grid[x][newPos] = undefined;
				newPos -= 1;
			}
			moveTile(x, y, x, newPos);
		}
	}
}
function moveDown() {
	for (let x = 0; x < 4; x++) {
		for (let y = 2; y >= 0; y--) {
			if (!grid[x][y]) continue;

			let newPos = y+1;
			while (newPos < 4 && !grid[x][newPos]) {
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
				grid[x][newPos+1] = [grid[x][newPos+1], grid[x][newPos]]; // eg (2, 2), (4, 4), etc
				grid[x][newPos] = undefined;
				newPos += 1;
			}
			moveTile(x, y, x, newPos);
		}
	}
}

// Bind keys
document.addEventListener("keydown", function(e) {
	let keynum = e.keyCode;

	// move tiles
	if (keynum === 39 || keynum === 68) {
		moveRight();
	} else if (keynum === 37 || keynum == 65) {
		moveLeft();
	} else if (keynum === 87 || keynum == 38) {
		moveUp();
	} else if (keynum === 83 || keynum == 40) {
		moveDown();
	}

	// merge tiles
	mergeTiles();

	// add new tile
	if (keynum == 39 || keynum == 68 || keynum == 37 || keynum == 65 || keynum == 87 || keynum == 38 || keynum == 83 || keynum == 40) {
		window.setTimeout(function() {
			while (!addTile(Math.floor(Math.random() * 4), Math.floor(Math.random() * 4), 2)) {
				continue;
			}
		}, 60);
	}
});
