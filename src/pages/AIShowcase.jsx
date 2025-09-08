import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const AIShowcase = () => {
  const speciesChartRef = useRef(null);
  const accuracyGaugeRef = useRef(null);
  const predictionMapRef = useRef(null);
  const [selectedMetric, setSelectedMetric] = useState("accuracy");

  // Mock data for AI capabilities demonstration
  const aiMetrics = {
    accuracy: 94.7,
    speciesIdentified: 547,
    predictions: 15423,
    processingSpeed: 2.3,
  };

  const speciesData = [
    { category: "Fish", count: 234, accuracy: 96.2, color: "#0ea5e9" },
    { category: "Crustaceans", count: 89, accuracy: 92.1, color: "#06b6d4" },
    { category: "Mollusks", count: 156, accuracy: 94.8, color: "#22d3ee" },
    { category: "Corals", count: 45, accuracy: 89.3, color: "#67e8f9" },
    { category: "Others", count: 23, accuracy: 91.7, color: "#a5f3fc" },
  ];

  const accuracyTrends = [
    { month: "Jan", accuracy: 88.2 },
    { month: "Feb", accuracy: 89.1 },
    { month: "Mar", accuracy: 90.5 },
    { month: "Apr", accuracy: 91.8 },
    { month: "May", accuracy: 93.2 },
    { month: "Jun", accuracy: 94.7 },
  ];

  // AI Species Identification Bubble Chart
  useEffect(() => {
    if (!speciesChartRef.current) return;

    const svg = d3.select(speciesChartRef.current);
    svg.selectAll("*").remove();

    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };

    // Create scales
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(speciesData, (d) => d.count)])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([85, 100])
      .range([height - margin.bottom, margin.top]);

    const radiusScale = d3
      .scaleSqrt()
      .domain([0, d3.max(speciesData, (d) => d.count)])
      .range([5, 25]);

    // Create gradient definitions
    const defs = svg.append("defs");
    speciesData.forEach((d, i) => {
      const gradient = defs
        .append("radialGradient")
        .attr("id", `bubble-gradient-${i}`)
        .attr("cx", "30%")
        .attr("cy", "30%");

      gradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", d3.color(d.color).brighter(0.5))
        .attr("stop-opacity", 0.9);

      gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", d.color)
        .attr("stop-opacity", 0.7);
    });

    // Add axes
    const xAxis = d3.axisBottom(xScale).ticks(5);
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickFormat((d) => `${d}%`);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis)
      .append("text")
      .attr("x", width / 2)
      .attr("y", 35)
      .attr("fill", "#cbd5e1")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Species Count");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -40)
      .attr("fill", "#cbd5e1")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .text("AI Accuracy (%)");

    // Create bubbles with animation
    const bubbles = svg
      .selectAll(".species-bubble")
      .data(speciesData)
      .join("circle")
      .attr("class", "species-bubble")
      .attr("cx", (d) => xScale(d.count))
      .attr("cy", (d) => yScale(d.accuracy))
      .attr("r", 0)
      .attr("fill", (d, i) => `url(#bubble-gradient-${i})`)
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .style("cursor", "pointer");

    // Animate bubbles entrance
    bubbles
      .transition()
      .duration(1000)
      .delay((d, i) => i * 200)
      .attr("r", (d) => radiusScale(d.count))
      .ease(d3.easeElastic);

    // Add hover effects
    bubbles
      .on("mouseover", function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", radiusScale(d.count) * 1.2)
          .attr("stroke-width", 3);

        // Add tooltip
        const tooltip = svg
          .append("g")
          .attr("class", "tooltip")
          .attr(
            "transform",
            `translate(${xScale(d.count)}, ${
              yScale(d.accuracy) - radiusScale(d.count) - 20
            })`
          );

        const rect = tooltip
          .append("rect")
          .attr("x", -40)
          .attr("y", -25)
          .attr("width", 80)
          .attr("height", 20)
          .attr("rx", 4)
          .attr("fill", "rgba(15, 23, 42, 0.9)")
          .attr("stroke", d.color);

        tooltip
          .append("text")
          .attr("text-anchor", "middle")
          .attr("y", -10)
          .attr("fill", "#fff")
          .style("font-size", "11px")
          .text(`${d.category}: ${d.accuracy}%`);
      })
      .on("mouseout", function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", radiusScale(d.count))
          .attr("stroke-width", 2);

        svg.select(".tooltip").remove();
      });

    // Add category labels
    bubbles.each(function (d) {
      if (radiusScale(d.count) > 15) {
        svg
          .append("text")
          .attr("x", xScale(d.count))
          .attr("y", yScale(d.accuracy))
          .attr("text-anchor", "middle")
          .attr("dy", "0.3em")
          .attr("fill", "#fff")
          .style("font-size", "10px")
          .style("font-weight", "bold")
          .style("pointer-events", "none")
          .text(d.category);
      }
    });
  }, [speciesData]);

  // AI Accuracy Gauge
  useEffect(() => {
    if (!accuracyGaugeRef.current) return;

    const svg = d3.select(accuracyGaugeRef.current);
    svg.selectAll("*").remove();

    const width = 200;
    const height = 200;
    const radius = Math.min(width, height) / 2 - 20;
    const centerX = width / 2;
    const centerY = height / 2;

    // Create gauge arc
    const arc = d3
      .arc()
      .innerRadius(radius - 20)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .cornerRadius(10);

    // Background arc
    svg
      .append("path")
      .datum({ endAngle: Math.PI / 2 })
      .attr("d", arc)
      .attr("transform", `translate(${centerX}, ${centerY})`)
      .attr("fill", "rgba(51, 65, 85, 0.3)");

    // Create gradient for accuracy arc
    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "accuracy-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", radius);

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#22d3ee");

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#0ea5e9");

    // Animated accuracy arc
    const accuracyAngle = (aiMetrics.accuracy / 100) * Math.PI;
    const accuracyArc = svg
      .append("path")
      .datum({ endAngle: -Math.PI / 2 })
      .attr("d", arc)
      .attr("transform", `translate(${centerX}, ${centerY})`)
      .attr("fill", "url(#accuracy-gradient)");

    accuracyArc
      .transition()
      .duration(2000)
      .attrTween("d", function (d) {
        const interpolate = d3.interpolate(
          d.endAngle,
          accuracyAngle - Math.PI / 2
        );
        return function (t) {
          d.endAngle = interpolate(t);
          return arc(d);
        };
      });

    // Add center text
    const centerGroup = svg
      .append("g")
      .attr("transform", `translate(${centerX}, ${centerY})`);

    centerGroup
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.5em")
      .attr("fill", "#22d3ee")
      .style("font-size", "24px")
      .style("font-weight", "bold")
      .text("0%")
      .transition()
      .duration(2000)
      .tween("text", function () {
        const interpolate = d3.interpolate(0, aiMetrics.accuracy);
        return function (t) {
          d3.select(this).text(`${Math.round(interpolate(t) * 10) / 10}%`);
        };
      });

    centerGroup
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1em")
      .attr("fill", "#cbd5e1")
      .style("font-size", "12px")
      .text("AI Accuracy");
  }, [aiMetrics.accuracy]);

  // Prediction Trend Line Chart
  useEffect(() => {
    if (!predictionMapRef.current) return;

    const svg = d3.select(predictionMapRef.current);
    svg.selectAll("*").remove();

    const width = 300;
    const height = 150;
    const margin = { top: 10, right: 10, bottom: 30, left: 30 };

    const xScale = d3
      .scaleBand()
      .domain(accuracyTrends.map((d) => d.month))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([85, 100])
      .range([height - margin.bottom, margin.top]);

    // Create line generator
    const line = d3
      .line()
      .x((d) => xScale(d.month) + xScale.bandwidth() / 2)
      .y((d) => yScale(d.accuracy))
      .curve(d3.curveCardinal);

    // Add gradient area
    const area = d3
      .area()
      .x((d) => xScale(d.month) + xScale.bandwidth() / 2)
      .y0(height - margin.bottom)
      .y1((d) => yScale(d.accuracy))
      .curve(d3.curveCardinal);

    // Create gradient
    const areaGradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "area-gradient")
      .attr("gradientTransform", "rotate(90)");

    areaGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#22d3ee")
      .attr("stop-opacity", 0.6);

    areaGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#22d3ee")
      .attr("stop-opacity", 0.1);

    // Add area
    svg
      .append("path")
      .datum(accuracyTrends)
      .attr("fill", "url(#area-gradient)")
      .attr("d", area);

    // Add line
    const path = svg
      .append("path")
      .datum(accuracyTrends)
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

    // Add data points
    svg
      .selectAll(".data-point")
      .data(accuracyTrends)
      .join("circle")
      .attr("class", "data-point")
      .attr("cx", (d) => xScale(d.month) + xScale.bandwidth() / 2)
      .attr("cy", (d) => yScale(d.accuracy))
      .attr("r", 0)
      .attr("fill", "#22d3ee")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100)
      .attr("r", 4);

    // Add axes
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("fill", "#cbd5e1")
      .style("font-size", "10px");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(
        d3
          .axisLeft(yScale)
          .ticks(4)
          .tickFormat((d) => `${d}%`)
      )
      .selectAll("text")
      .attr("fill", "#cbd5e1")
      .style("font-size", "10px");
  }, [accuracyTrends]);

  return (
    <section className="relative py-20 bg-slate-900 overflow-hidden">
      {/* Floating marine elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-sphere floating-sphere-1"></div>
        <div className="floating-sphere floating-sphere-2"></div>
        <div className="floating-sphere floating-sphere-3"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-full px-6 py-2 mb-6">
            <span className="text-2xl">🤖</span>
            <span className="text-cyan-400 font-semibold">
              Revolutionary AI-Powered Research Tools
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Accelerate Your{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Marine Research
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Harness cutting-edge artificial intelligence to identify species,
            predict climate impacts, and monitor environmental changes with
            unprecedented accuracy.
          </p>
        </div>

        {/* AI Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Species Identification */}
          <div className="ocean-card dashboard-card group">
            <div className="mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Instant Species Identification
              </h3>
              <p className="text-slate-300 mb-4">
                Upload otolith images and get accurate species identification in
                seconds using advanced AI models.
              </p>
            </div>

            {/* D3.js Species Chart */}
            <div className="bg-slate-800/50 rounded-lg p-4 mb-4">
              <svg
                ref={speciesChartRef}
                width="100%"
                height="300"
                viewBox="0 0 400 300"
              ></svg>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">
                  ✓ 94.7% accuracy across 500+ marine species
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">
                  ✓ Morphometric analysis & measurements
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">
                  ✓ Batch processing for research workflows
                </span>
              </div>
            </div>

            <button className="ocean-btn-primary w-full mt-6 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
              Try AI Identification →
            </button>
          </div>

          {/* Climate Impact Prediction */}
          <div className="ocean-card dashboard-card group">
            <div className="mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🔮</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Climate Impact Prediction
              </h3>
              <p className="text-slate-300 mb-4">
                Forecast species distribution changes under different climate
                scenarios with ML models.
              </p>
            </div>

            {/* D3.js Accuracy Gauge */}
            <div className="bg-slate-800/50 rounded-lg p-4 mb-4 flex justify-center">
              <svg ref={accuracyGaugeRef} width="200" height="200"></svg>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">
                  ✓ Multi-scenario climate modeling
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">
                  ✓ Species vulnerability assessment
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">
                  ✓ Conservation priority mapping
                </span>
              </div>
            </div>

            <button className="ocean-btn-secondary w-full mt-6 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
              Explore Predictions →
            </button>
          </div>

          {/* Real-time Monitoring */}
          <div className="ocean-card dashboard-card group">
            <div className="mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📡</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Real-time Environmental Monitoring
              </h3>
              <p className="text-slate-300 mb-4">
                AI-powered anomaly detection for marine ecosystem health with
                live sensor data.
              </p>
            </div>

            {/* D3.js Trend Chart */}
            <div className="bg-slate-800/50 rounded-lg p-4 mb-4">
              <h4 className="text-white text-sm font-semibold mb-2">
                AI Accuracy Improvement
              </h4>
              <svg
                ref={predictionMapRef}
                width="100%"
                height="150"
                viewBox="0 0 300 150"
              ></svg>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">
                  ✓ Live sensor data from 15 marine stations
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">
                  ✓ Automated alert systems
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">
                  ✓ Predictive trend analysis
                </span>
              </div>
            </div>

            <button className="ocean-btn-secondary w-full mt-6 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
              View Live Data →
            </button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4">
            <button className="ocean-btn-primary px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105">
              🚀 Start Using AI Tools
            </button>
            <button className="ocean-btn-secondary px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105">
              📖 View Documentation
            </button>
          </div>
        </div>
      </div>

      {/* Ocean wave effects */}
      <div className="ocean-wave-line"></div>
      <div className="ocean-wave-glow"></div>
    </section>
  );
};

export default AIShowcase;
