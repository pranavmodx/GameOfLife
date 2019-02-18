let grid = [];
let nextGrid = [];
let resX = 700;
let resY = 700;
let rows = resX / 20;
let cols = resY / 20;
let cellSizeX = resX / rows;
let cellSizeY = resY / cols;

function setup() {
    createCanvas(resX, resY);
    frameRate(5);
    grid = create2DArray(rows, cols);
    nextGrid = create2DArray(rows, cols);
    createRandomCellStates();
}

function draw() {
    showGrid();
    updateCellStates();
}

function create2DArray(r, c) {
    let tempArr = new Array(r);
    for (let i = 0; i < tempArr.length; i++) {
        tempArr[i] = new Array(c);
    }
    return tempArr;
}

function createRandomCellStates() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = floor(random(2));
        }
    }
}

function cellIsOn(i, j) {
    return grid[i][j] == 1 ? true : false;
}

function showGrid() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (cellIsOn(i, j)) {
                fill(255, 255, 255);
            } else {
                fill(0, 0, 0);
            }
            let x = i * cellSizeX;
            let y = j * cellSizeY;
            rect(x, y, cellSizeX - 1, cellSizeY - 1);
        }
    }
}

function countNeighbours(i, j) {
    let count = 0;
    for (let ti = -1; ti <= 1; ti++) {
        for (let tj = - 1; tj <= 1; tj++) {
            wrapX = (rows + i + ti) % rows;
            wrapY = (cols + j + tj) % cols;
            count += grid[wrapY][wrapX];
        }
    }
    count -= grid[i][j];
    return count;
}

function updateCellStates() {
    let neighbours = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            neighbours = countNeighbours(i, j);
            currentState = grid[i][j];
            if (currentState == 0 && neighbours == 3) {
                nextGrid[i][j] = 1;
            } else if (currentState == 1 && (neighbours < 2 || neighbours > 3)) {
                nextGrid[i][j] = 0;
            } else {
                nextGrid[i][j] = currentState;
            }
        }
    }
    grid = nextGrid;
}

