import * as d3 from "d3";
// import $ from "jquery";

d3.selection.prototype.moveToFront = function() {
    return this.each(function(){
      this.parentNode.appendChild(this);
    });
  };

  d3.selection.prototype.moveToBack = function() {  
    return this.each(function() { 
        var firstChild = this.parentNode.firstChild; 
        if (firstChild) { 
            this.parentNode.insertBefore(this, firstChild); 
        } 
    });
};


export default class scatter {
    constructor(
        data,
        title, 
        axis,
        rootId, 
        dimension = {   
            width: d3.select(`#${rootId}`).node().clientWidth, 
            height: d3.select(`#${rootId}`).node().clientHeight
        },
        padding={top: 50, right: 50, bottom:50, left:50},
        display = { legend: true, title:true, borderbox: true }
    ) { 
        this.data = data;
        this.title = title;
        this.axis = axis;
        this.rootId = rootId;
        this.dimension = dimension; 
        this.padding = padding;    
        this.display = display;

        this.updateDimensions(); 
        this.createScale();
        this.render()

    }
   

    updateDimensions() {
        this.dimension.innerWidth = this.dimension.width - this.padding.left - this.padding.right;
        this.dimension.innerHeight = this.dimension.height - this.padding.top - this.padding.bottom;
    }
    createScale(){

        const getExtent = (attr)=>{
            let max, min;
            if (this.axis[`${attr}`].max == undefined){
                max = d3.max(this.data.map(d=>d[`${attr}`]))
            } else {
                max = this.axis[`${attr}`].max
            }

            if (this.axis[`${attr}`].min == undefined){
                min = d3.min(this.data.map(d=>d[`${attr}`]))
            } else {
                min = this.axis[`${attr}`].min
            }
            return [min, max]
        }

        this.scale = {
            x: d3.scaleLinear().domain(getExtent("x")).range([0, this.dimension.innerWidth]).nice(),
            y: d3.scaleLinear().domain(getExtent("y")).range([this.dimension.innerHeight, 0]),
            c: d3.scaleOrdinal().domain(this.axis.c.domain).range(this.axis.c.range)
        }
    }
    render(){
        d3.select(`#${this.rootId}-g`).remove()
        let svg =  d3.select(`#${this.rootId}`)
            .append("g")
            .attr("id", `${this.rootId}-g`)
            .attr("class", "scatter-plot")
            .attr("transform", `translate(${this.padding.left}, ${this.padding.top})`)

        let scatterPt = svg.selectAll(".scatter-pt")
                .data(this.data)

            scatterPt.exit().remove()
            scatterPt
                .enter()
                .append("circle")
                .merge(scatterPt)
                .attr("class", "scatter-pt")
                .attr("cx", d=> this.scale.x(d.x))
                .attr("cy", d=> this.scale.y(d.y))
                .attr("r", d=>d.r)
                .attr("fill", d=> this.scale.c(d.c))
                .attr("stroke-width", .25)
                .attr("stroke", "black")
        
       
        this._axis()
        this._title()

        if (this.display.legend != false){
            this._legend()
        }

    }
    filter(filtered){
        let scatterPt = d3.select(`#${this.rootId}-g`).selectAll(".scatter-pt")
        scatterPt.classed("click", false)
        scatterPt.filter(d=> !filtered.includes(d._info.id)).classed("inactive", true)
        scatterPt.filter(d=> filtered.includes(d._info.id)).classed("inactive", false).moveToFront()
    }
    click(clicked){
        let scatterPt = d3.select(`#${this.rootId}-g`).selectAll(".scatter-pt")
        scatterPt.classed("click", false)
        scatterPt.filter(d=>clicked.includes(d._info.id)).classed("click", true).moveToFront()  
    }
    _axis(){
        const svg = d3.select(`#${this.rootId}-g`),
            offset = 10,
            tickPadding = 5;

        const renderAxisX=()=>{
            const x = d3.axisBottom()
                .scale(this.scale.x)   
                .ticks(this.axis.x.ticks)   
                .tickPadding(tickPadding)
                .tickSizeInner(-this.dimension.innerHeight - (offset*2));

            const x_axis = svg.append("g").attr("class", "axis axis-x")
                .attr("transform", `translate(0,${this.dimension.innerHeight + offset})`)
                .call(x)

                // x_axis.selectAll(".tick line")
                //     .filter(e=> e==0)
                //     .classed("dashed", true)

            if (this.axis.x.display.threshold){
                x_axis.append("line")
                .attr("x1", this.scale.x(this.axis.x.display.threshold))
                .attr("x2", this.scale.x(this.axis.x.display.threshold))
                .attr("y1", 0)
                .attr("y2", -this.dimension.innerHeight - (offset*2))
                .classed("dashed", true)
            }
            if (this.axis.x.display.tickText == false){
                x_axis.selectAll(".tick text").remove()
            }
            if (this.axis.x.display.domain == false){
                x_axis.selectAll(".domain").remove()
            }
            if (this.axis.x.display.title == true){
                svg.append("text")
                    .attr("class", "axis-label")
                    .attr("x", this.dimension.innerWidth/2)
                    .attr("y",  this.dimension.innerHeight + offset)
                    .attr("dy", "2.6em")
                    .attr("text-anchor", "middle")
                    .html(this.axis.x.title)
            }
        }
        const renderAxisY=()=>{
            const y = d3.axisLeft(this.scale.y) 
                .ticks(this.axis.y.ticks)     
                .tickPadding(tickPadding)
                .tickSize(-this.dimension.innerWidth - (offset*2))

            const y_axis = svg.append("g").attr("class", "axis axis-y")
                .attr("transform", `translate(${-offset},0)`)
                .call(y)

                if (this.axis.y.display.threshold){
                    y_axis.append("line")
                    .attr("y1", this.scale.y(this.axis.y.display.threshold))
                    .attr("y2", this.scale.y(this.axis.y.display.threshold))
                    .attr("x1", 0)
                    .attr("x2", this.dimension.innerWidth + (offset*2))
                    .classed("dashed", true)
                }
            if (this.axis.y.display.tickText == false){
                y_axis.selectAll(".tick text").remove()
            }
            if (this.axis.y.display.domain == false){
                y_axis.selectAll(".domain").remove()
            }
            if (this.axis.y.display.title == true){
                svg.append("text")
                .attr("class", "axis-label")
                .attr("transform", `translate(${-this.padding.left},${ this.dimension.innerHeight/2})rotate(-90)`)
                .attr("dy", "3em")
                .attr("text-anchor", "middle")
                .html(this.axis.y.title)
            }
        }
        renderAxisX()
        renderAxisY()

        if (this.display.borderbox == true){
            svg.append("rect")
                .attr("x", -offset)
                .attr("y", -offset)
                .attr("width", this.dimension.innerWidth+(offset*2))
                .attr("height",this.dimension.innerHeight+(offset*2))
                .attr("fill", "none")
                .attr("class", "plot-borderbox")
        }

    }
    _title(){
        const svg = d3.select(`#${this.rootId}-g`)
        if (this.display.title == true){
            svg
                .append("text")
                .attr("class", "plot-title")
                .attr("transform", `translate(${this.dimension.innerWidth/2}, 0)`)
                .attr("dy", -14)
                .attr("text-anchor", "middle")
                .html(this.title)
        }
    }
    _legend(){

    const svg = d3.select(`#${this.rootId}-g`),
        colorScale = this.scale.c,
        legend = svg.append("g").attr("id", "legend"),
        scale = d3.scaleBand().domain(colorScale.domain());
        let ticks, axis;

    if (this.display.legend == "vertical"){

        scale.range([this.dimension.innerHeight, 0])
        axis = d3.axisRight().scale(scale)   
        legend.attr("transform", `translate(${this.dimension.width - this.padding.left},0)`)
        legend.append("g").attr("class", "legend-axis")
            .attr("transform", `translate(0,10)`)
            .call(axis)

            legend.append("text")
                .attr("x", 0)
                .attr("y", 0)
                .attr("class", "legend-ui")
                .html("Select dose to filter")

        ticks = legend.selectAll(".tick")
        ticks.selectAll("text").attr("x", 10)
  
    } else if (this.display.legend == "horizontal"){
        scale.range([0, this.dimension.innerWidth])
        axis = d3.axisBottom().scale(scale)   

        legend.attr("transform", `translate(0,${this.dimension.height - this.padding.bottom + 60})`)
        legend.append("text")
        .attr("x", scale.bandwidth()/4)
            .attr("class", "legend-ui")
            .html("Select dose to filter")

         legend.append("g").attr("class", "legend-axis").attr("transform", `translate(0,20)`)
            .call(axis) 

        ticks = legend.selectAll(".tick")
        ticks.selectAll("text").attr("y", 5)
            .attr("x", -5)
            .attr("dy", "1em")
            .attr("transform", "rotate(-30)")
            .style("text-anchor", "end");
    }
    let r = scale.bandwidth()/4;
    if (r >8){ r = 8}
    ticks = legend.selectAll(".tick")
        ticks
        .append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("fill", (d)=> colorScale(d))
        .attr("r", r)
   legend.selectAll(".domain").remove()
                
    }
}

