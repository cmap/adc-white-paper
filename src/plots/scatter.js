import * as d3 from "d3";
import * as plotUtils from '@/js/utils/plot-utils.js';


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
        rootId, 
        data,
        config,
        states
    ) { 
        this.rootId = rootId;
        this.data = data.sort((a,b)=> d3.ascending(a.c, b.c));
        this.states = states; // make defaults for this.......
        if (config.hasOwnProperty("title")){ this.title = config.title } else { this.title = "" }
        if (config.hasOwnProperty("axis")){ this.axis = config.axis } else { this.axis = { } }
        if (!this.axis.hasOwnProperty("x")){ this.axis.x = { } }
        if (!this.axis.hasOwnProperty("y")){ this.axis.y = { } }
        if (!this.axis.x.hasOwnProperty("title")){ this.axis.x.title = "X" }
        if (!this.axis.y.hasOwnProperty("title")){ this.axis.y.title = "Y" }
        if (!this.axis.x.hasOwnProperty("ticks")){ this.axis.x.ticks = 3 }
        if (!this.axis.y.hasOwnProperty("ticks")){ this.axis.y.ticks = 3 }
        if (!this.axis.x.hasOwnProperty("threshold")){ this.axis.x.threshold = false } // dashed line at specified value
        if (!this.axis.y.hasOwnProperty("threshold")){ this.axis.y.threshold = false } // dashed line at specified value
        if (!this.axis.hasOwnProperty("innerPadding")){ this.axis.innerPadding = 8 } // padding between axis/scatter points and edge of plot
        if (config.hasOwnProperty("scale")){ this.scale = config.scale } else { this.scale = { } }
        // handle scale here???
        if (config.hasOwnProperty("padding")){ this.padding = config.padding } else { this.padding = { top:20, right:20, bottom:20, left:20 } }
        if (config.hasOwnProperty("dimension")){ this.dimension = config.dimension } else { this.dimension = { width: d3.select(`#${this.rootId}`).node().clientWidth, height:  d3.select(`#${this.rootId}`).node().clientHeight } }
        if (!this.dimension.hasOwnProperty("width")){ this.dimension.width = d3.select(`#${this.rootId}`).node().clientWidth }
        if (!this.dimension.hasOwnProperty("height")){ this.dimension.height = d3.select(`#${this.rootId}`).node().clientHeight }
       
       
       console.log(this.dimension.width, this.dimension.height, this.padding.left, this.padding.right)
        this.dimension.innerWidth = this.dimension.width - this.padding.left - this.padding.right;
        this.dimension.innerHeight = this.dimension.height - this.padding.top - this.padding.bottom;
       
        if (config.hasOwnProperty("display")){ this.display = config.display } else { this.display = { } }
        if (!this.display.hasOwnProperty("xAxisTicks")){ this.display.xAxisTicks = true }
        if (!this.display.hasOwnProperty("yAxisTicks")){ this.display.yAxisTicks = true }
        if (!this.display.hasOwnProperty("xAxisTitle")){ this.display.xAxisTitle = true }
        if (!this.display.hasOwnProperty("yAxisTitle")){ this.display.yAxisTitle = true }
        if (!this.display.hasOwnProperty("legend")){ this.display.legend = false }
        if (!this.display.hasOwnProperty("title")){ this.display.title = true }
        if (!this.display.hasOwnProperty("tooltip")){ this.display.tooltip = true }

        this.tooltipConfig = config.tooltipConfig;

        this.createScale();
        this.render();

        // TO DO: create legend component????? Render legend independent of scatter plot????
        if (this.display.legend){ // requires createScale() for setting scale.c 
            this.legend = config.legend;
            this.renderLegend();
        }
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
        const getcDomain = ()=>{
            if (!this.axis.c.domain){ return [...new Set(this.data.map(d=>d.c))]}
            else { return this.axis.c.domain }
        }
        const getcExtent= ()=>{
            if (!this.axis.c.domain){  return d3.extent(this.data.map(d=>d.c))}
            else { return this.axis.c.domain }
        }
        const getColorScale = ()=>{
            if (this.axis.c.type == "sequential"){
                return d3.scaleSequential().domain(getcExtent()).interpolator(d3.interpolateYlOrRd)
            } else if (this.axis.c.type == "linear"){
                return d3.scaleLinear().domain(getcExtent()).range(this.axis.c.range)
            } else if (this.axis.c.type == "ordinal"){
                return d3.scaleOrdinal().domain(getcDomain()).range(this.axis.c.range) 
            }
        }

        if (!this.scale.x){ this.scale.x = d3.scaleLinear().domain(getxExtent()).range([this.axis.innerPadding, this.dimension.innerWidth-this.axis.innerPadding]).nice(); }
        if (!this.scale.y){ this.scale.y = d3.scaleLinear().domain(getyExtent()).range([this.dimension.innerHeight-this.axis.innerPadding, this.axis.innerPadding]).nice(); }
        if (!this.scale.c){ this.scale.c = getColorScale(); }
    }
    render(){
        const self = this;
        const container = d3.select(`#${self.rootId}`)
        // Init Svg
        container.append('svg')
        .attr('width', self.dimension.width)
        .attr('height', self.dimension.height)
        .attr('id', `${self.rootId}-svg`)
        .attr("class", "plot-svg")
        .style("position", "absolute")
        .style("top", "0px")
        .style("left", "0px")
        .append('g')
        .attr("id", `${self.rootId}-g`)
        .attr("class", "plot-g")
        .attr('transform', `translate(${self.padding.left}, ${self.padding.top})`);

        container.append('canvas')
        .attr('width', self.dimension.innerWidth)
        .attr('height', self.dimension.innerHeight)
        .style('margin-left', self.padding.left + 'px')
        .style('margin-top', self.padding.top + 'px')
        .attr("class", "plot-canvas")
        .style("position", "absolute")
        .style("top", "0px")
        .style("left", "0px")
        .attr('id', `${self.rootId}-canvasFocus`);

        container.append('canvas')
        .attr('width', self.dimension.innerWidth)
        .attr('height', self.dimension.innerHeight)
        .style('margin-left', self.padding.left + 'px')
        .style('margin-top', self.padding.top + 'px')
        .attr("class", "plot-canvas")
        .style("position", "absolute")
        .style("top", "0px")
        .style("left", "0px")
        .style("pointer-events", "none")
        .attr('id', `${self.rootId}-canvasSelections`);

        // Init tooltip
        container.append('div')
        .style('margin-left', self.padding.left + 'px')
        .style('margin-top', self.padding.top + 'px')
        .attr("class", "plot-tooltip")
        .attr('id', `${self.rootId}-tooltip`)
        .style("opacity", 0);

        this.renderAxis()
        this.renderFocus(); 
        if (this.display.title){ plotUtils.plotTitle(this) }
    }
    renderContext(){
        const self = this;
        const canvas = d3.select(`#${self.rootId}-canvasContext`)
        const ctx = canvas.node().getContext('2d');
        let data = this.data;

        data.forEach(point => {
            ctx.globalAlpha = 0.7;
            ctx.beginPath();
            ctx.strokeStyle = "white";
            ctx.lineWidth = 0.15;
            ctx.fillStyle = "#e2e2e2";
            const px = self.scale.x(point.x);
            const py =  self.scale.y(point.y);
            const pr =  point.r;
            ctx.arc(px, py, pr, 0, 2 * Math.PI, true);
            ctx.fill();
            ctx.stroke();
        });
    }

    renderFocus(){ // aka: render highlights 
        const self = this;
        const canvas = d3.select(`#${self.rootId}-canvasFocus`)
        const ctx = canvas.node().getContext('2d');
        let data = this.data;

        data.forEach(point => {
            ctx.globalAlpha = 0.7;
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.lineWidth = 0.15;
            ctx.fillStyle = self.scale.c(point.c);
            const px = self.scale.x(point.x);
            const py =  self.scale.y(point.y);
            const pr =  point.r;
            ctx.arc(px, py, pr, 0, 2 * Math.PI, true);
            ctx.fill();
            ctx.stroke();
        });
    }
    renderSelections(){ // should input data objs from states.click + states.mouseover rather than filtering all data? or use crosfilter.js?
        const self = this;
        const canvas = d3.select(`#${self.rootId}-canvasSelections`)
        const ctx = canvas.node().getContext('2d');
        ctx.clearRect(0, 0, self.dimension.innerWidth, self.dimension.innerHeight);
        let data = this.data.filter(d=> self.states.click.includes(d.id) || self.states.mouseover == d.id)

        data.forEach(point => {
            ctx.globalAlpha = 0.7;
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
            ctx.fillStyle = self.scale.c(point.c);
            const px = self.scale.x(point.x);
            const py =  self.scale.y(point.y);
            const pr =  point.r;
            ctx.arc(px, py, pr, 0, 2 * Math.PI, true);
            ctx.fill();
            ctx.stroke();
        });

    }
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

    showTooltip(point, mouse){
        const self = this;
        const tooltip = d3.select(`#${self.rootId}-tooltip`);
        let string; 
        if (self.tooltipConfig == null){  
            string = `${point.label}<br><b>${self.axis.x.title}:</b> ${point.x}<br><b>${self.axis.y.title}:</b> ${point.y}`
        } else {
            string = '';
            self.tooltipConfig.forEach((d,i)=>{
                string += `<b>${d.label}:</b> ${point[d.field]}<br>`
            })
        }

        tooltip
        .html(string)
        .style(`top`, `${mouse[1]-(12*6)}px`) 
        .style(`left`, `${mouse[0]+14 }px`)

        tooltip.transition().duration(50).style("opacity", 1)
    }
    hideTooltip(){
        const self = this;
        const tooltip = d3.select(`#${self.rootId}-tooltip`);
        tooltip.transition().duration(50).style("opacity", 0)
    }   
    renderLegend(){
        const self = this;
        const domain = self.scale.c.domain();
        const radius = 6;
        const diameter = radius*3;

        this.legend.dimension = {
            width: d3.select(`#${this.legend.rootId}`).node().clientWidth,
            height: (diameter*(domain.length)) + this.legend.padding.top + this.legend.padding.bottom,
            innerWidth: d3.select(`#${this.legend.rootId}`).node().clientWidth - this.legend.padding.left - this.legend.padding.right,
            innerHeight: diameter*(domain.length)
        }

        const scale = d3.scaleBand().domain(domain).range([0, this.legend.dimension.innerHeight]).padding(.5)

        const svg = d3.select(`#${this.legend.rootId}`)
        .attr('width', self.legend.dimension.width)
        .attr('height', self.legend.dimension.height)
            .append("g")
            .attr('transform', `translate(${self.legend.padding.left}, ${self.legend.padding.top})`);
      
            const ticks = svg.selectAll(".legend.tick")
            .data(domain)
            .enter()
            .append("g")
            .attr("class", "legend tick")
            .attr("id", (d,i)=> `legend-tick-${i}`)
            .attr('transform', d=>`translate(0, ${scale(d)})`)
            .each(function(d){
                d3.select(this).append("circle")
                .attr("cx", 0)
                .attr("cy", 0)
                .attr("r", radius)
                .attr("fill", self.scale.c(d))

                d3.select(this).append("text")
                .text(d)
                .attr("y", radius/ 2)
                .attr("x", radius *2)
                .attr("text-anchor", "start")
                .style("font-size", "14px")

            })
            
    }

}