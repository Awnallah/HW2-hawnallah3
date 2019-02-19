

var margin = { left:80, right:20, top:30, bottom:30 };

var width = 600 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;
    
var g = d3.select("#chart-area")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

// X Label
g.append("text")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Rating");

// Y Label
g.append("text")
    .attr("y", -60)
    .attr("x", -(height / 2))
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Wins+Noms");

d3.csv("movies.csv").then(function(data){
    console.log(data);

    // Clean data
    data.forEach(function(d) {
        d.WinsNoms = +d.WinsNoms;
        d.Rating = +d.Rating;
        d.IsGoodRating = +d.IsGoodRating;
    });

   // X Scale
    var x = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.Rating; })])
        .range([0, width])



    // Y Scale
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.WinsNoms; })])
        .range([height,  margin.top + margin.bottom ]);

    var symbols = d3.scaleOrdinal(d3.symbols);



    // X Axis
    var xAxisCall = d3.axisBottom(x);
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height +")")
        .call(xAxisCall);

    // Y Axis
    var yAxisCall = d3.axisLeft(y)
        .scale(y);
       // .tickFormat(function(d){ return d; });
    g.append("g")
        .attr("class", "y axis")
        .call(yAxisCall);

    // Bars
    var circs = g.selectAll("circle")
        .data(data.filter(function(d) { return d.IsGoodRating==0; }) )
        .enter()
        .append("circle")
            .attr("cy", function(d){ return y(d.WinsNoms); })
            .attr("cx", function(d){ return x(d.Rating); })
            .attr("r", function(d){ return 2; })
            .attr("fill", "red");

    var crosses =g.selectAll("symbol")
    .data(data)
    .enter().append("path")
    .attr("class", "symbol")
    .attr("d", function(d, i) { return symbol.type(symbols(d.species))(); })
    .style("fill", function(d) { return "blue"; })
    });

    // var cross = g.selectAll("rect")
    //     .data(data.filter(function(d) { return d.IsGoodRating==1; }) )
    //     .enter()
    //     .append("rect")
    //         .attr("y", function(d){ return y(d.WinsNoms); })
    //         .attr("x", function(d){ return x(d.Rating); })
    //         .attr("width", function(d){ return 3; })
    //         .attr("height", function(d){ return 3; })
    //         //.attr("r", function(d){ return 2; })
    //         .attr("fill", "blue");

    // var cross = d3.symbol()
    //         .type(d3.symbolCross)
    //         .size(20);

    // var crosses = g.selectAll("path")
    //     .data(data.filter(function(d) { return d.IsGoodRating==1; }) )
    //     .enter()
    //     .append("path")
    //     //.attr("class", "symbol")
    //     .attr("d", cross)
    //         .attr("y", function(d){ return y(d.WinsNoms); })
    //         .attr("x", function(d){ return x(d.Rating); })
    //         // .attr("width", function(d){ return 3; })
    //         // .attr("height", function(d){ return 3; })
    //         //.attr("r", function(d){ return 2; })
    //         .attr("fill", "blue");


//})

