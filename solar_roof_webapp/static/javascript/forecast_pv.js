function draw_graph(svg, data_path) {
    var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var parseTime = d3.timeParse("%H:%M");
    
    var x = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    z = d3.scaleOrdinal(d3.schemeCategory10);
    
    var line = d3.line()
      .defined(function(d) { return d.temperature != null; }) 
      .curve(d3.curveBasis)
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.temperature); });
    
    d3.tsv(data_path, type, function(error, data) {
      if (error) throw error;
      
      var cities = data.columns.slice(1).map(function(id) {
        return {
          id: id,
          values: data.map(function(d) {
            return {date: d.date, temperature: d[id]<=0?null:d[id]};
          })
        };
      });
      
      x.domain(d3.extent(data, function(d) { return d.date; }));
      
      y.domain([0, 3]);
      // y.domain([
      //   d3.min(cities, function(c) { return d3.min(c.values, function(d) { return d.temperature; }); }),
      //   d3.max(cities, function(c) { return d3.max(c.values, function(d) { return d.temperature; }); })
      // ]);
      
      z.domain(cities.map(function(c) { return c.id; }));
      
      g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
      
      g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y))
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("fill", "#000");
        // .text("Power, kW");
      
      var city = g.selectAll(".city")
      .data(cities)
      .enter().append("g")
        .attr("class", "city");
      
      city.append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line(d.values); })
        .style("stroke", function(d) { return z(d.id); });
      
      // city.append("text")
      //   .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
      //   .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
      //   .attr("x", 3)
      //   .attr("dy", "0.35em")
      //   .style("font", "10px sans-serif")
      //   .text(function(d) { return d.id; });

      // var legend_keys = data.columns.shift();
      
      // var lineLegend = svg.selectAll(".lineLegend").data(legend_keys)
      //     .enter().append("g")
      //     .attr("class","lineLegend")
      //     .attr("transform", function (d,i) {
      //             "translate(" + width + "," + (i*20)+")";
      //         });
      
      // lineLegend.append("text").text(function (d) {return d;})
      //     .attr("transform", "translate(15,9)"); //align texts with boxes
      
      // lineLegend.append("rect")
      //     // .attr("fill", function (d, i) {return color_scale(d); })
      //     .attr("width", 10).attr("height", 10);

    });
    
    
    function type(d, _, columns) {
        d.date = parseTime(d.date);
        for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
        return d;
    }
}

function draw_battery_graph(svg, data_path) {
  var margin = {top: 20, right: 80, bottom: 30, left: 50},
  width = svg.attr("width") - margin.left - margin.right,
  height = svg.attr("height") - margin.top - margin.bottom,
  g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  var parseTime = d3.timeParse("%H:%M");
  
  var x = d3.scaleTime().range([0, width]),
  y = d3.scaleLinear().range([height, 0]),
  z = d3.scaleOrdinal(d3.schemeCategory10);
  
  var line = d3.line()
    //.curve(d3.curveBasis)
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.temperature); });
  
  d3.tsv(data_path, type, function(error, data) {
    if (error) throw error;
    
    var cities = data.columns.slice(1).map(function(id) {
      return {
        id: id,
        values: data.map(function(d) {
          return {date: d.date, temperature: d[id]};
        })
      };
    });
    
    x.domain(d3.extent(data, function(d) { return d.date; }));
    
    y.domain([
      d3.min(cities, function(c) { return d3.min(c.values, function(d) { return d.temperature; }); }) * 2,
      d3.max(cities, function(c) { return d3.max(c.values, function(d) { return d.temperature; }); }) * 2
    ]);
    
    z.domain(cities.map(function(c) { return c.id; }));
    
    g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height/2 + ")")
      .call(d3.axisBottom(x));
    
    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("fill", "#000")
      .text("");
    
    var city = g.selectAll(".city")
    .data(cities)
    .enter().append("g")
      .attr("class", "city");
    
    city.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return z(d.id); });
    
    // city.append("text")
    //   .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
    //   .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
    //   .attr("x", 3)
    //   .attr("dy", "0.35em")
    //   .style("font", "10px sans-serif")
    //   .text(function(d) { return d.id; });
  });
  
  function type(d, _, columns) {
      d.date = parseTime(d.date);
      for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
      return d;
  }
}

function draw_difference_graph(svg, data_path) {
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 500 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

  var parseDate = d3.timeParse("%H:%M");

  var x = d3.scaleTime()
      .range([0, width]);
  var y = d3.scaleLinear()
      .range([height, 0]);
  var xAxis = d3.axisBottom()
      .scale(x);
  var yAxis = d3.axisLeft()
      .scale(y);
  var line = d3.area()
      .curve(d3.curveBasis)
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d["PV Forecast"]); });
  var area = d3.area()
      .curve(d3.curveBasis)
      .x(function(d) { return x(d.date); })
      .y1(function(d) { return y(d["PV Forecast"]); });

  svg = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.tsv(data_path, function(error, data) {
    if (error) throw error;

    data.forEach(function(d) {
      d.date = parseDate(d.date);
      d["PV Forecast"]= +d["PV Forecast"];
      d["Power Load (kW)"] = +d["Power Load (kW)"];
    });

    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([
      d3.min(data, function(d) { return Math.min(d["PV Forecast"], d["Power Load (kW)"]); }),
      d3.max(data, function(d) { return Math.max(d["PV Forecast"], d["Power Load (kW)"]); })
    ]);
    svg.datum(data);
    svg.append("clipPath")
        .attr("id", "clip-below")
      .append("path")
        .attr("d", area.y0(height));
    svg.append("clipPath")
        .attr("id", "clip-above")
      .append("path")
        .attr("d", area.y0(0));
    svg.append("path")
        .attr("class", "area above")
        .attr("clip-path", "url(#clip-above)")
        .attr("d", area.y0(function(d) { return y(d["Power Load (kW)"]); }));
    svg.append("path")
        .attr("class", "area below")
        .attr("clip-path", "url(#clip-below)")
        .attr("d", area);
    svg.append("path")
        .attr("class", "line")
        .attr("d", line);
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Temperature (ºF)");
  });
}

draw_graph(d3.select("svg#pv_production",), "../static/data_pvproduction.tsv");
draw_graph(d3.select("svg#pv_load"), "../static/data_load.tsv");
draw_battery_graph(d3.select("svg#pv_battery"), "../static/data_battery.tsv");
draw_difference_graph(d3.select("svg#pv_difference"), "../static/data_difference.tsv");