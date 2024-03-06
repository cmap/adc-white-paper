import * as d3 from "d3";
import * as plotUtils from '@/js/utils/plot-utils.js';
import defaultPlotConfig from './default-plot-config.js';
import legend from './legend.js';
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


export default class scatter extends defaultPlotConfig{
    // export default class scatter {
    constructor(
        rootId, 
        data,
        config,
        states
    ) { 
        super(rootId, config);
        let defaults = new defaultPlotConfig(rootId, config);
        Object.assign(defaults.getDefaults(), this );
        this.data = data.sort((a,b)=> d3.ascending(a.y, b.y));
        this.states = states;
        if (!this.scale.hasOwnProperty("x")){ this.scale.x = this.setScaleX() } 
        if (!this.scale.hasOwnProperty("y")){ this.scale.y = this.setScaleY() }
        this.setAxisC();
        if (!this.scale.hasOwnProperty("c")){ this.scale.c = this.setScaleC() }

     //   this.scale.c = this.setScaleC()
        this.render();

        if (this.display.legend){ // requires createScale() for setting scale.c.... make this a separate class method? 
            this.legend = config.legend;
            new legend(this.legend.rootId, this.axis.c, this.scale.c)
        }
    }
    setScaleX(){
        let domain;
        if (!this.axis.x.hasOwnProperty("domain")){ domain = d3.extent(this.data.map(d=>d.x)) } else { domain = this.axis.x.domain }
        return d3.scaleLinear().domain(domain).range([this.axis.innerPadding, this.dimension.innerWidth-this.axis.innerPadding]).nice() 
    }
    setScaleY(){
        let domain;
        if (!this.axis.y.hasOwnProperty("domain")){ domain = d3.extent(this.data.map(d=>d.y)) } else { domain = this.axis.y.domain }
        return d3.scaleLinear().domain(domain).range([this.dimension.innerHeight-this.axis.innerPadding, this.axis.innerPadding]).nice() 
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
    setScaleC(){
        // if (!this.axis.c.hasOwnProperty("type")){ this.axis.c.type = "linear" } 
        // if (!this.axis.c.hasOwnProperty("domain")){ 
        //     if (this.axis.c.type == "ordinal"){ this.axis.c.domain = [...new Set(this.data.map(d=>d.c))] } 
        //     if (this.axis.c.type == "custom"){ this.axis.c.domain = [...new Set(this.data.map(d=>d.c))] } 
        //     else { this.axis.c.domain = d3.extent(this.data.map(d=>d.c)) } 
        // } 
        // if (!this.axis.c.hasOwnProperty("range")){ 
        //     if (this.axis.c.type == "custom"){ this.axis.c.range = this.axis.c.domain } // assumes the color value is already in the data
        //     else if (this.axis.c.type == "ordinal"){ this.axis.c.range = d3.schemeCategory10 } 
        //     else if (this.axis.c.type == "linear") { this.axis.c.range = [d3.schemeReds[3][0], d3.schemeReds[3][2]] } 
        // } 
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
        .attr('id', `${self.rootId}-canvasContext`);

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

        this.renderAxis();
        this.renderContext(); // renders 1x
        this.renderFocus(); // renders on highlight
        if (this.display.title){ plotUtils.plotTitle(this) }
    }
    renderContext(){ // grey points behind focus color points. renders 1x, then layer is hidden/visible on highlight
        const self = this;
        const canvas = d3.select(`#${self.rootId}-canvasContext`)
        const ctx = canvas.node().getContext('2d');
        let data = this.data;

        data.forEach(point => {
            ctx.globalAlpha = 0.6;
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

    renderFocus(){ // color points in front of context points. renders when highlight changes
        const self = this;
        const canvas = d3.select(`#${self.rootId}-canvasFocus`)
        const ctx = canvas.node().getContext('2d');
        ctx.clearRect(0, 0, self.dimension.innerWidth, self.dimension.innerHeight);
        let data = this.data.filter(d=> d.highlight == true) // is this taking too long? is there a way to index the data for faster filtering?

        data.forEach(point => {
            ctx.globalAlpha = 0.6;
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
            ctx.globalAlpha = 1;
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.fillStyle = self.scale.c(point.c);
            const px = self.scale.x(point.x);
            const py =  self.scale.y(point.y);
            const pr =  point.r;
            ctx.arc(px, py, pr*1.5, 0, 2 * Math.PI, true);
            ctx.fill();
            ctx.stroke();
        });

    }
    renderAxis(){
        plotUtils.axis(this)
        plotUtils.thresholds(this)   
    }

 //   showTooltip(point, mouse){ // tooltip is not a scatter-specific feature, should be moved to plot-utils.js or a separate class method
        // const self = this;
        // const tooltip = d3.select(`#${self.rootId}-tooltip`);
        // let string; 
        //     string = '';
        //     self.tooltipConfig.forEach((d,i)=>{
        //         string += `<b>${d.label}:</b> ${point[d.field]}<br>`
        //     })

        // tooltip
        // .html(string)
        // .style(`top`, `${mouse[1]-(12*6)}px`) 
        // .style(`left`, `${mouse[0]+14 }px`)

        // tooltip.transition().duration(50).style("opacity", 1)
  //  }
    // hideTooltip(){ // tooltip is not a scatter-specific feature, should be moved to plot-utils.js or a separate class method
    //     const self = this;
    //     const tooltip = d3.select(`#${self.rootId}-tooltip`);
    //     tooltip.transition().duration(50).style("opacity", 0)
    // }   
    // renderLegend(){ // should this be a component? should i create it in the scatter plot or in the parent component?
    //     const self = this;
    //     const domain = self.scale.c.domain();

    //     this.legend.dimension = { 
    //         width: d3.select(`#${this.legend.rootId}`).node().clientWidth,
    //         height: d3.select(`#${this.legend.rootId}`).node().clientHeight,
    //         innerWidth: d3.select(`#${this.legend.rootId}`).node().clientWidth - this.legend.padding.left - this.legend.padding.right,
    //         innerHeight: d3.select(`#${this.legend.rootId}`).node().clientHeight - this.legend.padding.top - this.legend.padding.bottom
    //     }
    //     let dimension = this.legend.dimension;
    //     let barHeight = 20;

    //     const svg = d3.select(`#${this.legend.rootId}`)
    //     .attr('width', self.legend.dimension.width)
    //     .attr('height', self.legend.dimension.height)
    //     .append("g")
    //     .attr('transform', `translate(${self.legend.padding.left}, ${self.legend.padding.top})`);

    //     if (this.axis.c.type == "ordinal"){
      
    //         let axisScale = d3.scaleBand().domain(domain).range([0, this.legend.dimension.innerWidth]).padding(0)


    //       let  axisBottom = g => g
    //         .attr("class", `x-axis`)
    //         .attr("transform", `translate(0,${barHeight*2})`)
    //         .call(d3.axisBottom(axisScale)
    //         .ticks(dimension.innerHeight / 80)
    //         .tickSize(-barHeight))
        
    //         svg.selectAll(".legend.tick")
    //         .data(domain)
    //         .enter().append("g")
    //         .attr("class", "legend tick")
    //         .attr('transform', (d,i)=>`translate(${axisScale(d)},0)`)
    //         .each(function(d){
    //                 d3.select(this).append("rect")
    //                 .attr("x", 0)
    //                 .attr("y", barHeight)
    //                 .attr("width", axisScale.bandwidth())
    //                 .attr("height",barHeight)
    //                 .attr("fill", self.scale.c(d))
    //             })
           
                
    //     svg.append('g')
    //         .call(axisBottom);


    // //        const scale = d3.scaleBand().domain(domain).range([0, this.legend.dimension.innerWidth]).padding(0)
    //         // svg.selectAll(".legend.tick")
    //         // .data(domain)
    //         // .enter()
    //         // .append("g")
    //         // .attr("class", "legend tick")
    //         // .attr("id", (d,i)=> `legend-tick-${i}`)
    //         // .attr('transform', d=>`translate(0, ${scale(d)})`)
    //         // .attr('transform', (d,i)=>`translate(${scale(d)},0)`)
    //         // .each(function(d){
    //         //     d3.select(this).append("rect")
    //         //     .attr("x", 0)
    //         //     .attr("y", self.legend.dimension.innerHeight/2)
    //         //     .attr("width", scale.bandwidth())
    //         //     .attr("height", self.legend.dimension.innerHeight/2)
    //         //     .attr("fill", self.scale.c(d))
    //         // })
    //         // const x = d3.axisBottom()
    //         // .scale(scale)   
    //         // .tickValues(self.scale.c.domain())
    //         // .tickPadding(5)
    //         // .tickSize(5)

    //         // svg.append("g")
    //         // .attr("class", "axis x")
    //         // .attr("transform", `translate(0,${this.legend.dimension.innerHeight})`)
    //         // .call(x)

    //         // svg.append("text")
    //         // .text(this.axis.c.title)
    //         // .attr("x", this.legend.dimension.innerWidth/2)
    //         // .attr("y", this.legend.dimension.height - 10)
    //         // .attr("text-anchor", "middle")
    //         // .style("font-size", "10px")
    //         // .attr("dy", 0)
        
    //         //  svg.select(".axis.x").select(".domain").remove()   

    //     }
    //     else if (this.axis.c.type == "linear" || this.axis.c.type == "sequential" || this.axis.c.type == "diverging"){
        
      
      
    //         let axisScale = d3.scaleLinear()
    //         .domain(self.scale.c.domain())
    //         .range([0, dimension.innerWidth])

    //       let  axisBottom = g => g
    //         .attr("class", `x-axis`)
    //         // .attr("transform", `translate(0,${dimension.innerHeight })`)
    //         .attr("transform", `translate(0,${barHeight*2})`)
    //         .call(d3.axisBottom(axisScale)
    //         .ticks(dimension.innerWidth / 80)
    //         .tickSize(-barHeight))

    //         const defs = svg.append("defs");
    //         const linearGradient = defs.append("linearGradient")
    //             .attr("id", `${self.legend.rootId}-linear-gradient`);
            
    //         linearGradient.selectAll("stop")
    //             .data(self.scale.c.ticks().map((t, i, n) => ({ offset: `${100*i/n.length}%`, color: self.scale.c(t) })))
    //             .enter().append("stop")
    //             .attr("offset", d => d.offset)
    //             .attr("stop-color", d => d.color);
            
    //         svg.append('g')
    //             // .attr("transform", `translate(0,${dimension.innerHeight - barHeight})`)
    //             .attr("transform", `translate(0,${barHeight})`)
    //             .append("rect")
    //             .attr('transform', `translate(${0}, 0)`)
    //             .attr("width", dimension.innerWidth)
    //             .attr("height", barHeight)
    //             .style("fill", `url(#${self.legend.rootId}-linear-gradient)`);
            
    //         svg.append('g')
    //             .call(axisBottom);
    //     }
    //     svg.append("text")
    //         .text(this.axis.c.title)
    //         .attr("x", dimension.innerWidth/2)
    //         // .attr("y", this.legend.dimension.height - 10)   
    //           .attr("y", (barHeight*2)+ 20)
    //         .attr("text-anchor", "middle")
    //         .style("font-size", "10px")
    //         .attr("dy", 1)
            
    // }

}