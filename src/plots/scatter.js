import * as d3 from "d3";
import * as helpers from '@/js/utils/helpers.js';
import { get } from "underscore";
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
        this.tooltipConfig = config.tooltipConfig;
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

     //   this.renderContext(); // should return a canvas, then use set it to render 'on screen' 
        // this.renderFocus(); 

        if (this.display.legend){ // requires createScale() for setting scale.c 
            this.legend = config.legend;
            this.renderLegend();
        }
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

        const getRRange = ()=>{
            if (self.innerWidth > 50){ return [7,7]} 
            else { return [3,3]}
        }

        let offsetRadius = getRRange()[1];

        if (!this.scale.r){ this.scale.r = d3.scaleSqrt().domain(d3.extent(self.data.map(d=>d.r))).range(getRRange()) }
        if (!this.scale.x){ this.scale.x = d3.scaleLinear().domain(getxExtent()).range([offsetRadius, this.dimension.innerWidth-offsetRadius]).nice(); }
        if (!this.scale.y){ this.scale.y = d3.scaleLinear().domain(getyExtent()).range([this.dimension.innerHeight-offsetRadius, offsetRadius]).nice();}
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
        .attr('id', `${self.rootId}-canvasFocus`);

        container.append('canvas')
        .attr('width', self.dimension.innerWidth)
        .attr('height', self.dimension.innerHeight)
        .style('margin-left', self.padding.left + 'px')
        .style('margin-top', self.padding.top + 'px')
        .attr("class", "plot-canvas")
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
        if (this.display.title){  this.renderTitle() }
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
            ctx.lineWidth = 0.25;
            ctx.fillStyle = "#e2e2e2";
            const px = self.scale.x(point.x);
            const py =  self.scale.y(point.y);
            const pr =  self.scale.r(point.r);
            ctx.arc(px, py, pr, 0, 2 * Math.PI, true);
            ctx.fill();
            ctx.stroke();
        });
    }

    renderFocus(){ // aka: render highlights 
        console.log("render focus")
        const self = this;
        const canvas = d3.select(`#${self.rootId}-canvasFocus`)
        const ctx = canvas.node().getContext('2d');
        let data = this.data;

        data.forEach(point => {
            ctx.globalAlpha = 0.7;
            ctx.beginPath();
            ctx.strokeStyle = "white";
            ctx.lineWidth = 0.25;
            ctx.fillStyle = self.scale.c(point.c);
            const px = self.scale.x(point.x);
            const py =  self.scale.y(point.y);
            const pr =  self.scale.r(point.r);
            ctx.arc(px, py, pr, 0, 2 * Math.PI, true);
            ctx.fill();
            ctx.stroke();
        });
    }
    renderSelections(){ // should input data objs from states.click + states.mouseover rather than filtering all data? or use crosfilter.js?
        console.log("render selections")
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
            const pr =  self.scale.r(point.r);
            ctx.arc(px, py, pr, 0, 2 * Math.PI, true);
            ctx.fill();
            ctx.stroke();
        });

    }
    renderAxis(){
        const svg = d3.select(`#${this.rootId}-g`),
        tickPadding = 2.5,
        self = this;

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
        // svg.selectAll(".axis.x .tick line").attr("y1", -self.dimension.innerHeight)


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
            .attr("dy", "-1.25em")
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
                .attr("dy", "2em")
            .attr("text-anchor", "middle")
            .html(this.axis.y.title)
        }
    }
    renderTitle(){
        const plot = d3.select(`#${this.rootId}`)
        plot
            .append("div")
            .style("width", `${this.dimension.width}px`)
            .attr("class", "plot-title")
            .style("position", "absolute")
            .style("top", 0)
            .style("left", `${this.padding.left/4}px`)
            .style("text-align", "center")
            .html(this.title)
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