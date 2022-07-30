var seedArray1d = [];
var perlinNoise1d = [];
var seedArray2d = [];
var perlinNoise2d = [];
var octaves = 1;
var scaling = 2;

function draw() {
    let canvas = document.getElementById('canvas-perlin-noise-1d');
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    perlinNoise1d = []
    for (let x = 0; x < seedArray1d.length; x++) {
        let fNoise = 0.0;
        let fScale = 1.0;
        let fScaleAcc = 0;
        for (let o = 0; o < octaves; o++) {
            let distance = seedArray1d.length >> o;
            let sample1 = parseInt((x / distance)) * distance;
            let sample2 = parseInt((sample1 + distance) % seedArray1d.length);

            let blend = (x - sample1) / distance;
            let i = (1 - blend) * seedArray1d[sample1] + blend * seedArray1d[sample2];

            fNoise += i * fScale;
            fScaleAcc += fScale;
            fScale /= scaling;
        }
        perlinNoise1d.push(fNoise / fScaleAcc);
    }

    context.beginPath();
    context.moveTo(0, perlinNoise1d[0] * canvas.height);
    for (let i = 0; i < perlinNoise1d.length; i++) {
        let y = perlinNoise1d[i] * canvas.height;
        context.lineTo(i, y);
    }
    context.stroke();
}

function draw2d() {
    let canvas = document.getElementById('canvas-perlin-noise-2d');
    this.perlinNoise2d = [];

    for (let i = 0; i < canvas.width * canvas.height; i++) {
        this.perlinNoise2d.push(0);
    }

    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            let fNoise = 0.0;
            let fScale = 1.0;
            let fScaleAcc = 0;

            for (let o = 0; o < octaves; o++) {
                let nPitch = canvas.width >> o;
                let sampleX1 = parseInt(Math.floor((x / nPitch)) * nPitch);
                let sampleY1 = parseInt(Math.floor((y / nPitch)) * nPitch);

                let sampleX2 = parseInt((sampleX1 + nPitch) % canvas.width);
                let sampleY2 = parseInt((sampleY1 + nPitch) % canvas.height);

                let blendX = (x - sampleX1) / nPitch;
                let blendY = (y - sampleY1) / nPitch;

                let fSampleT = (1 - blendX) * seedArray2d[sampleY1 * canvas.width + sampleX1] + blendX * seedArray2d[sampleY1 * canvas.width + sampleX2];
                let fSampleB = (1 - blendX) * seedArray2d[sampleY2 * canvas.width + sampleX1] + blendX * seedArray2d[sampleY2 * canvas.width + sampleX2];

                fNoise += (blendY * (fSampleB - fSampleT) + fSampleT) * fScale;
                fScaleAcc += fScale;
                fScale /= scaling
            }

            this.perlinNoise2d[y * canvas.width + x] = fNoise / fScaleAcc;
        }
    }

    let context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let pixels = imageData.data;

    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {

            let color = parseInt(this.perlinNoise2d[y * canvas.width + x] * 255);
            putPixel(x, y, color, pixels, canvas);
        }
    }
    context.putImageData(imageData, 0, 0);
}

function putPixel(x, y, color, pixels, canvas) {
    let index = (canvas.width * y + x) * 4;
    pixels[index] = color;
    pixels[index + 1] = color;
    pixels[index + 2] = color;
    pixels[index + 3] = 255;
}

function initSeed() {
    let canvas = document.getElementById('canvas-perlin-noise-1d');
    seedArray1d = [];
    seedArray2d = [];
    for (let i = 0; i < canvas.width; i++) {
        seedArray1d.push(Math.random());
    }

    for (let i = 0; i < canvas.width * canvas.height; i++) {
        seedArray2d.push(Math.random());
    }

}

function randomize() {
    initSeed();
    draw();
    draw2d();
}

function changeOctaves() {
    let octavesInput = document.getElementById("octaves");
    octaves = octavesInput.value;
    draw();
    draw2d();
}

function changeScaling() {
    let scalingInput = document.getElementById("scaling");
    scaling = scalingInput.value;
    draw();
    draw2d();
}

initSeed();
changeOctaves();