let grid = [];
for (let i = 0; i < 4; i++) { grid.push([]); }

function addTile(x, y, value) {
	if (grid[x][y]) return false;

	grid[x][y] = value;

	let tile = document.createElement("DIV");
	tile.className = `row${y} col${x} tile`;
	tile.x = x;
	tile.y = y;
	tile.style.left = `${8 + tile.x * 166}px`;
	tile.style.top =  `${8 + tile.y * 166}px`;
	// tile.style.backgroundColor = `rgb(${100 - value * 4}, 75, ${255 - value * 16})`;
	// Just copy maryn and do the grayscale cuz I honestly like how it looks
	let color = 240 - Math.log2(value) * 26;
	if (color > 150) tile.style.color = "rgb(40, 40, 40)";
	tile.style.backgroundColor = `rgb(${color}, ${color}, ${color})`;
	tile.innerHTML = value;
	document.getElementById("tile-container").appendChild(tile);

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

// (x2, y2) merges into (x1, y1) 
function mergeTiles(x1, y1, x2, y2) {
	grid[x1][y1] = grid[x1][y1] * 2;
	grid[x2][y2] = undefined;

	document.getElementById("tile-container").removeChild(document.querySelector(`.row${y2}.col${x2}`));

	let mergedTile = document.querySelector(`.row${y1}.col${x1}`);
	mergedTile.innerHTML = grid[x1][y1];
	let color = 240 - Math.log2(mergedTile.innerHTML) * 26;
	if (color > 150) mergedTile.style.color = "rgb(40, 40, 40)";
	mergedTile.style.backgroundColor = `rgb(${color}, ${color}, ${color})`;
}

// addTile(1, 0, value=2);
// addTile(2, 0, value=4);
// // addTile(3, 0, value=8);
// addTile(3, 0, value=16);
// addTile(0, 1, value=8);
// addTile(1, 1, value=4);

addTile(0, 0, value=2);
addTile(1, 0, value=2);
addTile(2, 0, value=4);
// addTile(3, 0, value=8);
// addTile(3, 0, value=16);
addTile(0, 1, value=8);
addTile(1, 1, value=32);
addTile(2, 2, value=64);


// -- Movement functions --
function moveLeft() {
	for (let y = 0; y < 4; y++) {
		for (let x = 1; x < 4; x++) {
			if (grid[x][y] && !grid[x-1][y]) {
				grid[x-1][y] = grid[x][y];
				grid[x][y] = undefined;

				moveTile(x, y, x-1, y);
			// you're actually supposed to merge even if there isn't a collision
			// } else if (grid[x][y] && grid[x-1][y]) {	// if there would be a collision, then merge
				// if (grid[x][y] == grid[x-1][y]) {
					// mergeTiles(x-1, y, x, y);
				// }
			// }
		}
	}
}
function moveRight() {
	for (let y = 0; y < 4; y++) {
		for (let x = 2; x >= 0; x--) {
			if (grid[x][y] && !grid[x+1][y]) {
				grid[x+1][y] = grid[x][y];
				grid[x][y] = undefined;

				moveTile(x, y, x+1, y);
			}
		}
	}
}
function moveUp() {
	for (let x = 0; x < 4; x++) {
		for (let y = 1; y < 4; y++) {
			if (grid[x][y] && !grid[x][y-1]) {
				grid[x][y-1] = grid[x][y];
				grid[x][y] = undefined;

				moveTile(x, y, x, y-1);
			}
		}
	}
}
function moveDown() {
	for (let x = 0; x < 4; x++) {
		for (let y = 2; y >= 0; y--) {
			if (grid[x][y] && !grid[x][y+1]) {
				grid[x][y+1] = grid[x][y];
				grid[x][y] = undefined;

				moveTile(x, y, x, y+1);
			}
		}
	}
}

// Bind keys
document.addEventListener("keydown", function(e) {
	let keynum = e.keyCode;

	if (keynum === 39 || keynum === 68) {
		moveRight();
	} else if (keynum === 37 || keynum == 65) {
		moveLeft();
	} else if (keynum === 87 || keynum == 38) {
		moveUp();
	} else if (keynum === 83 || keynum == 40) {
		moveDown();
	}
});
