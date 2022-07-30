var canvas = document.getElementById('canvas-1');
var context = canvas.getContext('2d');
var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
var pixels = imageData.data;
var width = canvas.width;
var height = canvas.height;

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 100; i++) {
        putPixel(i,10,100);
    }

    for (let i = 0; i < 100; i++) {
        putPixel(10,i,100);
    }

    context.putImageData(imageData, 0, 0);
}

function putPixel(x, y, color) {
    let index = (width * y + x) * 4;
    pixels[index] = color;
    pixels[index + 1] = color;
    pixels[index + 2] = color;
    pixels[index + 3] = 100;
}

draw();