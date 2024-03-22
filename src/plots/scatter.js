import * as d3 from "d3";
import * as plotUtils from '@/js/utils/plot-utils.js';
import defaultPlotConfig from './default-plot-config.js';
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
    constructor(
        rootId, 
        data,
        config,
        states
    ) { 
        super(rootId, data, config);
      //  let defaults = new defaultPlotConfig(rootId, data, config);
     //   Object.assign(defaults.getDefaults(), this );
        this.data = data.sort((a,b)=> d3.ascending(a.y, b.y));
        this.states = states;
        this.setAxisX();
        this.setAxisY();
        if (!this.scale.hasOwnProperty("x")){ this.scale.x = this.setScaleX() } 
        if (!this.scale.hasOwnProperty("y")){ this.scale.y = this.setScaleY() }
         this.render();
    }
    setAxisX(){
        if (!this.axis.x.hasOwnProperty("domain")){ this.axis.x.domain = d3.extent(this.data.map(d=>d.x)) } else { this.axis.x.domain = this.axis.x.domain }
        if (!this.axis.x.hasOwnProperty("range")){ this.axis.x.range = [this.axis.innerPadding, this.dimension.innerWidth-this.axis.innerPadding] } else { this.axis.x.range = this.axis.x.range }
    }
    setAxisY(){
        if (!this.axis.y.hasOwnProperty("domain")){ this.axis.y.domain = d3.extent(this.data.map(d=>d.y))  } else { this.axis.y.domain = this.axis.y.domain }
        if (!this.axis.y.hasOwnProperty("range")){ this.axis.y.range = [this.dimension.innerHeight-this.axis.innerPadding, this.axis.innerPadding] } else { this.axis.y.range = this.axis.y.range }
    }
    setScaleX(){ return d3.scaleLinear().domain(this.axis.x.domain).range(this.axis.x.range) }
    setScaleY(){ return d3.scaleLinear().domain(this.axis.y.domain).range(this.axis.y.range) }
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

        if (this.display.title){ plotUtils.plotTitle(this) }
        this.renderAxis();
        this.renderContext(); // renders 1x, then layer is hidden/visible on highlight
        this.renderFocus(); // renders on highlight
        this.renderSelections(); // renders on click
       
    }
    renderAxis(){
        plotUtils.xaxis(this)
        plotUtils.yaxis(this)
        plotUtils.thresholds(this)
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
        let data = this.data.filter(d=> d.highlight == true) 

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
    renderSelections(){ 
        const self = this;
        const canvas = d3.select(`#${self.rootId}-canvasSelections`)
        const ctx = canvas.node().getContext('2d');
        ctx.clearRect(0, 0, self.dimension.innerWidth, self.dimension.innerHeight);
        let data = this.data.filter(d=> d.highlight == true && (self.states.click.includes(d.id) || self.states.mouseover == d.id))

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

}