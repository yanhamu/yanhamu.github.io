const count = 15;
const size = 20;
const offset = size;
var distortion = 0.0;

function drawLine(startX, startY, endX, endY) {
    const canvas = document.querySelector('#canvas');

    if (!canvas.getContext) {
        return;
    }
    const ctx = canvas.getContext('2d');

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

function drawPoint(startX, startY) {
    const canvas = document.querySelector('#canvas');

    if (!canvas.getContext) {
        return;
    }
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.strokeStyle = 'blue'
    ctx.lineWidth = 1;
    ctx.arc(startX, startY, 1, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawGrid(grid) {
    const canvas = document.querySelector('#canvas');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#fff6e7";
    context.fillRect(0, 0, canvas.width, canvas.height);

    let max = count - 1;

    for (let y = 0; y < count; y++) {
        for (let x = 0; x < count; x++) {
            if (y != max) {
                drawLine(grid[y][x][0], grid[y][x][1], grid[y + 1][x][0], grid[y + 1][x][1])
            }

            if (x != max) {
                drawLine(grid[y][x][0], grid[y][x][1], grid[y][x + 1][0], grid[y][x + 1][1])
            }
        }
    }

    for (let y = 0; y < count; y++) {
        for (let x = 0; x < count; x++) {
            drawPoint(grid[y][x][0], grid[y][x][1]);
        }
    }
}

function createGrid(distortion) {
    const grid = [];
    for (let y = 0; y < count; y++) {
        grid[y] = [];
        for (let x = 0; x < count; x++) {

            let xPos = x * size;
            let yPos = y * size;

            let distX = (size * distortion * Math.random() * 2) - (size * distortion);
            let distY = (size * distortion * Math.random() * 2) - (size * distortion);

            grid[y][x] = [xPos + distX + offset, yPos + distY + offset];
        }
    }
    return grid;
}

function randomize() {
    const grid = createGrid(distortion);
    drawGrid(grid);
}

function changeDistortion() {
    let distInput = document.getElementById("distortion");
    distortion = distInput.value;
    let grid = createGrid(distortion)
    drawGrid(grid);
}

const grid = createGrid(distortion);
drawGrid(grid);