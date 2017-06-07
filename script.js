let grid = [];
for (let i = 0; i < 4; i++) { grid.push([]); }

function addTile(x, y, value) {
	if (grid[x][y]) return false;

	grid[x][y] = value;

	let tile = document.createElement("DIV");
	tile.className = `row${y} col${x} tile`;
	tile.x = x;
	tile.y = y;
	tile.style.left = `${9 + tile.x * 168}px`;
	tile.style.top =  `${9 + tile.y * 168}px`;
	tile.innerHTML = value;
	document.getElementById("tile-container").appendChild(tile);

	return true;
}

function updateTile(x, y, newx, newy) {
	let tile = document.querySelector(`.row${y}.col${x}`);
	tile.className = `row${newy} col${newx} tile`;
	tile.x = newx;
	tile.y = newy;
	tile.style.left = `${9 + tile.x * 168}px`;
	tile.style.top = `${9 + tile.y * 168}px`;
}

addTile(1, 0, value=2);
addTile(2, 0, value=4);
addTile(3, 0, value=8);
// addTile(3, 0, value=16);
addTile(0, 1, value=8);
addTile(1, 1, value=4);


// -- Movement functions --
function moveLeft() {
	for (let y = 0; y < 4; y++) {
		for (let x = 1; x < 4; x++) {
			if (grid[x][y] && !grid[x-1][y]) {
				grid[x-1][y] = grid[x][y];
				grid[x][y] = undefined;

				updateTile(x, y, x-1, y);
			}
		}
	}
}
function moveRight() {
	for (let y = 0; y < 4; y++) {
		for (let x = 2; x >= 0; x--) {
			if (grid[x][y] && !grid[x+1][y]) {
				grid[x+1][y] = grid[x][y];
				grid[x][y] = undefined;

				updateTile(x, y, x+1, y);
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

				updateTile(x, y, x, y-1);
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

				updateTile(x, y, x, y+1);
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

// drawGrid();
