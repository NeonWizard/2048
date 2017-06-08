let grid = [];
for (let i = 0; i < 4; i++) { grid.push([]); }

function updateTile(x, y) {
	let tile = document.querySelector(`.row${y}.col${x}`);
	// tile.style.backgroundColor = `rgb(${100 - value * 4}, 75, ${255 - value * 16})`;
	// Just copy maryn and do the grayscale cuz I honestly like how it looks
	let color = 240 - Math.log2(grid[x][y]) * 26;
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
	grid[newx][newy] = grid[x][y];
	grid[x][y] = undefined; 

	let tile = document.querySelector(`.row${y}.col${x}`);
	tile.className = `row${newy} col${newx} tile`;
	tile.x = newx;
	tile.y = newy;
	tile.style.left = `${8 + tile.x * 166}px`;
	tile.style.top = `${8 + tile.y * 166}px`;
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

function mergeTiles(vert) {
	if (!vert) {
		for (let y = 0; y < 4; y++) {
			for (let x = 0; x < 3; x++) {
				if (!grid[x][y] || !grid[x+1][y]) continue;

				if (grid[x][y] == grid[x+1][y]) {
					// merge to the left
					grid[x][y] = grid[x][y] * 2;
					grid[x+1][y] = undefined;

					document.getElementById("tile-container").removeChild(document.querySelector(`.row${y}.col${x+1}`));

					updateTile(x, y);
				}
			}
		}
	} else {
		for (let x = 0; x < 4; x++) {
			for (let y = 0; y < 3; y++) {
				if (!grid[x][y] || !grid[x][y+1]) continue;

				if (grid[x][y] == grid[x][y+1]) {
					// merge up
					grid[x][y] = grid[x][y] * 2;
					grid[x][y+1] = undefined;

					document.getElementById("tile-container").removeChild(document.querySelector(`.row${y+1}.col${x}`));

					updateTile(x, y);
				}
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
				moveTile(newPos+1, y, newPos, y);
				newPos -= 1;
			}
		}
	}
}
function moveRight() {
	for (let y = 0; y < 4; y++) {
		for (let x = 2; x >= 0; x--) {
			if (!grid[x][y]) continue;

			let newPos = x+1;
			while (newPos < 4 && !grid[newPos][y]) {
				moveTile(newPos-1, y, newPos, y);
				newPos += 1;
			}
		}
	}
}
function moveUp() {
	for (let x = 0; x < 4; x++) {
		for (let y = 1; y < 4; y++) {
			if (!grid[x][y]) continue;

			let newPos = y-1;
			while (newPos >= 0 && !grid[x][newPos]) {
				moveTile(x, newPos+1, x, newPos);
				newPos -= 1;
			}
		}
	}
}
function moveDown() {
	for (let x = 0; x < 4; x++) {
		for (let y = 2; y >= 0; y--) {
			if (!grid[x][y]) continue;

			let newPos = y+1;
			while (newPos < 4 && !grid[x][newPos]) {
				moveTile(x, newPos-1, x, newPos);
				newPos += 1;
			}
		}
	}
}

// Bind keys
document.addEventListener("keydown", function(e) {
	let keynum = e.keyCode;

	if (keynum === 39 || keynum === 68) {
		mergeTiles(false);
		moveRight();
	} else if (keynum === 37 || keynum == 65) {
		mergeTiles(false);
		moveLeft();
	} else if (keynum === 87 || keynum == 38) {
		mergeTiles(true);
		moveUp();
	} else if (keynum === 83 || keynum == 40) {
		mergeTiles(true);
		moveDown();
	}
});
