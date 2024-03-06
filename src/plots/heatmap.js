import * as d3 from "d3";
import defaultPlotConfig from './default-plot-config.js';
import legend from './legend.js';
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


export default class heatmap extends defaultPlotConfig{
    constructor(
        rootId, 
        data,
        config,
        states
    ) { 
        super(rootId, config);
        let defaults = new defaultPlotConfig(rootId, config);
        Object.assign(defaults.getDefaults(), this );

        this.data = data;
        this.states = states;
        this.setAxisX();
        this.setAxisY();
        this.setAxisC();
        if (!this.scale.hasOwnProperty("x")){ this.scale.x = this.setScaleX() } 
        if (!this.scale.hasOwnProperty("y")){ this.scale.y = this.setScaleY() }
        if (!this.scale.hasOwnProperty("c")){ this.scale.c = this.setScaleC() }
        if (this.display.legend){ 
            this.legend = new legend(config.legend.rootId, this.axis.c, this.scale.c)
         }
         this.render();
    }
    setAxisX(){
        if (!this.axis.x.hasOwnProperty("domain")){ this.axis.x.domain = [...new Set(this.data.map(d=>d.x))] } else { this.axis.x.domain = this.axis.x.domain }
        if (!this.axis.x.hasOwnProperty("range")){ this.axis.x.range = [this.axis.innerPadding, this.dimension.innerWidth-this.axis.innerPadding] } else { this.axis.x.range = this.axis.x.range }
    }
    setAxisY(){
        if (!this.axis.y.hasOwnProperty("domain")){ this.axis.y.domain = [...new Set(this.data.map(d=>d.y))] } else { this.axis.y.domain = this.axis.y.domain }
        if (!this.axis.y.hasOwnProperty("range")){ this.axis.y.range = [this.dimension.innerHeight-this.axis.innerPadding, this.axis.innerPadding] } else { this.axis.y.range = this.axis.y.range }
    }
    setAxisC(){
        // TYPE
        if (!this.axis.c.hasOwnProperty("type")){ this.axis.c.type = "linear" } 
        // DOMAIN
        if (!this.axis.c.hasOwnProperty("domain")){ 
            if (this.axis.c.type == "ordinal"){ this.axis.c.domain = [...new Set(this.data.map(d=>d.c))] } 
            if (this.axis.c.type == "custom"){ this.axis.c.domain = [...new Set(this.data.map(d=>d.c))] } 
            else { this.axis.c.domain = d3.extent(this.data.map(d=>d.c)) } 
        } 
        //RANGE
        if (!this.axis.c.hasOwnProperty("range")){ 
            if (this.axis.c.type == "custom"){ this.axis.c.range = this.axis.c.domain } // assumes the color value is already in the data
            else if (this.axis.c.type == "ordinal"){ this.axis.c.range = d3.schemeCategory10 } 
            else if (this.axis.c.type == "linear") { this.axis.c.range = [d3.schemeReds[3][0], d3.schemeReds[3][2]] } 
        } 
    }
    setScaleX(){ return d3.scaleBand().domain(this.axis.x.domain).range(this.axis.x.range) }
    setScaleY(){ return d3.scaleBand().domain(this.axis.y.domain).range(this.axis.y.range) }
    setScaleC(){
        if (this.axis.c.type == "custom"){
            return d3.scaleOrdinal().domain(this.axis.c.domain).range(this.axis.c.domain) 
        } else if (this.axis.c.type == "ordinal"){
            return d3.scaleOrdinal().domain(this.axis.c.domain).range(this.axis.c.range) 
        } else if (this.axis.c.type == "linear"){
            return d3.scaleLinear().domain(this.axis.c.domain).range(this.axis.c.range)
        } else if (this.axis.c.type == "sequential"){
            return d3.scaleSequential().domain(this.axis.c.domain).interpolator(d3.interpolateOrRd)
        } else if (this.axis.c.type == "diverging"){
            return d3.scaleSequential().domain(this.axis.c.domain).interpolator(d3.interpolateRdBu) 
        } 
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

        // container.append('canvas')
        // .attr('width', self.dimension.innerWidth)
        // .attr('height', self.dimension.innerHeight)
        // .style('margin-left', self.padding.left + 'px')
        // .style('margin-top', self.padding.top + 'px')
        // .attr("class", "plot-canvas")
        // .style("position", "absolute")
        // .style("top", "0px")
        // .style("left", "0px")
        // .style("pointer-events", "none")
        // .attr('id', `${self.rootId}-canvasContext`);

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

     plotUtils.axis(this)
     plotUtils.thresholds(this)   
     if (this.display.title){ plotUtils.plotTitle(this) }
     this.renderFocus()
      
    }
    renderFocus(){
        const self = this;
        const canvas = d3.select(`#${self.rootId}-canvasFocus`)
        const ctx = canvas.node().getContext('2d');
        ctx.clearRect(0, 0, self.dimension.innerWidth, self.dimension.innerHeight);
        let data = this.data;

        data.forEach(point => {
         ctx.globalAlpha = 1;
            ctx.beginPath();
            ctx.strokeStyle = "white";
            ctx.fillStyle = self.scale.c(point.c);
            const px = self.scale.x(point.x);
            const py =  self.scale.y(point.y);
            const pr =  10;
            ctx.rect(px, py, self.scale.x.bandwidth(), self.scale.y.bandwidth())
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
            ctx.globalAlpha = 1.5;
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.fillStyle = self.scale.c(point.c);
            const px = self.scale.x(point.x);
            const py =  self.scale.y(point.y);
            const pr =  10;
            ctx.rect(px, py, self.scale.x.bandwidth(), self.scale.y.bandwidth())
            ctx.fill();
           ctx.stroke();
        });

    }
    // renderPoint(points, mouseEvent){

    //     const self = this;
    //     let plot = d3.select(`#${self.rootId}-g`)    
    //     let rect = plot.selectAll(`.${mouseEvent}`)
    //        .data(points)
      
    //        rect.exit().remove()
       
    //        rect.enter().append("rect")
    //         .merge(rect)
    //         .attr("x", d=>self.scale.x(d.x))
    //         // .attr("y", d=>self.dimension.innerHeight - self.scale.y(d.y))
    //         .attr("y", d=>self.scale.y(d.y))
    //         .attr("width",d=>self.scale.x.bandwidth())
    //         .attr("height",d=>self.scale.y.bandwidth())
    //         .attr("fill", d=> self.scale.c(d.c))
    //         .attr("stroke", "black")
    //         .attr("stroke-width", 2)
    //         .attr("class", mouseEvent)
    // }

    // renderAxis(){
    //     const svg = d3.select(`#${this.rootId}-g`),
    //         tickPadding = 5;

    //     const renderAxisX=()=>{
    //         const x = d3.axisBottom()
    //         .scale(this.scale.x)   
    //         .ticks(this.axis.x.ticks)
    //         .tickPadding(tickPadding)
    //         .tickSize(2)

    //         svg.append("g")
    //         .attr("class", "axis x")
    //         .attr("transform", `translate(0,${this.dimension.innerHeight})`)
    //         .call(x)

    //         svg.select(".axis.x").selectAll(".tick text")
    //         .attr("transform", `rotate(-40)`)
    //         .attr("text-anchor", "end")

    //         if (this.display.xAxisTitle){
    //             d3.select(`#${this.rootId}-svg`)
    //             .append("text")
    //             .attr("class", "axis-title")
    //             .attr("x", this.dimension.width/2)
    //             .attr("text-anchor", "middle")
    //             .attr("y",  this.dimension.height)
    //             .attr("dy", "-1em")
    //             .html(this.axis.x.title)
    //         }
    //     }

    //     const renderAxisY=()=>{
    //         const y = d3.axisLeft(this.scale.y) 
    //         .ticks(this.axis.y.ticks)
    //         .tickPadding(tickPadding)
    //         .tickSize(2)

    //         svg.append("g")
    //         .attr("class", "axis y")
    //         .attr("transform", `translate(0,0)`)
    //         .call(y)
        
    //         if (this.display.yAxisTitle){
    //             d3.select(`#${this.rootId}-svg`)
    //             .append("text")
    //             .attr("class", "axis-title")
    //             .attr("transform", `translate(${0},${ this.dimension.height/2})rotate(-90)`)
    //             .attr("dy", "1em")
    //             .attr("text-anchor", "middle")
    //             .html(this.axis.y.title)
    //         }
    //     }
    //     renderAxisX()
    //     renderAxisY()
    // }
    // renderTitle(){ // rendering DIV not SVG
    //     // const svg = d3.select(`#${this.rootId}-g`)
    //     // svg
    //     //     .append("text")
    //     //     .attr("class", "plot-title")
    //     //     .attr("transform", `translate(${this.dimension.innerWidth/2}, 0)`)
    //     //     .attr("dy", -14)
    //     //     .attr("text-anchor", "middle")
    //     //     .html(this.title)
    //     const plot = d3.select(`#${this.rootId}`)
    //     plot
    //         .append("div")
    //         .style("width", `${this.dimension.width}px`)
    //         .attr("class", "plot-title")
    //         .style("position", "absolute")
    //         .style("top", 0)
    //         .style("left", 0)
    //         .style("text-align", "center")
    //         .html(this.title)
    // }

    // showTooltip(point, mouse){
    //     const self = this;
    //     const tooltip = d3.select(`#${self.rootId}-tooltip`);


    //     let string; 
    //     if (self.tooltipConfig == null){  
    //         string = `<b>${self.axis.y.title}:</b> ${point.y}<br><b>${self.axis.x.title}:</b> ${point.x}<br><b>${self.axis.c.title}:</b> ${point.c}`
    //     } else {
    //         string = '';
    //         self.tooltipConfig.forEach((d,i)=>{
    //             string += `<b>${d.label}:</b> ${point[d.field]}<br>`
    //         })
    //     }

    //     tooltip
    //     .html(string)
    //     .style(`top`, `${mouse[1]-(12*6)}px`) 
    //     .style(`left`, `${mouse[0] }px`)
    //   tooltip.transition().duration(100).style("opacity", 1)

    // }
    // hideTooltip(){
    //     const self = this;
    //     const tooltip = d3.select(`#${self.rootId}-tooltip`);
    //     tooltip.transition().duration(100).style("opacity", 0)
    // }
    // renderLegend(){
    //     const self = this;
    //     const domain = self.scale.c.domain();
    //     const radius = 6;
    //     const diameter = radius*3;

    //     this.legend.dimension = {
    //         width: d3.select(`#${this.legend.rootId}`).node().clientWidth,
    //         height: (diameter*(domain.length)) + this.legend.padding.top + this.legend.padding.bottom,
    //         innerWidth: d3.select(`#${this.legend.rootId}`).node().clientWidth - this.legend.padding.left - this.legend.padding.right,
    //         innerHeight: diameter*(domain.length)
    //     }

       

    //     const svg = d3.select(`#${this.legend.rootId}`)
    //     .attr('width', self.legend.dimension.width)
    //     .attr('height', self.legend.dimension.height)
    //         .append("g")
    //         .attr('transform', `translate(${self.legend.padding.left}, ${self.legend.padding.top})`);
        

    //     let max = d3.max(self.scale.c.domain())
    //     max = max+1;
    //     let steps = [...Array(max).keys()]
    //     const scale = d3.scaleBand().domain(steps).range([0, this.legend.dimension.innerWidth]).padding(0)
    //         const ticks = svg.selectAll(".legend.tick")
    //         .data(steps)
    //         .enter()
    //         .append("g")
    //         .attr("class", "legend tick")
    //         .attr("id", (d,i)=> `legend-tick-${i}`)
    //         .attr('transform', (d,i)=>`translate(${scale(d)},0)`)
    //         .each(function(d){
    //             d3.select(this).append("rect")
    //             .attr("x", 0)
    //             .attr("y", self.legend.dimension.innerHeight/2)
    //             .attr("width", scale.bandwidth())
    //             .attr("height", self.legend.dimension.innerHeight/2)
    //             .attr("fill", self.scale.c(d))
    //         })


 
    //             const x = d3.axisBottom()
    //             .scale(scale)   
    //             .tickValues(self.scale.c.domain())
    //             .tickPadding(5)
    //             .tickSize(5)
    
    //             svg.append("g")
    //             .attr("class", "axis x")
    //             .attr("transform", `translate(0,${this.legend.dimension.innerHeight})`)
    //             .call(x)
    
    //             svg.select(".axis.x").selectAll(".tick text")
    //             .attr("transform", `translate(-6,0)rotate(-40)`)
    //             .attr("text-anchor", "end")
                
    // }
    
}
