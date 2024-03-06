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
        axis,
        scale 
    ) { 
        this.rootId = rootId;

        this.padding = { top:15, right:15, bottom:15, left:15 },
        this.dimension = { width: d3.select(`#${rootId}`).node().clientWidth, height:  d3.select(`#${rootId}`).node().clientHeight }
        this.dimension.innerHeight = this.dimension.height - this.padding.top - this.padding.bottom;
        this.dimension.innerWidth = this.dimension.width - this.padding.left - this.padding.right;
        this.scale = scale;
        this.axis = axis;
        this.data = this.scale.domain(); // may need to change this for different scales
        this.render();
    }

    render(){

    const self = this;
    let barHeight = 20;

    const svg = d3.select(`#${self.rootId}`)
    .attr('width', self.dimension.width)
    .attr('height', self.dimension.height)
    .append("g")
    .attr('transform', `translate(${self.padding.left}, ${self.padding.top})`);

    if (self.axis.type == "ordinal"){

    let axisScale = d3.scaleBand().domain(self.data).range([0, self.dimension.innerWidth]).padding(0)


    let  axisBottom = g => g
    .attr("class", `x-axis`)
    .attr("transform", `translate(0,${barHeight*2})`)
    .call(d3.axisBottom(axisScale)
    .ticks(self.dimension.innerHeight / 80)
    .tickSize(-barHeight))

    svg.selectAll(".legend.tick")
    .data(self.data)
    .enter().append("g")
    .attr("class", "legend tick")
    .attr('transform', (d,i)=>`translate(${axisScale(d)},0)`)
    .each(function(d){
    d3.select(this).append("rect")
    .attr("x", 0)
    .attr("y", barHeight)
    .attr("width", axisScale.bandwidth())
    .attr("height",barHeight)
    .attr("fill", self.scale(d))
    })


    svg.append('g')
    .call(axisBottom);

    }
    else if (self.axis.type == "linear" || self.axis.type == "sequential" || self.axis.type == "diverging"){



    let axisScale = d3.scaleLinear()
    .domain(self.data)
    .range([0, self.dimension.innerWidth])

    let  axisBottom = g => g
    .attr("class", `x-axis`)
    .attr("transform", `translate(0,${barHeight*2})`)
    .call(d3.axisBottom(axisScale)
    .ticks(self.dimension.innerWidth / 80)
    .tickSize(-barHeight))

    const defs = svg.append("defs");
    const linearGradient = defs.append("linearGradient")
    .attr("id", `${self.rootId}-linear-gradient`);

    linearGradient.selectAll("stop")
    .data(self.scale.ticks().map((t, i, n) => ({ offset: `${100*i/n.length}%`, color: self.scale(t) })))
    .enter().append("stop")
    .attr("offset", d => d.offset)
    .attr("stop-color", d => d.color);

    svg.append('g')
    .attr("transform", `translate(0,${barHeight})`)
    .append("rect")
    .attr('transform', `translate(${0}, 0)`)
    .attr("width", self.dimension.innerWidth)
    .attr("height", barHeight)
    .style("fill", `url(#${self.rootId}-linear-gradient)`);

    svg.append('g')
    .call(axisBottom);
    }
    svg.append("text")
    .text(self.axis.title)
    .attr("x", self.dimension.innerWidth/2)
    .attr("y", (barHeight*2)+ 20)
    .attr("text-anchor", "middle")
    .style("font-size", "10px")
    .attr("dy", 1)

    }

}