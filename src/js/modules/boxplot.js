import * as d3 from "d3";
import {_} from 'vue-underscore';
//import * as helpers from "@/js/utils/helpers";
// import * as helpers from '../utils/helpers.js';
//import $ from "jquery";

d3.selection.prototype.moveToFront = function () {
    return this.each(function () {
        this.parentNode.appendChild(this);
    });
};

d3.selection.prototype.moveToBack = function () {
    return this.each(function () {
        var firstChild = this.parentNode.firstChild;
        if (firstChild) {
            this.parentNode.insertBefore(this, firstChild);
        }
    });
};


export default class boxplot {
    constructor(
        data,
        title,
        axis,
        rootId,
        dimension = {
            width: d3.select(`#${rootId}`).node().clientWidth,
            height: d3.select(`#${rootId}`).node().clientHeight
        },
        padding = {top: 50, right: 50, bottom: 50, left: 50}
    ) {
        this.data = data;
        this.title = title;
        this.axis = axis;
        this.rootId = rootId;
        this.dimension = dimension;
        this.padding = padding;
        this.updateDimensions();
        this.createScale();
        this.render()

    }

    updateDimensions() {
        this.dimension.innerWidth = this.dimension.width - this.padding.left - this.padding.right;
        this.dimension.innerHeight = this.dimension.height - this.padding.top - this.padding.bottom;
    }

    createScale() {
        this.scale = {
            x: d3.scaleBand().domain(this.axis.x.domain).range([0, this.dimension.innerWidth]).padding(.25),
            y: d3.scaleLinear().domain(this.axis.y.domain).range([this.dimension.innerHeight, 0]),
            c: d3.scaleOrdinal().domain(this.axis.c.domain).range(this.axis.c.range)
        }
    }

    render() {
        let scale = this.scale;
        let svg = d3.select(`#${this.rootId}`)
            .append("g")
            .attr("id", `${this.rootId}-g`)
            .attr("transform", `translate(${this.padding.left}, ${this.padding.top})`)


        let boxplot = svg.selectAll(".boxplot")
            .data(this.data)
            .enter()
        boxplot.exit().remove()
        boxplot
            .append("g")
            .merge(boxplot)
            .attr("transform", d => `translate(${scale.x(d.title)}, 0)`)
            .each(function (d) {
                const arr = d.data.map(function (g) {
                    return g.y;
                })
                const arr_sorted = arr.sort(d3.ascending)
                const min = d3.min(arr);
                const max = d3.max(arr);
                const q1 = d3.quantile(arr_sorted, .25);
                const q3 = d3.quantile(arr_sorted, .75);
                const iqr = q3 - q1; // interquartile range
                const r0 = Math.max(min, q1 - (iqr * 1.5));
                const r1 = Math.min(max, q3 + (iqr * 1.5));

                let stats = {
                    q1: q1,
                    median: d3.quantile(arr_sorted, .5),
                    q3: q3,
                    min: r0,
                    max: r1
                }


                // rectangle for the main box
                const bandWidth = scale.x.bandwidth();

                d.data.forEach(e => e.jitter = Math.random() * bandWidth)
                d3.select(this).selectAll("circle")
                    .data(d.data)
                    .enter()
                    .append("circle")
                    .attr("cx", e => e.jitter)
                    .attr("cy", e => scale.y(e.y))
                    .attr("r", e => e.r)
                    .attr("fill", "#e2e2e2")
                    .attr("stroke", scale.c(d.data[0].c))
                    .attr("stroke-width", .15)

                d3.select(this).append("line")
                    .attr("x1", bandWidth / 2)
                    .attr("x2", bandWidth / 2)
                    .attr("y1", scale.y(stats.min))
                    .attr("y2", scale.y(stats.max))
                    .style("stroke", scale.c(d.data[0].c))

                d3.select(this)
                    .append("rect")
                    .attr("x", 0)
                    .attr("y", scale.y(stats.q3))
                    .attr("height", scale.y(stats.q1) - scale.y(stats.q3))
                    .attr("width", bandWidth)
                    .style("stroke", scale.c(d.data[0].c))
                    .style("fill", scale.c(d.data[0].c))
                    .style("fill-opacity", .25)

                // Show the median
                d3.select(this)
                    .append("line")
                    .attr("x1", 0)
                    .attr("x2", bandWidth)
                    .attr("y1", scale.y(stats.median))
                    .attr("y2", scale.y(stats.median))
                    .style("stroke", scale.c(d.data[0].c))

            })
        this._axis()
        this._title()
    }

    _axis() {
        let svg = d3.select(`#${this.rootId}-g`)
        let offset = 10;
        const self = this;
        if (self.axis.x.display) {
            const labels = this.axis?.f?.lineage;
            const x = d3.axisBottom()
                .scale(self.scale.x)


            let xaxis = svg.append("g").attr("class", "axis axis-x")
                .attr("transform", `translate(0,${self.dimension.innerHeight})`)
                .call(x)


            xaxis.selectAll("text")
                .attr("text-anchor", "end")
                .attr("transform", "translate(-5, 0)rotate(-30)")
                .filter(d => d === "")
                .html("all")
            xaxis.selectAll("line")
                .attr("y1", -self.dimension.innerHeight)

            if (labels && labels.length > 0) {
                let sp = xaxis.selectAll('text')
                sp.append('title')
                    .text(function (d) {
                        const found = _.findWhere(labels, {title: d});
                        if (found && found.lin) {
                            return found.lin.toUpperCase();
                        }
                        return "";
                    });
            }


            xaxis.selectAll(".domain").remove()
        }

        if (this.axis.y.display) {
            const y = d3.axisLeft()
                .scale(this.scale.y)
                .ticks(2)

            let yaxis = svg.append("g").attr("class", "axis axis-y")
                .attr("transform", `translate(0,0)`)
                .call(y)
            yaxis.selectAll("line")
                .attr("x2", this.dimension.innerWidth)

            yaxis.selectAll(".domain").remove()
            if (!this.axis.y.ticks) {
                yaxis.selectAll("text").remove()
            }

            yaxis
                .append("line")
                .attr("x1", -5)
                .attr("x2", this.dimension.innerWidth + 5)
                .attr("y1", this.scale.y(this.axis.y.threshold))
                .attr("y2", this.scale.y(this.axis.y.threshold))
                .attr("class", "dashed")
        }

        svg.append("rect")
            .attr("x", 0)
            .attr("y", -offset)
            .attr("width", this.dimension.innerWidth)
            .attr("height", this.dimension.innerHeight + (offset))
            .attr("fill", "none")
            .attr("class", "plot-borderbox")
    }

    _title() {
        const tool_tip = this.data[0].data[0].tt;
        let svg = d3.select(`#${this.rootId}`)
        svg.append("text")
            .attr("class", "plot-title")
            .attr("x", this.padding.left)
            .attr("y", -this.padding.top / 2)
            .attr("dy", 14)
            .html(this.title).append('title')
            .text(function () {
                if(tool_tip) {
                    return tool_tip.toUpperCase();
                }else{
                    return "";
                }
            });

        // < title
        // className = "small-title" > GALLBLADDER_ADENOCARCINOMA < /title>
    }

}


// // Copyright 2021 Observable, Inc.
// // Released under the ISC license.
// // https://observablehq.com/@d3/box-plot
// function BoxPlot(data, {
//     x = ([x]) => x, // given d in data, returns the (quantitative) x-value
//     y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
//     width = 640, // outer width, in pixels
//     height = 400, // outer height, in pixels
//     marginTop = 20, // top margin, in pixels
//     marginRight = 30, // right margin, in pixels
//     marginBottom = 30, // bottom margin, in pixels
//     marginLeft = 40, // left margin, in pixels
//     inset = 0.5, // left and right inset
//     insetLeft = inset, // inset for left edge of box, in pixels
//     insetRight = inset, // inset for right edge of box, in pixels
//     xType = d3.scaleLinear, // type of x-scale
//     xDomain, // [xmin, xmax]
//     xRange = [marginLeft, width - marginRight], // [left, right]
//     yType = d3.scaleLinear, // type of y-scale
//     yDomain, // [ymin, ymax]
//     yRange = [height - marginBottom, marginTop], // [bottom, top]
//     thresholds = width / 40, // approximative number of thresholds
//     stroke = "currentColor", // stroke color of whiskers, median, outliers
//     fill = "#ddd", // fill color of boxes
//     jitter = 4, // amount of random jitter for outlier dots, in pixels
//     xFormat, // a format specifier string for the x-axis
//     yFormat, // a format specifier string for the y-axis
//     xLabel, // a label for the x-axis
//     yLabel // a label for the y-axis
//   } = {}) {
//     // Compute values.
//     const X = d3.map(data, x);
//     const Y = d3.map(data, y);

//     // Filter undefined values.
//     const I = d3.range(X.length).filter(i => !isNaN(X[i]) && !isNaN(Y[i]));

//     // Compute the bins.
//     const B = d3.bin()
//         .thresholds(thresholds)
//         .value(i => X[i])(I)
//       .map(bin => {
//         const y = i => Y[i];
//         const min = d3.min(bin, y);
//         const max = d3.max(bin, y);
//         const q1 = d3.quantile(bin, 0.25, y);
//         const q2 = d3.quantile(bin, 0.50, y);
//         const q3 = d3.quantile(bin, 0.75, y);
//         const iqr = q3 - q1; // interquartile range
//         const r0 = Math.max(min, q1 - iqr * 1.5);
//         const r1 = Math.min(max, q3 + iqr * 1.5);
//         bin.quartiles = [q1, q2, q3];
//         bin.range = [r0, r1];
//         bin.outliers = bin.filter(i => Y[i] < r0 || Y[i] > r1);
//         return bin;
//       });

//     // Compute default domains.
//     if (xDomain === undefined) xDomain = [d3.min(B, d => d.x0), d3.max(B, d => d.x1)];
//     if (yDomain === undefined) yDomain = [d3.min(B, d => d.range[0]), d3.max(B, d => d.range[1])];

//     // Construct scales and axes.
//     const xScale = xType(xDomain, xRange).interpolate(d3.interpolateRound);
//     const yScale = yType(yDomain, yRange);
//     const xAxis = d3.axisBottom(xScale).ticks(thresholds, xFormat).tickSizeOuter(0);
//     const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);

//     const svg = d3.create("svg")
//         .attr("width", width)
//         .attr("height", height)
//         .attr("viewBox", [0, 0, width, height])
//         .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

//     svg.append("g")
//         .attr("transform", `translate(${marginLeft},0)`)
//         .call(yAxis)
//         .call(g => g.select(".domain").remove())
//         .call(g => g.selectAll(".tick line").clone()
//             .attr("x2", width - marginLeft - marginRight)
//             .attr("stroke-opacity", 0.1))
//         .call(g => g.append("text")
//             .attr("x", -marginLeft)
//             .attr("y", 10)
//             .attr("fill", "currentColor")
//             .attr("text-anchor", "start")
//             .text(yLabel));

//     const g = svg.append("g")
//       .selectAll("g")
//       .data(B)
//       .join("g");

//     g.append("path")
//         .attr("stroke", stroke)
//         .attr("d", d => `
//           M${xScale((d.x0 + d.x1) / 2)},${yScale(d.range[1])}
//           V${yScale(d.range[0])}
//         `);

//     g.append("path")
//         .attr("fill", fill)
//         .attr("d", d => `
//           M${xScale(d.x0) + insetLeft},${yScale(d.quartiles[2])}
//           H${xScale(d.x1) - insetRight}
//           V${yScale(d.quartiles[0])}
//           H${xScale(d.x0) + insetLeft}
//           Z
//         `);

//     g.append("path")
//         .attr("stroke", stroke)
//         .attr("stroke-width", 2)
//         .attr("d", d => `
//           M${xScale(d.x0) + insetLeft},${yScale(d.quartiles[1])}
//           H${xScale(d.x1) - insetRight}
//         `);

//     g.append("g")
//         .attr("fill", stroke)
//         .attr("fill-opacity", 0.2)
//         .attr("stroke", "none")
//         .attr("transform", d => `translate(${xScale((d.x0 + d.x1) / 2)},0)`)
//       .selectAll("circle")
//       .data(d => d.outliers)
//       .join("circle")
//         .attr("r", 2)
//         .attr("cx", () => (Math.random() - 0.5) * jitter)
//         .attr("cy", i => yScale(Y[i]));

//     svg.append("g")
//         .attr("transform", `translate(0,${height - marginBottom})`)
//         .call(xAxis)
//         .call(g => g.append("text")
//             .attr("x", width)
//             .attr("y", marginBottom - 4)
//             .attr("fill", "currentColor")
//             .attr("text-anchor", "end")
//             .text(xLabel));

//     return svg.node();
//   }
