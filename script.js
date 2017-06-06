let grid = [];
for (let i = 0; i < 4; i++) { grid.push([]); }

grid[0][0] = 2; grid[0][1] = 2;

function drawGrid() {
	for (let x = 0; x < 4; x++) {
		let row = document.querySelectorAll(".row")[x];
		for (let y = 0; y < 4; y++) {
			let cellElem = row.children[y];
			let cellContent = grid[x][y];

			if (cellContent) {
				cellElem.innerHTML = cellContent;
				cellElem.style.backgroundColor = "#eee4da";
			} else {
				cellElem.innerHTML = "";
				cellElem.style.backgroundColor = "";
			};
		}
	}
}

function addBox() {

}

// -- Movement functions --
function moveLeft() {
	for (let row of grid) {
		for (let i = 1; i < 4; i++) {
			if (!row[i-1]) {
				row[i-1] = row[i];
				row[i] = undefined;
			} else {
				break;
			}
		}
	}

	drawGrid();
}
function moveRight() {
	for (let row of grid) {
		for (let i = 2; i >= 0; i--) {
			if (!row[i+1]) {
				row[i+1] = row[i];
				row[i] = undefined;
			} else {
				break;
			}
		}
	}

	drawGrid();
}
function moveUp() {

}
function moveDown() {

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

drawGrid();
