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
        config
    ) { 
        this.data = config.data;
        this.title = config.title;
        this.axis = config.axis;
        this.rootId = config.rootId;
        this.dimension = config.dimension; 
        this.padding = config.padding;    
    

        this.updateDimensions(); 
        this.createScale();
        this.render()

    }
   

    updateDimensions() {
        this.dimension.innerWidth = this.dimension.width - this.padding.left - this.padding.right;
        this.dimension.innerHeight = this.dimension.height - this.padding.top - this.padding.bottom;
    }
    createScale(){
        if (!this.axis.x){
            this.axis.x = { },
            this.axis.y = { }
        }

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
            color: d3.scaleLinear().domain(d3.extent(this.data.map(d=>d.color))).range(this.axis.color.range)
        }
    }
    render(){
        const scale = this.scale;
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
                .attr("r", d=>d.r/2)
                .attr("fill", d=> this.scale.color(d.color))
                // .attr("stroke-width", .25)
                // .attr("stroke", "black")
                .attr("opacity", .5)
        
       


  // compute the density data
  var densityData = d3.contourDensity()
    .x( d=> scale.x(d.x) )   // x and y = column name in .csv input data
    .y( d=> scale.y(d.y) )   
    .size([this.dimension.innerWidth, this.dimension.innerHeight])
    .bandwidth(3)    // smaller = more precision in lines = more lines
    (this.data)

  // Add the contour: several "path"
  svg
    .selectAll(".dentisy-path")
    .data(densityData)
    .enter()
    .append("path")
    .attr("class", "density-path")
      .attr("d", d3.geoPath())
      .attr("fill", "rgba(170,170,220,.15")
      .attr("stroke", "rgba(170,170,230,1")
    //   .attr("stroke", "#69b3a2")
    //   .attr("stroke-linejoin", "round")



        this._axis()
        this._title()



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

            tickPadding = 15;

        const renderAxisX=()=>{
            const x = d3.axisBottom()
                .scale(this.scale.x)   
                .ticks(5)
                .tickPadding(tickPadding)
               .tickSizeInner(-this.dimension.innerHeight);

            const x_axis = svg.append("g").attr("class", "axis axis-x")
                .attr("transform", `translate(0,${this.dimension.innerHeight})`)
                .call(x)

                svg.append("text")
                    .attr("class", "axis-label")
                    .attr("x", this.dimension.innerWidth/2)
                    .attr("y",  this.dimension.innerHeight)
                    .attr("dy", "2.6em")
                    .attr("text-anchor", "middle")
                    .html(this.axis.x.title)
            
        }
        const renderAxisY=()=>{
            const y = d3.axisLeft(this.scale.y) 
                   .ticks(5) 
                .tickPadding(tickPadding)
                .tickSize(-this.dimension.innerWidth)

            const y_axis = svg.append("g").attr("class", "axis axis-y")
                .attr("transform", `translate(0,0)`)
                .call(y)

         
                svg.append("text")
                .attr("class", "axis-label")
                .attr("transform", `translate(${-this.padding.left},${ this.dimension.innerHeight/2})rotate(-90)`)
                .attr("dy", "3em")
                .attr("text-anchor", "middle")
                .html(this.axis.y.title)

        }
        renderAxisX()
        renderAxisY()



    }
    _title(){
        const svg = d3.select(`#${this.rootId}-g`)

        svg
            .append("text")
            .attr("class", "plot-title")
            .attr("transform", `translate(${this.dimension.innerWidth/2}, 0)`)
            .attr("dy", -14)
            .attr("text-anchor", "middle")
            .html(this.title)
  
    }
//     _legend(){

//     const svg = d3.select(`#${this.rootId}-g`),
//         colorScale = this.scale.c,
//         legend = svg.append("g").attr("id", "legend"),
//         scale = d3.scaleBand().domain(colorScale.domain());
//         let ticks, axis;

//     if (this.display.legend == "vertical"){

//         scale.range([this.dimension.innerHeight, 0])
//         axis = d3.axisRight().scale(scale)   
//         legend.attr("transform", `translate(${this.dimension.width - this.padding.left},0)`)
//         legend.append("g").attr("class", "legend-axis")
//             .attr("transform", `translate(0,10)`)
//             .call(axis)

//             legend.append("text")
//                 .attr("x", 0)
//                 .attr("y", 0)
//                 .attr("class", "legend-ui")
//                 .html("Select dose to filter")

//         ticks = legend.selectAll(".tick")
//         ticks.selectAll("text").attr("x", 10)
  
//     } else if (this.display.legend == "horizontal"){
//         scale.range([0, this.dimension.innerWidth])
//         axis = d3.axisBottom().scale(scale)   

//         legend.attr("transform", `translate(0,${this.dimension.height - this.padding.bottom + 60})`)
//         legend.append("text")
//         .attr("x", scale.bandwidth()/4)
//             .attr("class", "legend-ui")
//             .html("Select dose to filter")

//          legend.append("g").attr("class", "legend-axis").attr("transform", `translate(0,20)`)
//             .call(axis) 

//         ticks = legend.selectAll(".tick")
//         ticks.selectAll("text").attr("y", 5)
//             .attr("x", -5)
//             .attr("dy", "1em")
//             .attr("transform", "rotate(-30)")
//             .style("text-anchor", "end");
//     }
//     let r = scale.bandwidth()/4;
//     if (r >8){ r = 8}
//     ticks = legend.selectAll(".tick")
//         ticks
//         .append("circle")
//         .attr("cx", 0)
//         .attr("cy", 0)
//         .attr("fill", (d)=> colorScale(d))
//         .attr("r", r)
//    legend.selectAll(".domain").remove()
                
//     }
}

