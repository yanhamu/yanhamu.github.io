const dataPoints = 1000;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('randomize').onclick = () => init();
    init();
});

function init() {
    console.log('generating');
    generate();
}

function generate() {
    let outputs = d3.range(dataPoints)
        .map(n => d3.randomUniform(4, 5)());
    const startDate = new Date(2023, 5, 20)
    let dates = d3.range(dataPoints)
        .map(n => new Date(startDate.getTime() + n * 1000));

    let data = outputs.map((value, index) => [value, dates[index]]);

    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    let svg = d3.select("#svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.selectAll('svg > g')
        .filter((e, i, array) => i !== (array.length - 1))
        .remove()

    var x = d3.scaleTime()
        .domain(d3.extent(data, d => d[1]))
        .range([0, width]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d[0])])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1)
        .attr("d", d3.line()
            .x(function (d) { return x(d[1]) })
            .y(function (d) { return y(d[0]) })
        )
}