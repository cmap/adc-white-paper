import * as d3 from "d3";

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
            y: d3.scaleLinear().domain([this.axis.y.min, this.axis.y.max]).range([this.dimension.innerHeight, 0])
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
                    .attr("fill", e=> e.color.pt)
                    .attr("stroke", e=> e.color.pt)
                    .attr("stroke-width", .15)
                    .attr("fill-opacity", 0.75)

                d3.select(this).append("line")
                    .attr("x1", bandWidth / 2)
                    .attr("x2", bandWidth / 2)
                    .attr("y1", scale.y(stats.min))
                    .attr("y2", scale.y(stats.max))
                    .attr("stroke", d.data[0].color.box)

                d3.select(this)
                    .append("rect")
                    .attr("x", 0)
                    .attr("y", scale.y(stats.q3))
                    .attr("height", scale.y(stats.q1) - scale.y(stats.q3))
                    .attr("width", bandWidth)
                    .style("stroke", d.data[0].color.box)
                    .style("fill", d.data[0].color.box)
                    .style("fill-opacity", .25)

                // Show the median
                d3.select(this)
                    .append("line")
                    .attr("x1", 0)
                    .attr("x2", bandWidth)
                    .attr("y1", scale.y(stats.median))
                    .attr("y2", scale.y(stats.median))
                    .style("stroke", d.data[0].color.box)

            })
        // this._axis()
        // this._title()
    }

    // _axis() {
    //     let svg = d3.select(`#${this.rootId}-g`)
    //     let offset = 10;
    //     const self = this;
    //     if (self.axis.x.display) {
    //         const labels = this.axis?.f?.lineage;
    //         const x = d3.axisBottom()
    //             .scale(self.scale.x)


    //         let xaxis = svg.append("g").attr("class", "axis axis-x")
    //             .attr("transform", `translate(0,${self.dimension.innerHeight})`)
    //             .call(x)


    //         xaxis.selectAll("text")
    //             .attr("text-anchor", "end")
    //             .attr("transform", "translate(-5, 0)rotate(-30)")
    //             .filter(d => d === "")
    //             .html("all")
    //         xaxis.selectAll("line")
    //             .attr("y1", -self.dimension.innerHeight)

    //         if (labels && labels.length > 0) {
    //             let sp = xaxis.selectAll('text')
    //             sp.append('title')
    //                 .text(function (d) {
    //                     const found = _.findWhere(labels, {title: d});
    //                     if (found && found.lin) {
    //                         return found.lin.toUpperCase();
    //                     }
    //                     return "";
    //                 });
    //         }


    //         xaxis.selectAll(".domain").remove()
    //     }

    //     if (this.axis.y.display) {
    //         const y = d3.axisLeft()
    //             .scale(this.scale.y)
    //             .ticks(2)

    //         let yaxis = svg.append("g").attr("class", "axis axis-y")
    //             .attr("transform", `translate(0,0)`)
    //             .call(y)
    //         yaxis.selectAll("line")
    //             .attr("x2", this.dimension.innerWidth)

    //         yaxis.selectAll(".domain").remove()
    //         if (!this.axis.y.ticks) {
    //             yaxis.selectAll("text").remove()
    //         }

    //         yaxis
    //             .append("line")
    //             .attr("x1", -5)
    //             .attr("x2", this.dimension.innerWidth + 5)
    //             .attr("y1", this.scale.y(this.axis.y.threshold))
    //             .attr("y2", this.scale.y(this.axis.y.threshold))
    //             .attr("class", "dashed")
    //     }

    //     svg.append("rect")
    //         .attr("x", 0)
    //         .attr("y", -offset)
    //         .attr("width", this.dimension.innerWidth)
    //         .attr("height", this.dimension.innerHeight + (offset))
    //         .attr("fill", "none")
    //         .attr("class", "plot-borderbox")
    // }

    // _title() {
    //     const tool_tip = this.data[0].data[0].tt;
    //     let svg = d3.select(`#${this.rootId}`)
    //     svg.append("text")
    //         .attr("class", "plot-title")
    //         .attr("x", this.padding.left)
    //         .attr("y", -this.padding.top / 2)
    //         .attr("dy", 14)
    //         .html(this.title).append('title')
    //         .text(function () {
    //             if(tool_tip) {
    //                 return tool_tip.toUpperCase();
    //             }else{
    //                 return "";
    //             }
    //         });

    //     // < title
    //     // className = "small-title" > GALLBLADDER_ADENOCARCINOMA < /title>
    // }

}

