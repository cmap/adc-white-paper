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
        if (!this.axis.series){ this.axis.series = { } }
        if (!this.axis.x){ this.axis.x = { } }
        if (!this.axis.y){ this.axis.y = { } }
        if (!this.axis.y.ticks){ this.axis.y.ticks = 5 }
      
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
        this.display = config.display;
        if (!this.display){ this.display = { title: true, legend: false, xAxisTitle: true, yAxisTitle: true } }

        this.updateDimensions(); 
        this.renderPlot();

    }
    updateDimensions() {
        this.dimension.innerWidth = this.dimension.width - this.padding.left - this.padding.right;
        this.dimension.innerHeight = this.dimension.height - this.padding.top - this.padding.bottom;
    }
  
    renderPlot(){
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

    self.scale.x = d3.scaleLinear()
    .domain( d3.extent(this.data, function(d) { return d.bin }) )   
    .range([0, self.dimension.innerWidth]);

    // set the parameters for the histogram
    this.histogram = d3.bin()
    .value(function(d) { return +d.bin; })   // I need to give the vector of value
    .domain(self.scale.x.domain())  // then the domain of the graphic
    .thresholds(self.scale.x.ticks(70)); // then the numbers of bins

    // And apply this function to data to get the bins
    let bins = this.histogram(this.data);


    // Y axis: scale and draw:
    self.scale.y = d3.scaleLinear()
    .domain([0, d3.max(bins, function(d) { return d.length; })])
    .range([this.dimension.innerHeight, 0]);

    plot.append("g")
    .attr("transform", "translate(0," + self.dimension.innerHeight + ")")
    .call(d3.axisBottom(self.scale.x));

    plot.append("g")
    .call(d3.axisLeft(self.scale.y));

        if (this.display.xAxisTitle){
            d3.select(`#${this.rootId}-svg`)
            .append("text")
            .attr("class", "axis-title")
            .attr("x", this.dimension.width/2)
            .attr("text-anchor", "middle")
            .attr("y",  this.dimension.height)
            .attr("dy", "-1em")
            .html(this.axis.x.title)
        }
        if (this.display.yAxisTitle){
            d3.select(`#${this.rootId}-svg`)
            .append("text")
            .attr("class", "axis-title")
            .attr("transform", `translate(${0},${ this.dimension.height/2})rotate(-90)`)
            .attr("dy", "1.5em")
            .attr("text-anchor", "middle")
            .html(this.axis.y.title)
        }
        if (this.display.title){
            d3.select(`#${this.rootId}-svg`)
            .append("text")
            .attr("class", "plot-title")
            .attr("x", this.dimension.width/2)
            .attr("y", 0)
            .attr("text-anchor", "middle")
            .attr("dy",  "2em")
            .html(this.title)
        }
        if (this.display.threshold){
            plot.append("line")
            .attr("x1", self.scale.x(self.display.threshold))
            .attr("x2",  self.scale.x(self.display.threshold))
            .attr("y1", 0)
            .attr("y2", self.dimension.innerHeight)
            .attr("class", "dashed")
        }
        this.update()
    }
    setBarColor(bins){
        const self = this;
        if (this.axis.c.colorByThreshold){
            this.scale.c = d3.scaleOrdinal().domain(this.axis.c.domain).range(this.axis.c.range);
            bins.forEach(d=>{
                if (d.x1 <= self.display.threshold){
                    d.c = self.scale.c(self.axis.c.domain[0])
                } else {
                    d.c = self.scale.c(self.axis.c.domain[1])
                }
            })
        } else {
            bins.forEach(d=>{
            d.c = "blue"
            })
        }
    }
    update(){
    const self = this;
    let plot =  d3.select(`#${self.rootId}-g`)
    let bins = self.histogram(this.data);
    this.setBarColor(bins);
     // append the bar rectangles to the plot element
    let bar = plot.selectAll("rect")
     .data(bins)

     bar.exit().remove()
     bar
         .enter()
         .append("rect")
         .merge(bar)
         .attr("x", 1)
         .attr("transform", function(d) { return "translate(" + self.scale.x(d.x0) + "," + self.scale.y(d.length) + ")"; })
         .attr("width", function(d) { return self.scale.x(d.x1) - self.scale.x(d.x0) -1 ; })
         .attr("height", function(d) { return self.dimension.innerHeight - self.scale.y(d.length); })
         .style("fill", d=> self.scale.c(d.c))
    }
}