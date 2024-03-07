import * as d3 from "d3";
import defaultPlotConfig from './default-plot-config.js';
import * as plotUtils from '@/js/utils/plot-utils.js';

export default class histogram extends defaultPlotConfig{
    constructor(
        rootId, 
        data,
        config,
        states
    ) {
        super(rootId, data, config);
        this.data = data.sort((a,b)=> d3.ascending(a.y, b.y));
        this.states = states;
        if (!this.scale.hasOwnProperty("x")){ this.scale.x = this.setScaleX() } 
        if (!this.scale.hasOwnProperty("y")){ this.scale.y = this.setScaleY() }
        this.render();
    }
    setScaleX(){
        let domain;
        if (!this.axis.x.hasOwnProperty("domain")){ domain = d3.extent(this.data.map(d=>d.x)) } else { domain = this.axis.x.domain }
        return d3.scaleLinear().domain(domain).range([this.axis.innerPadding, this.dimension.innerWidth-this.axis.innerPadding]).nice() 
    }
    setScaleY(){
        let domain;
        if (!this.axis.x.hasOwnProperty("domain")){ domain = d3.extent(this.data.map(d=>d.y)) } else { domain = this.axis.y.domain }
        return d3.scaleLinear().domain(domain).range([this.dimension.innerHeight-this.axis.innerPadding, this.axis.innerPadding]).nice() 
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
        if (this.display.title){ plotUtils.plotTitle(this) }
        this.update()
    }
    renderAxis(){
        plotUtils.xaxis(this)
        plotUtils.yaxis(this)
        plotUtils.thresholds(this)
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

         .attr("transform", function(d) { return "translate(" + self.scale.x(d.x0) + "," + self.scale.y(d.length) + ")"; })
         .attr("width", function(d) { return self.scale.x(d.x1) - self.scale.x(d.x0) -1 ; })
         .attr("height", function(d) { return self.dimension.innerHeight - self.axis.innerPadding - self.scale.y(d.length); })
         .attr("fill", d=> self.scale.c(d.c))
    }
}