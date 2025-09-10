import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const VisualizationEngine = ({
  data,
  chartType,
  config,
  onChartReady,
  onError,
}) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);

  // Utility functions
  const getColorScheme = (scheme) => {
    const schemes = {
      ocean: ["#0ea5e9", "#06b6d4", "#22d3ee", "#67e8f9"],
      depths: ["#1e3a8a", "#1e40af", "#3b82f6", "#60a5fa"],
      coral: ["#dc2626", "#ea580c", "#f59e0b", "#eab308"],
      tropical: ["#059669", "#10b981", "#34d399", "#6ee7b7"],
      sunset: ["#7c3aed", "#a855f7", "#c084fc", "#e879f9"],
    };
    return schemes[scheme] || schemes.ocean;
  };

  const calculateCorrelation = (x, y) => {
    const n = Math.min(x.length, y.length);
    if (n < 2) return 0;

    const xFiltered = x.slice(0, n);
    const yFiltered = y.slice(0, n);

    const sumX = xFiltered.reduce((a, b) => a + b, 0);
    const sumY = yFiltered.reduce((a, b) => a + b, 0);
    const sumXY = xFiltered.reduce((sum, xi, i) => sum + xi * yFiltered[i], 0);
    const sumX2 = xFiltered.reduce((sum, xi) => sum + xi * xi, 0);
    const sumY2 = yFiltered.reduce((sum, yi) => sum + yi * yi, 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt(
      (n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY)
    );

    return denominator === 0 ? 0 : numerator / denominator;
  };

  const showTooltip = (event, content) => {
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

  const addTitle = (svg, title, width, color) => {
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .style("fill", color)
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .text(title);
  };

  const addAxes = (g, xScale, yScale, width, height, xLabel, yLabel) => {
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("fill", "#cbd5e1");

    g.append("g")
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .style("fill", "#cbd5e1");

    // X label
    g.append("text")
      .attr("x", width / 2)
      .attr("y", height + 50)
      .attr("text-anchor", "middle")
      .style("fill", "#cbd5e1")
      .style("font-size", "14px")
      .text(xLabel);

    // Y label
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -40)
      .attr("text-anchor", "middle")
      .style("fill", "#cbd5e1")
      .style("font-size", "14px")
      .text(yLabel);
  };

  // Chart renderers
  const renderHistogram = (svg, data, config, width, height) => {
    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const values = data
      .map((d) => d[config.column])
      .filter((v) => v != null && !isNaN(v) && isFinite(v));
    if (!values.length)
      throw new Error(`No valid data in column ${config.column}`);

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(values))
      .range([0, chartWidth]);
    const histogramGen = d3
      .histogram()
      .value((d) => d)
      .domain(xScale.domain())
      .thresholds(config.bins || 20);
    const bins = histogramGen(values);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(bins, (d) => d.length)])
      .range([chartHeight, 0]);

    const colors = getColorScheme(config.colorScheme);
    const grad = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "histogram-gradient")
      .attr("gradientTransform", "rotate(90)");
    grad
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", colors[0])
      .attr("stop-opacity", 0.8);
    grad
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", colors[1])
      .attr("stop-opacity", 0.4);

    const t = g
      .selectAll(".bar")
      .data(bins)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.x0))
      .attr("width", (d) => Math.max(0, xScale(d.x1) - xScale(d.x0) - 1))
      .attr("y", chartHeight)
      .attr("height", 0)
      .attr("fill", "url(#histogram-gradient)")
      .attr("stroke", colors[2])
      .attr("stroke-width", 1)
      .on("mouseover", function (event, d) {
        d3.select(this).attr("stroke-width", 2).attr("stroke", "#ffd700");
        showTooltip(
          event,
          `Range: ${d.x0.toFixed(2)} - ${d.x1.toFixed(2)}<br>Count: ${d.length}`
        );
      })
      .on("mouseout", function () {
        d3.select(this).attr("stroke-width", 1).attr("stroke", colors[2]);
        hideTooltip();
      })
      .transition()
      .duration(config.animated === false ? 0 : 1000)
      .delay((_, i) => (config.animated === false ? 0 : i * 50))
      .attr("y", (d) => yScale(d.length))
      .attr("height", (d) => chartHeight - yScale(d.length));

    addAxes(
      g,
      xScale,
      yScale,
      chartWidth,
      chartHeight,
      config.column,
      "Frequency"
    );
    addTitle(svg, config.title || "Distribution", width, colors[0]);
    return t;
  };

  const renderBarChart = (svg, data, config, width, height) => {
    const margin = { top: 40, right: 40, bottom: 100, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const agg = d3.rollup(
      data,
      (v) => v.length,
      (d) => d[config.categoryColumn]
    );
    const chartData = Array.from(agg, ([k, v]) => ({
      category: k || "Unknown",
      count: v,
    }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);
    if (!chartData.length)
      throw new Error(`No valid data in column ${config.categoryColumn}`);

    const xScale = d3
      .scaleBand()
      .domain(chartData.map((d) => d.category))
      .range([0, chartWidth])
      .padding(0.1);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, (d) => d.count)])
      .range([chartHeight, 0]);

    const colors = getColorScheme(config.colorScheme);
    const colorScale = d3
      .scaleSequential(d3.interpolate(colors[0], colors[1]))
      .domain([0, chartData.length]);

    const t = g
      .selectAll(".bar")
      .data(chartData)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.category))
      .attr("width", xScale.bandwidth())
      .attr("y", chartHeight)
      .attr("height", 0)
      .attr("fill", (_, i) => colorScale(i))
      .attr("stroke", colors[2])
      .attr("stroke-width", 1)
      .on("mouseover", function (event, d) {
        d3.select(this).attr("stroke-width", 2).attr("stroke", "#ffd700");
        showTooltip(event, `${d.category}<br>Count: ${d.count}`);
      })
      .on("mouseout", function () {
        d3.select(this).attr("stroke-width", 1).attr("stroke", colors[2]);
        hideTooltip();
      })
      .transition()
      .duration(config.animated === false ? 0 : 1000)
      .delay((_, i) => (config.animated === false ? 0 : i * 100))
      .attr("y", (d) => yScale(d.count))
      .attr("height", (d) => chartHeight - yScale(d.count));

    g.append("g")
      .attr("transform", `translate(0,${chartHeight})`)
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
    addTitle(svg, config.title || "Category Distribution", width, colors[0]);
    return t;
  };

  const renderScatterPlot = (svg, data, config, width, height) => {
    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const validData = data.filter(
      (d) =>
        d[config.xColumn] != null &&
        !isNaN(d[config.xColumn]) &&
        d[config.yColumn] != null &&
        !isNaN(d[config.yColumn]) &&
        isFinite(d[config.xColumn]) &&
        isFinite(d[config.yColumn])
    );

    if (!validData.length)
      throw new Error(
        `No valid data for columns: ${config.xColumn}, ${config.yColumn}`
      );

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(validData, (d) => d[config.xColumn]))
      .range([0, chartWidth]);
    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(validData, (d) => d[config.yColumn]))
      .range([chartHeight, 0]);

    const colors = getColorScheme(config.colorScheme);
    const colorScale = d3
      .scaleSequential(d3.interpolate(colors[0], colors[1]))
      .domain(d3.extent(validData, (d) => d[config.yColumn]));

    const t = g
      .selectAll(".dot")
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
      .duration(config.animated === false ? 0 : 1000)
      .delay((_, i) => (config.animated === false ? 0 : i * 2))
      .attr("r", 4);

    addAxes(
      g,
      xScale,
      yScale,
      chartWidth,
      chartHeight,
      config.xColumn,
      config.yColumn
    );
    addTitle(svg, config.title || "Scatter Plot", width, colors[0]);
    return t;
  };

  const renderMap = (svg, data, config, width, height) => {
    const validData = data.filter(
      (d) =>
        d[config.latColumn] != null &&
        !isNaN(d[config.latColumn]) &&
        d[config.lonColumn] != null &&
        !isNaN(d[config.lonColumn]) &&
        Math.abs(d[config.latColumn]) <= 90 &&
        Math.abs(d[config.lonColumn]) <= 180
    );

    if (!validData.length)
      throw new Error(
        `No valid coordinates in columns: ${config.latColumn}, ${config.lonColumn}`
      );

    const latExtent = d3.extent(validData, (d) => d[config.latColumn]);
    const lonExtent = d3.extent(validData, (d) => d[config.lonColumn]);
    const centerLat = (latExtent[0] + latExtent[1]) / 2;
    const centerLon = (lonExtent[0] + lonExtent[1]) / 2;

    const projection = d3
      .geoMercator()
      .center([centerLon, centerLat])
      .scale(Math.min(width, height) * 2)
      .translate([width / 2, height / 2]);

    const colors = getColorScheme(config.colorScheme);

    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr(
        "fill",
        `linear-gradient(180deg, ${colors[0]} 0%, ${colors[1]} 100%)`
      );

    const t = svg
      .selectAll(".map-point")
      .data(validData)
      .join("circle")
      .attr("class", "map-point")
      .attr("cx", (d) => {
        const coords = projection([d[config.lonColumn], d[config.latColumn]]);
        return coords ? coords[0] : 0;
      })
      .attr("cy", (d) => {
        const coords = projection([d[config.lonColumn], d[config.latColumn]]);
        return coords ? coords[1] : 0;
      })
      .attr("r", 0)
      .attr("fill", colors[2])
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
      .duration(config.animated === false ? 0 : 1000)
      .delay((_, i) => (config.animated === false ? 0 : i * 10))
      .attr("r", 4);

    addTitle(svg, config.title || "Geographic Distribution", width, colors[0]);
    return t;
  };

  const renderTimeline = (svg, data, config, width, height) => {
    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

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

    if (!validData.length)
      throw new Error(
        `No valid data for columns: ${config.dateColumn}, ${config.valueColumn}`
      );

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(validData, (d) => d.date))
      .range([0, chartWidth]);
    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(validData, (d) => d.value))
      .range([chartHeight, 0]);

    const line = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value))
      .curve(d3.curveCardinal);

    const colors = getColorScheme(config.colorScheme);

    const path = g
      .append("path")
      .datum(validData)
      .attr("fill", "none")
      .attr("stroke", colors[0])
      .attr("stroke-width", 3)
      .attr("d", line);

    if (config.animated !== false) {
      const totalLength = path.node().getTotalLength();
      path
        .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(2000)
        .attr("stroke-dashoffset", 0);
    }

    const t = g
      .selectAll(".dot")
      .data(validData)
      .join("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d.date))
      .attr("cy", (d) => yScale(d.value))
      .attr("r", 0)
      .attr("fill", colors[0])
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
      .duration(config.animated === false ? 0 : 1000)
      .delay((_, i) => (config.animated === false ? 0 : i * 20))
      .attr("r", 3);

    addAxes(
      g,
      xScale,
      yScale,
      chartWidth,
      chartHeight,
      config.dateColumn,
      config.valueColumn
    );
    addTitle(svg, config.title || "Timeline", width, colors[0]);
    return t;
  };

  const renderBiodiversityTreemap = (svg, data, config, width, height) => {
    const speciesData = d3.rollup(
      data,
      (v) => v.length,
      (d) => d[config.columns[0]]
    );

    const hierarchyData = {
      name: "Marine Biodiversity",
      children: Array.from(speciesData, ([name, count]) => ({
        name: name || "Unknown",
        count,
      }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 30),
    };

    if (!hierarchyData.children.length)
      throw new Error(`No valid data in column: ${config.columns[0]}`);

    const root = d3
      .hierarchy(hierarchyData)
      .sum((d) => d.count)
      .sort((a, b) => b.value - a.value);
    const treemap = d3
      .treemap()
      .size([width, height])
      .paddingTop(20)
      .paddingInner(2);
    treemap(root);

    const colors = getColorScheme(config.colorScheme);
    const colorScale = d3
      .scaleSequential(d3.interpolate(colors[0], colors[1]))
      .domain([0, root.leaves().length]);

    const leaf = svg
      .selectAll("g")
      .data(root.leaves())
      .join("g")
      .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

    leaf
      .append("rect")
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .attr("fill", (_, i) => colorScale(i))
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

    leaf
      .append("text")
      .attr("x", 4)
      .attr("y", 16)
      .style("font-size", (d) => Math.min(12, (d.x1 - d.x0) / 8))
      .style("font-weight", "bold")
      .style("fill", "#fff")
      .style("text-shadow", "1px 1px 2px rgba(0,0,0,0.7)")
      .text((d) => d.data.name);

    addTitle(svg, config.title || "Biodiversity Treemap", width, colors[0]);
    return null; // No transition for treemap
  };

  const renderHeatmap = (svg, data, config, width, height) => {
    const margin = { top: 80, right: 40, bottom: 100, left: 100 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.bottom - margin.top;
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const numericColumns = Object.keys(data[0])
      .filter((col) => data.every((d) => !isNaN(parseFloat(d[col]))))
      .slice(0, 8);

    if (numericColumns.length < 2)
      throw new Error("Need at least 2 numeric columns for heatmap");

    const correlationMatrix = [];
    numericColumns.forEach((col1) => {
      numericColumns.forEach((col2) => {
        const values1 = data
          .map((d) => parseFloat(d[col1]))
          .filter((v) => !isNaN(v));
        const values2 = data
          .map((d) => parseFloat(d[col2]))
          .filter((v) => !isNaN(v));
        const correlation = calculateCorrelation(values1, values2);
        correlationMatrix.push({ x: col1, y: col2, correlation });
      });
    });

    const xScale = d3
      .scaleBand()
      .domain(numericColumns)
      .range([0, chartWidth])
      .padding(0.1);
    const yScale = d3
      .scaleBand()
      .domain(numericColumns)
      .range([0, chartHeight])
      .padding(0.1);
    const colorScale = d3.scaleSequential(d3.interpolateRdBu).domain([-1, 1]);

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

    g.append("g")
      .attr("transform", `translate(0,${chartHeight})`)
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

    addTitle(
      svg,
      config.title || "Correlation Heatmap",
      width,
      getColorScheme(config.colorScheme)[0]
    );
    return null;
  };

  // Placeholder renderers
  const renderNetworkGraph = (svg, data, config, width, height) => {
    const colors = getColorScheme(config.colorScheme);
    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#1e293b");
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height / 2)
      .attr("text-anchor", "middle")
      .style("fill", "#cbd5e1")
      .style("font-size", "16px")
      .text("Network graph implementation in progress");
    addTitle(svg, config.title || "Network Graph", width, colors[0]);
    return null;
  };

  const renderSankeyDiagram = (svg, data, config, width, height) => {
    const colors = getColorScheme(config.colorScheme);
    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#1e293b");
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height / 2)
      .attr("text-anchor", "middle")
      .style("fill", "#cbd5e1")
      .style("font-size", "16px")
      .text("Sankey diagram requires specialized data structure");
    addTitle(svg, config.title || "Sankey Diagram", width, colors[0]);
    return null;
  };

  const renderViolin = (svg, data, config, width, height) => {
    const colors = getColorScheme(config.colorScheme);
    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#1e293b");
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height / 2)
      .attr("text-anchor", "middle")
      .style("fill", "#cbd5e1")
      .style("font-size", "16px")
      .text("Violin plot implementation coming soon");
    addTitle(svg, config.title || "Violin Plot", width, colors[0]);
    return null;
  };

  useEffect(() => {
    if (!data || !chartType || !svgRef.current) return;

    const svg = d3
      .select(svgRef.current)
      .attr("width", config.width || 800)
      .attr("height", config.height || 500);
    svg.selectAll("*").remove();

    try {
      let transition;
      const width = parseInt(config.width) || 800;
      const height = parseInt(config.height) || 500;

      switch (chartType) {
        case "histogram":
          transition = renderHistogram(svg, data, config, width, height);
          break;
        case "scatter":
          transition = renderScatterPlot(svg, data, config, width, height);
          break;
        case "bar":
          transition = renderBarChart(svg, data, config, width, height);
          break;
        case "map":
          transition = renderMap(svg, data, config, width, height);
          break;
        case "timeline":
          transition = renderTimeline(svg, data, config, width, height);
          break;
        case "biodiversity-treemap":
          transition = renderBiodiversityTreemap(
            svg,
            data,
            config,
            width,
            height
          );
          break;
        case "heatmap":
          transition = renderHeatmap(svg, data, config, width, height);
          break;
        case "network":
          transition = renderNetworkGraph(svg, data, config, width, height);
          break;
        case "sankey":
          transition = renderSankeyDiagram(svg, data, config, width, height);
          break;
        case "violin":
          transition = renderViolin(svg, data, config, width, height);
          break;
        default:
          throw new Error(`Unknown chart type: ${chartType}`);
      }

      if (transition && transition.on) {
        transition.on("end", () => onChartReady && onChartReady(svg.node()));
      } else {
        // No animation; call immediately
        setTimeout(() => onChartReady && onChartReady(svg.node()), 100);
      }
    } catch (err) {
      console.error("Rendering error:", err);
      onError && onError(err.message);
    }
  }, [data, chartType, config, onChartReady, onError]);

  return (
    <div ref={containerRef} className="visualization-engine">
      <svg
        ref={svgRef}
        style={{
          background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
          borderRadius: "8px",
        }}
      />
    </div>
  );
};

export default VisualizationEngine;
