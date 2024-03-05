import * as d3 from "d3";
import * as plotUtils from '@/js/utils/plot-utils.js';
import defaultPlotConfig from './default-plot-config.js';

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
        type,
        padding = { top:20, right:20, bottom:20, left:20 },
        dimension = { width: d3.select(`#${rootId}`).node().clientWidth, height:  d3.select(`#${rootId}`).node().clientHeight },
        scale 
    ) { 
        this.rootId = rootId;
        this.scale = scale;
        this.type = type;
        this.padding = padding;
        this.dimension = dimension;
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

}