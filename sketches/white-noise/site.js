function randomize() {
    var canvas = document.getElementById('canvas-white-noise');
    var context = canvas.getContext('2d');

    var image = context.createImageData(canvas.width, canvas.height);
    var data = image.data;

    function drawPixel(x, y, color) {
        var roundedX = Math.round(x);
        var roundedY = Math.round(y);

        var index = 4 * (canvas.width * roundedY + roundedX);

        data[index + 0] = color.r;
        data[index + 1] = color.g;
        data[index + 2] = color.b;
        data[index + 3] = color.a;
    }

    function swapBuffer() {
        context.putImageData(image, 0, 0);
    }

    function getColor(number) {
        return { r: number, g: number, b: number, a: 255 };
    }

    for (var x = 0; x < canvas.width; x++) {
        for (var y = 0; y < canvas.height; y++) {
            const c = parseInt(Math.random() * 255);
            const color = getColor(c);
            drawPixel(x, y, color);
        }
    }

    swapBuffer();
}

randomize();