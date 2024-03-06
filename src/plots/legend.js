import * as d3 from "d3";
import * as plotUtils from '@/js/utils/plot-utils.js';

//https://observablehq.com/@d3/color-legend

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


export default class legend {
    constructor(
        rootId, 
        padding = { top:15, right:15, bottom:15, left:15 },
        dimension = { width: d3.select(`#${rootId}`).node().clientWidth, height:  d3.select(`#${rootId}`).node().clientHeight },
        type,
        scale 
    ) { 
        this.rootId = rootId;
        this.padding = padding;
        this.dimension = dimension;
        this.dimension.innerHeight = dimension.height - padding.top - padding.bottom;
        this.dimension.innerWidth = dimension.width - padding.left - padding.right;
        this.scale = scale;
        this.type = type;
        this.render();
    }

    render(){
        const self = this;
        const domain = self.scale.domain();
        const size = 12;
        this.dimension = { 
            width: d3.select(`#${this.rootId}`).node().clientWidth,
            height: (size*(domain.length)) + this.padding.top + this.padding.bottom,
            innerWidth: d3.select(`#${this.legend.rootId}`).node().clientWidth - this.padding.left - this.padding.right,
            innerHeight: size*(domain.length)
        }
        const scale = d3.scaleBand().domain(domain).range([0, this.dimension.innerHeight]).padding(.5)

        const svg = d3.select(`#${this.rootId}`)
        .attr('width', self.dimension.width)
        .attr('height', self.dimension.height)
            .append("g")
            .attr('transform', `translate(${self.padding.left}, ${self.padding.top})`);
      
          svg.selectAll(".legend.tick")
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
                .attr("r", size/2)
                .attr("fill", self.scale.c(d))

                d3.select(this).append("text")
                .text(d)
                .attr("y", size / 4)
                .attr("x", size * 4)
                .attr("text-anchor", "start")
                .style("font-size", "14px")

            })
            
    }
    renderLegend(){ // should this be a component? should i create it in the scatter plot or in the parent component?
    const self = this;
    const domain = self.scale.c.domain();

    this.legend.dimension = { 
    width: d3.select(`#${this.legend.rootId}`).node().clientWidth,
    height: d3.select(`#${this.legend.rootId}`).node().clientHeight,
    innerWidth: d3.select(`#${this.legend.rootId}`).node().clientWidth - this.legend.padding.left - this.legend.padding.right,
    innerHeight: d3.select(`#${this.legend.rootId}`).node().clientHeight - this.legend.padding.top - this.legend.padding.bottom
    }
    let dimension = this.legend.dimension;
    let barHeight = 20;

    const svg = d3.select(`#${this.legend.rootId}`)
    .attr('width', self.legend.dimension.width)
    .attr('height', self.legend.dimension.height)
    .append("g")
    .attr('transform', `translate(${self.legend.padding.left}, ${self.legend.padding.top})`);

    if (this.axis.c.type == "ordinal"){

    let axisScale = d3.scaleBand().domain(domain).range([0, this.legend.dimension.innerWidth]).padding(0)


    let  axisBottom = g => g
    .attr("class", `x-axis`)
    .attr("transform", `translate(0,${barHeight*2})`)
    .call(d3.axisBottom(axisScale)
    .ticks(dimension.innerHeight / 80)
    .tickSize(-barHeight))

    svg.selectAll(".legend.tick")
    .data(domain)
    .enter().append("g")
    .attr("class", "legend tick")
    .attr('transform', (d,i)=>`translate(${axisScale(d)},0)`)
    .each(function(d){
    d3.select(this).append("rect")
    .attr("x", 0)
    .attr("y", barHeight)
    .attr("width", axisScale.bandwidth())
    .attr("height",barHeight)
    .attr("fill", self.scale.c(d))
    })


    svg.append('g')
    .call(axisBottom);

    }
    else if (this.axis.c.type == "linear" || this.axis.c.type == "sequential" || this.axis.c.type == "diverging"){



    let axisScale = d3.scaleLinear()
    .domain(self.scale.c.domain())
    .range([0, dimension.innerWidth])

    let  axisBottom = g => g
    .attr("class", `x-axis`)
    .attr("transform", `translate(0,${barHeight*2})`)
    .call(d3.axisBottom(axisScale)
    .ticks(dimension.innerWidth / 80)
    .tickSize(-barHeight))

    const defs = svg.append("defs");
    const linearGradient = defs.append("linearGradient")
    .attr("id", `${self.legend.rootId}-linear-gradient`);

    linearGradient.selectAll("stop")
    .data(self.scale.c.ticks().map((t, i, n) => ({ offset: `${100*i/n.length}%`, color: self.scale.c(t) })))
    .enter().append("stop")
    .attr("offset", d => d.offset)
    .attr("stop-color", d => d.color);

    svg.append('g')
    .attr("transform", `translate(0,${barHeight})`)
    .append("rect")
    .attr('transform', `translate(${0}, 0)`)
    .attr("width", dimension.innerWidth)
    .attr("height", barHeight)
    .style("fill", `url(#${self.legend.rootId}-linear-gradient)`);

    svg.append('g')
    .call(axisBottom);
    }
    svg.append("text")
    .text(this.axis.c.title)
    .attr("x", dimension.innerWidth/2)
    .attr("y", (barHeight*2)+ 20)
    .attr("text-anchor", "middle")
    .style("font-size", "10px")
    .attr("dy", 1)

    }

}