import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const VisualizationEngine = ({ data, chartType, config, onChartReady }) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!data || !chartType || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    try {
      switch (chartType) {
        case "histogram":
          renderHistogram(svg, data, config);
          break;
        case "scatter":
          renderScatterPlot(svg, data, config);
          break;
        case "bar":
          renderBarChart(svg, data, config);
          break;
        case "map":
          renderMap(svg, data, config);
          break;
        case "timeline":
          renderTimeline(svg, data, config);
          break;
        case "biodiversity-treemap":
          renderBiodiversityTreemap(svg, data, config);
          break;
        case "heatmap":
          renderHeatmap(svg, data, config);
          break;
        case "network":
          renderNetworkGraph(svg, data, config);
          break;
        case "sankey":
          renderSankeyDiagram(svg, data, config);
          break;
        case "violin":
          renderViolin(svg, data, config);
          break;
        default:
          console.warn("Unknown chart type:", chartType);
      }

      if (onChartReady) {
        onChartReady(svg.node());
      }
    } catch (error) {
      console.error("Error rendering chart:", error);
    }
  }, [data, chartType, config]);

  // Histogram Implementation
  const renderHistogram = (svg, data, config) => {
    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 500 - margin.bottom - margin.top;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Extract values
    const values = data
      .map((d) => d[config.column])
      .filter((v) => v != null && !isNaN(v));

    // Create scales
    const xScale = d3.scaleLinear().domain(d3.extent(values)).range([0, width]);

    const histogram = d3
      .histogram()
      .value((d) => d)
      .domain(xScale.domain())
      .thresholds(config.bins || 20);

    const bins = histogram(values);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(bins, (d) => d.length)])
      .range([height, 0]);

    // Create ocean gradient
    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "ocean-histogram-gradient")
      .attr("gradientTransform", "rotate(90)");

    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#0ea5e9")
      .attr("stop-opacity", 0.8);

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#06b6d4")
      .attr("stop-opacity", 0.4);

    // Draw bars
    g.selectAll(".bar")
      .data(bins)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.x0))
      .attr("y", height)
      .attr("width", (d) => Math.max(0, xScale(d.x1) - xScale(d.x0) - 1))
      .attr("height", 0)
      .attr("fill", "url(#ocean-histogram-gradient)")
      .attr("stroke", "#22d3ee")
      .attr("stroke-width", 1)
      .on("mouseover", function (event, d) {
        d3.select(this).attr("stroke-width", 2).attr("stroke", "#ffd700");

        showTooltip(
          event,
          `Range: ${d.x0.toFixed(2)} - ${d.x1.toFixed(2)}<br>Count: ${d.length}`
        );
      })
      .on("mouseout", function () {
        d3.select(this).attr("stroke-width", 1).attr("stroke", "#22d3ee");
        hideTooltip();
      })
      .transition()
      .duration(1000)
      .delay((d, i) => i * 50)
      .attr("y", (d) => yScale(d.length))
      .attr("height", (d) => height - yScale(d.length));

    // Add axes
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("fill", "#cbd5e1");

    g.append("g")
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .style("fill", "#cbd5e1");

    // Add labels
    g.append("text")
      .attr("x", width / 2)
      .attr("y", height + 50)
      .attr("text-anchor", "middle")
      .style("fill", "#cbd5e1")
      .style("font-size", "14px")
      .text(config.column);

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -40)
      .attr("text-anchor", "middle")
      .style("fill", "#cbd5e1")
      .style("font-size", "14px")
      .text("Frequency");

    // Add title
    svg
      .append("text")
      .attr("x", width / 2 + margin.left)
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .style("fill", "#22d3ee")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .text(config.title || "Distribution");
  };

  // Scatter Plot Implementation
  const renderScatterPlot = (svg, data, config) => {
    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 500 - margin.bottom - margin.top;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Filter valid data
    const validData = data.filter(
      (d) =>
        d[config.xColumn] != null &&
        !isNaN(d[config.xColumn]) &&
        d[config.yColumn] != null &&
        !isNaN(d[config.yColumn])
    );

    // Create scales
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(validData, (d) => d[config.xColumn]))
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(validData, (d) => d[config.yColumn]))
      .range([height, 0]);

    // Color scale
    const colorScale = d3
      .scaleSequential(d3.interpolateViridis)
      .domain(d3.extent(validData, (d) => d[config.yColumn]));

    // Add dots
    g.selectAll(".dot")
      .data(validData)
      .join("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d[config.xColumn]))
      .attr("cy", (d) => yScale(d[config.yColumn]))
      .attr("r", 0)
      .attr("fill", (d) => colorScale(d[config.yColumn]))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .attr("opacity", 0.7)
      .on("mouseover", function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 8)
          .attr("stroke-width", 2);

        showTooltip(
          event,
          `${config.xColumn}: ${d[config.xColumn]}<br>${config.yColumn}: ${
            d[config.yColumn]
          }`
        );
      })
      .on("mouseout", function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 4)
          .attr("stroke-width", 1);
        hideTooltip();
      })
      .transition()
      .duration(1000)
      .delay((d, i) => i * 2)
      .attr("r", 4);

    // Add axes
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("fill", "#cbd5e1");

    g.append("g")
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .style("fill", "#cbd5e1");

    // Add labels
    g.append("text")
      .attr("x", width / 2)
      .attr("y", height + 50)
      .attr("text-anchor", "middle")
      .style("fill", "#cbd5e1")
      .style("font-size", "14px")
      .text(config.xColumn);

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -40)
      .attr("text-anchor", "middle")
      .style("fill", "#cbd5e1")
      .style("font-size", "14px")
      .text(config.yColumn);

    // Add title
    svg
      .append("text")
      .attr("x", width / 2 + margin.left)
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .style("fill", "#22d3ee")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .text(config.title || "Scatter Plot");
  };

  // Bar Chart Implementation
  const renderBarChart = (svg, data, config) => {
    const margin = { top: 40, right: 40, bottom: 100, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 500 - margin.bottom - margin.top;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Aggregate data
    const aggregatedData = d3.rollup(
      data,
      (v) => v.length,
      (d) => d[config.categoryColumn]
    );

    const chartData = Array.from(aggregatedData, ([key, value]) => ({
      category: key,
      count: value,
    }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20); // Top 20 categories

    // Create scales
    const xScale = d3
      .scaleBand()
      .domain(chartData.map((d) => d.category))
      .range([0, width])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, (d) => d.count)])
      .range([height, 0]);

    // Color scale
    const colorScale = d3
      .scaleSequential(d3.interpolateBlues)
      .domain([0, chartData.length]);

    // Create bars
    g.selectAll(".bar")
      .data(chartData)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.category))
      .attr("y", height)
      .attr("width", xScale.bandwidth())
      .attr("height", 0)
      .attr("fill", (d, i) => colorScale(i))
      .attr("stroke", "#22d3ee")
      .attr("stroke-width", 1)
      .on("mouseover", function (event, d) {
        d3.select(this).attr("stroke-width", 2).attr("stroke", "#ffd700");

        showTooltip(event, `${d.category}<br>Count: ${d.count}`);
      })
      .on("mouseout", function () {
        d3.select(this).attr("stroke-width", 1).attr("stroke", "#22d3ee");
        hideTooltip();
      })
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100)
      .attr("y", (d) => yScale(d.count))
      .attr("height", (d) => height - yScale(d.count));

    // Add axes
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("fill", "#cbd5e1")
      .style("text-anchor", "end")
      .attr("dx", "-0.8em")
      .attr("dy", "0.15em")
      .attr("transform", "rotate(-45)");

    g.append("g")
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .style("fill", "#cbd5e1");

    // Add labels
    g.append("text")
      .attr("x", width / 2)
      .attr("y", height + 80)
      .attr("text-anchor", "middle")
      .style("fill", "#cbd5e1")
      .style("font-size", "14px")
      .text(config.categoryColumn);

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -40)
      .attr("text-anchor", "middle")
      .style("fill", "#cbd5e1")
      .style("font-size", "14px")
      .text("Count");

    // Add title
    svg
      .append("text")
      .attr("x", width / 2 + margin.left)
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .style("fill", "#22d3ee")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .text(config.title || "Category Distribution");
  };

  // Map Implementation
  const renderMap = (svg, data, config) => {
    const width = 800;
    const height = 500;

    // Create projection
    const projection = d3
      .geoMercator()
      .center([77, 20]) // Center on India
      .scale(1000)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    // Filter valid coordinates
    const validData = data.filter(
      (d) =>
        d[config.latColumn] != null &&
        !isNaN(d[config.latColumn]) &&
        d[config.lonColumn] != null &&
        !isNaN(d[config.lonColumn]) &&
        Math.abs(d[config.latColumn]) <= 90 &&
        Math.abs(d[config.lonColumn]) <= 180
    );

    // Draw map background
    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "linear-gradient(180deg, #87CEEB 0%, #4682B4 100%)");

    // Add data points
    svg
      .selectAll(".map-point")
      .data(validData)
      .join("circle")
      .attr("class", "map-point")
      .attr(
        "cx",
        (d) => projection([d[config.lonColumn], d[config.latColumn]])?.[0] || 0
      )
      .attr(
        "cy",
        (d) => projection([d[config.lonColumn], d[config.latColumn]])?.[1] || 0
      )
      .attr("r", 0)
      .attr("fill", "#ff6b6b")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .attr("opacity", 0.7)
      .on("mouseover", function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 8)
          .attr("stroke-width", 2);

        showTooltip(
          event,
          `Lat: ${d[config.latColumn]}<br>Lon: ${d[config.lonColumn]}`
        );
      })
      .on("mouseout", function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 4)
          .attr("stroke-width", 1);
        hideTooltip();
      })
      .transition()
      .duration(1000)
      .delay((d, i) => i * 10)
      .attr("r", 4);

    // Add title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .style("fill", "#22d3ee")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .text(config.title || "Geographic Distribution");
  };

  // Timeline Implementation
  const renderTimeline = (svg, data, config) => {
    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 500 - margin.bottom - margin.top;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Process data
    const validData = data
      .filter(
        (d) =>
          d[config.dateColumn] != null &&
          d[config.valueColumn] != null &&
          !isNaN(d[config.valueColumn])
      )
      .map((d) => ({
        date: new Date(d[config.dateColumn]),
        value: d[config.valueColumn],
      }))
      .filter((d) => !isNaN(d.date.getTime()))
      .sort((a, b) => a.date - b.date);

    // Create scales
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(validData, (d) => d.date))
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(validData, (d) => d.value))
      .range([height, 0]);

    // Create line generator
    const line = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value))
      .curve(d3.curveCardinal);

    // Create area generator
    const area = d3
      .area()
      .x((d) => xScale(d.date))
      .y0(height)
      .y1((d) => yScale(d.value))
      .curve(d3.curveCardinal);

    // Add gradient
    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "timeline-gradient")
      .attr("gradientTransform", "rotate(90)");

    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#22d3ee")
      .attr("stop-opacity", 0.8);

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#22d3ee")
      .attr("stop-opacity", 0.1);

    // Add area
    g.append("path")
      .datum(validData)
      .attr("fill", "url(#timeline-gradient)")
      .attr("d", area);

    // Add line
    const path = g
      .append("path")
      .datum(validData)
      .attr("fill", "none")
      .attr("stroke", "#22d3ee")
      .attr("stroke-width", 3)
      .attr("d", line);

    // Animate line drawing
    const totalLength = path.node().getTotalLength();
    path
      .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(2000)
      .attr("stroke-dashoffset", 0);

    // Add dots
    g.selectAll(".dot")
      .data(validData)
      .join("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d.date))
      .attr("cy", (d) => yScale(d.value))
      .attr("r", 0)
      .attr("fill", "#22d3ee")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .on("mouseover", function (event, d) {
        d3.select(this).transition().duration(200).attr("r", 6);

        showTooltip(
          event,
          `Date: ${d.date.toLocaleDateString()}<br>Value: ${d.value}`
        );
      })
      .on("mouseout", function () {
        d3.select(this).transition().duration(200).attr("r", 3);
        hideTooltip();
      })
      .transition()
      .duration(1000)
      .delay((d, i) => i * 20)
      .attr("r", 3);

    // Add axes
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("fill", "#cbd5e1");

    g.append("g")
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .style("fill", "#cbd5e1");

    // Add title
    svg
      .append("text")
      .attr("x", width / 2 + margin.left)
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .style("fill", "#22d3ee")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .text(config.title || "Timeline");
  };

  // Biodiversity Treemap Implementation
  const renderBiodiversityTreemap = (svg, data, config) => {
    const width = 800;
    const height = 500;

    // Aggregate species data
    const speciesData = d3.rollup(
      data,
      (v) => v.length,
      (d) => d[config.columns[0]]
    );

    const hierarchyData = {
      name: "Marine Biodiversity",
      children: Array.from(speciesData, ([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 30), // Top 30 species
    };

    // Create hierarchy
    const root = d3
      .hierarchy(hierarchyData)
      .sum((d) => d.count)
      .sort((a, b) => b.value - a.value);

    // Create treemap
    const treemap = d3
      .treemap()
      .size([width, height])
      .paddingTop(20)
      .paddingInner(2);

    treemap(root);

    // Color scale
    const colorScale = d3
      .scaleSequential(d3.interpolateBlues)
      .domain([0, root.leaves().length]);

    // Draw rectangles
    const leaf = svg
      .selectAll("g")
      .data(root.leaves())
      .join("g")
      .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

    leaf
      .append("rect")
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .attr("fill", (d, i) => colorScale(i))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .style("cursor", "pointer")
      .on("mouseover", function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("stroke-width", 3)
          .attr("stroke", "#ffd700");

        showTooltip(event, `${d.data.name}<br>Count: ${d.data.count}`);
      })
      .on("mouseout", function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("stroke-width", 1)
          .attr("stroke", "#fff");
        hideTooltip();
      });

    // Add text labels
    leaf
      .append("text")
      .attr("x", 4)
      .attr("y", 16)
      .style("font-size", (d) => Math.min(12, (d.x1 - d.x0) / 8))
      .style("font-weight", "bold")
      .style("fill", "#fff")
      .style("text-shadow", "1px 1px 2px rgba(0,0,0,0.7)")
      .text((d) => d.data.name);

    leaf
      .append("text")
      .attr("x", 4)
      .attr("y", 32)
      .style("font-size", (d) => Math.min(10, (d.x1 - d.x0) / 10))
      .style("fill", "#fff")
      .style("text-shadow", "1px 1px 2px rgba(0,0,0,0.7)")
      .text((d) => `${d.value} occurrences`);

    // Add title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .style("fill", "#22d3ee")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .text(config.title || "Biodiversity Treemap");
  };

  // Heatmap Implementation
  const renderHeatmap = (svg, data, config) => {
    const margin = { top: 80, right: 40, bottom: 100, left: 100 };
    const width = 800 - margin.left - margin.right;
    const height = 500 - margin.bottom - margin.top;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Get numeric columns for correlation matrix
    const numericColumns = Object.keys(data[0])
      .filter((col) => data.every((d) => !isNaN(parseFloat(d[col]))))
      .slice(0, 8); // Limit to 8 columns for readability

    // Calculate correlation matrix
    const correlationMatrix = [];
    numericColumns.forEach((col1, i) => {
      numericColumns.forEach((col2, j) => {
        const values1 = data.map((d) => parseFloat(d[col1]));
        const values2 = data.map((d) => parseFloat(d[col2]));
        const correlation = calculateCorrelation(values1, values2);
        correlationMatrix.push({
          x: col1,
          y: col2,
          correlation: correlation,
        });
      });
    });

    // Create scales
    const xScale = d3
      .scaleBand()
      .domain(numericColumns)
      .range([0, width])
      .padding(0.1);

    const yScale = d3
      .scaleBand()
      .domain(numericColumns)
      .range([0, height])
      .padding(0.1);

    const colorScale = d3.scaleSequential(d3.interpolateRdBu).domain([-1, 1]);

    // Draw heatmap cells
    g.selectAll(".cell")
      .data(correlationMatrix)
      .join("rect")
      .attr("class", "cell")
      .attr("x", (d) => xScale(d.x))
      .attr("y", (d) => yScale(d.y))
      .attr("width", xScale.bandwidth())
      .attr("height", yScale.bandwidth())
      .attr("fill", (d) => colorScale(d.correlation))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .on("mouseover", function (event, d) {
        showTooltip(
          event,
          `${d.x} vs ${d.y}<br>Correlation: ${d.correlation.toFixed(3)}`
        );
      })
      .on("mouseout", hideTooltip);

    // Add correlation values
    g.selectAll(".correlation-text")
      .data(correlationMatrix)
      .join("text")
      .attr("class", "correlation-text")
      .attr("x", (d) => xScale(d.x) + xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.y) + yScale.bandwidth() / 2)
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .style("fill", (d) => (Math.abs(d.correlation) > 0.5 ? "#fff" : "#000"))
      .style("font-size", "10px")
      .style("font-weight", "bold")
      .text((d) => d.correlation.toFixed(2));

    // Add axes
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("fill", "#cbd5e1")
      .style("text-anchor", "end")
      .attr("dx", "-0.8em")
      .attr("dy", "0.15em")
      .attr("transform", "rotate(-45)");

    g.append("g")
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .style("fill", "#cbd5e1");

    // Add title
    svg
      .append("text")
      .attr("x", width / 2 + margin.left)
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .style("fill", "#22d3ee")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .text(config.title || "Correlation Heatmap");
  };

  // Network Graph Implementation (simplified)
  const renderNetworkGraph = (svg, data, config) => {
    const width = 800;
    const height = 500;

    // Create simple network from data relationships
    const nodes = [];
    const links = [];
    const nodeMap = new Map();

    // Extract unique values from first two string columns
    const stringColumns = Object.keys(data[0])
      .filter((col) => typeof data[0][col] === "string")
      .slice(0, 2);

    if (stringColumns.length < 2) {
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .style("fill", "#cbd5e1")
        .text("Network requires at least 2 categorical columns");
      return;
    }

    // Create nodes and links
    data.forEach((d) => {
      const source = d[stringColumns[0]];
      const target = d[stringColumns[1]];

      if (!nodeMap.has(source)) {
        nodeMap.set(source, nodes.length);
        nodes.push({ id: source, group: 1 });
      }
      if (!nodeMap.has(target)) {
        nodeMap.set(target, nodes.length);
        nodes.push({ id: target, group: 2 });
      }

      links.push({
        source: nodeMap.get(source),
        target: nodeMap.get(target),
      });
    });

    // Limit nodes for performance
    const limitedNodes = nodes.slice(0, 50);
    const limitedLinks = links.filter(
      (l) => l.source < limitedNodes.length && l.target < limitedNodes.length
    );

    // Create force simulation
    const simulation = d3
      .forceSimulation(limitedNodes)
      .force(
        "link",
        d3.forceLink(limitedLinks).id((d) => d.index)
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Create links
    const link = svg
      .append("g")
      .selectAll("line")
      .data(limitedLinks)
      .join("line")
      .attr("stroke", "#22d3ee")
      .attr("stroke-opacity", 0.5)
      .attr("stroke-width", 1);

    // Create nodes
    const node = svg
      .append("g")
      .selectAll("circle")
      .data(limitedNodes)
      .join("circle")
      .attr("r", 5)
      .attr("fill", (d) => (d.group === 1 ? "#22d3ee" : "#06b6d4"))
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .on("mouseover", function (event, d) {
        showTooltip(event, d.id);
      })
      .on("mouseout", hideTooltip);

    // Update positions
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    });

    // Add title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .style("fill", "#22d3ee")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .text(config.title || "Network Graph");
  };

  // Sankey Diagram Implementation (simplified)
  const renderSankeyDiagram = (svg, data, config) => {
    svg
      .append("text")
      .attr("x", 400)
      .attr("y", 250)
      .attr("text-anchor", "middle")
      .style("fill", "#cbd5e1")
      .style("font-size", "16px")
      .text("Sankey diagram requires specialized data structure");
  };

  // Violin Plot Implementation (simplified)
  const renderViolin = (svg, data, config) => {
    svg
      .append("text")
      .attr("x", 400)
      .attr("y", 250)
      .attr("text-anchor", "middle")
      .style("fill", "#cbd5e1")
      .style("font-size", "16px")
      .text("Violin plot implementation in progress");
  };

  // Utility Functions
  const calculateCorrelation = (x, y) => {
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
    const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt(
      (n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY)
    );

    return denominator === 0 ? 0 : numerator / denominator;
  };

  const showTooltip = (event, content) => {
    // Create tooltip if it doesn't exist
    let tooltip = d3.select("body").select(".d3-tooltip");
    if (tooltip.empty()) {
      tooltip = d3
        .select("body")
        .append("div")
        .attr("class", "d3-tooltip")
        .style("position", "absolute")
        .style("padding", "8px")
        .style("background", "rgba(15, 23, 42, 0.95)")
        .style("color", "#fff")
        .style("border-radius", "4px")
        .style("font-size", "12px")
        .style("pointer-events", "none")
        .style("z-index", "9999")
        .style("opacity", 0);
    }

    tooltip
      .html(content)
      .style("left", event.pageX + 10 + "px")
      .style("top", event.pageY - 10 + "px")
      .transition()
      .duration(200)
      .style("opacity", 1);
  };

  const hideTooltip = () => {
    d3.select(".d3-tooltip").transition().duration(200).style("opacity", 0);
  };

  return (
    <div ref={containerRef} className="visualization-engine">
      <svg
        ref={svgRef}
        width="800"
        height="500"
        style={{
          background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
          borderRadius: "8px",
        }}
      />
    </div>
  );
};

export default VisualizationEngine;
