const canvasSize = 300;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('randomize').onclick = () => init();
    document.getElementById('stepsRange').onchange = () => init();
    init();
});

function init() {
    console.log('generating');
    let steps = document.getElementById("stepsRange").value;
    generate(steps);
}

function generate(steps) {
    let directions = d3.range(steps)
        .map(n => d3.randomInt(4)())
        .map(n => {
            switch (n) {
                case 0: return [1, 0];
                case 1: return [0, 1];
                case 2: return [-1, 0];
                case 3: return [0, -1];
            };
        })
        .map(n => [n[0], n[1]]);

    let positions = fromVectorsToPositions(directions, [100, 100]);

    let extentX = d3.extent(positions.map(p => p[0]));
    let extentY = d3.extent(positions.map(p => p[1]));
    let max = d3.max(extentX.concat(extentY));
    let min = d3.min(extentX.concat(extentY));
    var scale = d3.scaleLinear().domain([min, max]).range([0, canvasSize]);

    let scaledPositions = positions.map(x => [scale(x[0]), scale(x[1])]);
    let lines = fromPositionsToLines(scaledPositions);

    var canvas = d3.select("#svg")
        .attr('width', canvasSize)
        .attr('height', canvasSize)
        .style('background-color', 'black');

    canvas.selectAll('*').remove();

    canvas.selectAll('line')
        .data(lines)
        .enter()
        .append('line')
        .style('stroke', 'lightgreen')
        .style('stroke-width', 1)
        .attr('x1', l => l.x1)
        .attr('y1', l => l.y1)
        .attr('x2', l => l.x2)
        .attr('y2', l => l.y2);
}

function fromVectorsToPositions(vectors, startPosition) {
    let currentPosition = [...startPosition];
    let p = [startPosition];
    let intermediatePositions = vectors.map((v) => {
        currentPosition[0] += v[0];
        currentPosition[1] += v[1];
        return [...currentPosition];
    });
    return p.concat(intermediatePositions);
}

function fromPositionsToLines(positions) {
    let last = positions[0];
    return positions.map(p => {
        let result = { x1: last[0], y1: last[1], x2: p[0], y2: p[1] };
        last = p;
        return result;
    });
}