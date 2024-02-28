import * as d3 from "d3";


export default class histogram {
    constructor(
        rootId, 
        data,
        config,
        states
    ) {
        this.rootId = rootId;
        this.data = data.sort((a,b)=> d3.ascending(a.y, b.y));
        this.states = states;
        this.title = config.title;
        this.axis = config.axis;
        if (!this.axis.x){ this.axis.x = { } }
        if (!this.axis.y){ this.axis.y = { } }
        if (!this.axis.x.ticks){ this.axis.x.ticks = 3 }
        if (!this.axis.y.ticks){ this.axis.y.ticks = 3 }
        if (!this.axis.x.threshold){ this.axis.x.threshold = false }
        if (!this.axis.y.threshold){ this.axis.y.threshold = false }
        this.scale = config.scale;
        if (!this.scale){ this.scale = { } }
        this.dimension = config.dimension; 
        if (!this.dimension){
            this.dimension = {
                width: d3.select(`#${this.rootId}`).node().clientWidth,
                height:  d3.select(`#${this.rootId}`).node().clientHeight
            }
        }
        this.padding = config.padding;    
        if (!this.padding){ this.padding = { top:20, right:20, bottom:20, left:20 } }
        this.display = config.display
        if (!this.display){ this.display = { title: true, legend: false, xAxisTitle: true, yAxisTitle: true, xAxisTicks: true, yAxisTicks: true } }
    

        this.updateDimensions(); 
        this.createScale();
        this.render();

    }
    updateDimensions() {
        this.dimension.innerWidth = this.dimension.width - this.padding.left - this.padding.right;
        this.dimension.innerHeight = this.dimension.height - this.padding.top - this.padding.bottom;
    }
    createScale(){
        const self = this;
        const getxExtent = ()=>{
            if (!this.axis.x.domain){ return d3.extent(this.data.map(d=>d.x))}
            else { return this.axis.x.domain }
        }
        const getyExtent = ()=>{
            if (!this.axis.y.domain){ return d3.extent(this.data.map(d=>d.y))}
            else { return this.axis.y.domain }
        }
        if (!this.scale.x){ this.scale.x = d3.scaleLinear().domain(getxExtent()).range([0, this.dimension.innerWidth]).nice(); }
        if (!this.scale.y){ this.scale.y = d3.scaleLinear().domain(getyExtent()).range([this.dimension.innerHeight, 0]).nice(); }

    }
  
    render(){
        const self = this;
        const container = d3.select(`#${self.rootId}`)

        let plot = container.append('svg')
        .attr('width', self.dimension.width)
        .attr('height', self.dimension.height)
        .attr('id', `${self.rootId}-svg`)
        .append('g')
        .attr("id", `${self.rootId}-g`)
        .attr("class", "plot-g")
        .attr('transform', `translate(${self.padding.left}, ${self.padding.top})`);

        this.renderAxis()
        this.update()
    }
    // plot.append("g")
    // .attr("transform", "translate(0," + self.dimension.innerHeight + ")")
    // .call(d3.axisBottom(self.scale.x));

    // plot.append("g")
    // .call(d3.axisLeft(self.scale.y));

    //     if (this.display.xAxisTitle){
    //         d3.select(`#${this.rootId}-svg`)
    //         .append("text")
    //         .attr("class", "axis-title")
    //         .attr("x", this.dimension.width/2)
    //         .attr("text-anchor", "middle")
    //         .attr("y",  this.dimension.height)
    //         .attr("dy", "-1em")
    //         .html(this.axis.x.title)
    //     }
    //     if (this.display.yAxisTitle){
    //         d3.select(`#${this.rootId}-svg`)
    //         .append("text")
    //         .attr("class", "axis-title")
    //         .attr("transform", `translate(${0},${ this.dimension.height/2})rotate(-90)`)
    //         .attr("dy", "1.5em")
    //         .attr("text-anchor", "middle")
    //         .html(this.axis.y.title)
    //     }
    //     if (this.display.title){
    //         d3.select(`#${this.rootId}-svg`)
    //         .append("text")
    //         .attr("class", "plot-title")
    //         .attr("x", this.dimension.width/2)
    //         .attr("y", 0)
    //         .attr("text-anchor", "middle")
    //         .attr("dy",  "2em")
    //         .html(this.title)
    //     }
    renderAxis(){
        const self = this,
        svg = d3.select(`#${this.rootId}-g`),
        tickPadding = 2.5;

        const y = d3.axisLeft(this.scale.y) 
        .ticks(this.axis.y.ticks)
        .tickPadding(tickPadding)

        svg.append("g")
        .attr("class", "axis y")
        .attr("transform", `translate(0,0)`)
        .call(y)

        const x = d3.axisBottom()
        .scale(this.scale.x)   
        .ticks(this.axis.x.ticks)
        .tickPadding(tickPadding)

        svg.append("g")
        .attr("class", "axis x")
        .attr("transform", `translate(0,${this.dimension.innerHeight})`)
        .call(x)

        svg.selectAll(".axis.y .tick line").attr("x1", self.dimension.innerWidth);
        svg.selectAll(".domain").remove();

        if (!this.axis.x.threshold){
            svg.selectAll(".axis.x .tick line").filter(d=>d==0)
            .attr("y1", -self.dimension.innerHeight)
            .style("stroke-dasharray", "4,4")
           .style("stroke", "black")
            .style("stroke-width", "0.5px")
        }

        if (!this.display.xAxisTicks){
            svg.selectAll(".axis.x .tick text").remove()
        }
        if (this.display.xAxisTitle){
            d3.select(`#${this.rootId}-svg`)
            .append("text")
            .attr("class", "axis-title")
            .attr("x", this.dimension.width/2)
            .attr("text-anchor", "middle")
            .attr("y",  this.dimension.height)
            .attr("dy", "-1.0em")
            .html(this.axis.x.title)
        }

        if (!this.display.yAxisTicks){
            svg.selectAll(".axis.y .tick text").remove()
        }
        if (this.display.yAxisTitle){
            d3.select(`#${this.rootId}-svg`)
            .append("text")
            .attr("class", "axis-title")
            .attr("transform", `translate(${0},${ this.dimension.height/2})rotate(-90)`)
            .attr("dy", "1.0em")
            .attr("text-anchor", "middle")
            .html(this.axis.y.title)
        }
    }
    update(){
    const self = this;
    let plot =  d3.select(`#${self.rootId}-g`)
    let bar = plot.selectAll("rect")
     .data(self.data)

     bar.exit().remove()
     bar
         .enter()
         .append("rect")
         .merge(bar)
         .attr("x", 1)
         .attr("transform", function(d) { return "translate(" + self.scale.x(d.x0) + "," + self.scale.y(d.length) + ")"; })
         .attr("width", function(d) { return self.scale.x(d.x1) - self.scale.x(d.x0) -1 ; })
         .attr("height", function(d) { return self.dimension.innerHeight - self.scale.y(d.length); })
         .style("fill", d=> "#e2e2e2")
    }
}