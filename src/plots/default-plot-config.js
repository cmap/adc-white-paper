import * as d3 from "d3";
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


export default class defaultPlotConfig {
    constructor(
        rootId, 
        data,
        config
    ) { 
        this.rootId = rootId;
        this.data = data;
        if (config.hasOwnProperty("padding")){ this.padding = config.padding } else { this.padding = { top:20, right:20, bottom:20, left:20 } }
        if (config.hasOwnProperty("dimension")){ this.dimension = config.dimension } else { this.dimension = { width: d3.select(`#${this.rootId}`).node().clientWidth, height:  d3.select(`#${this.rootId}`).node().clientHeight } }
        if (!this.dimension.hasOwnProperty("width")){ this.dimension.width = d3.select(`#${this.rootId}`).node().clientWidth }
        if (!this.dimension.hasOwnProperty("height")){ this.dimension.height = d3.select(`#${this.rootId}`).node().clientHeight }
        this.dimension.innerWidth = this.dimension.width - this.padding.left - this.padding.right;
        this.dimension.innerHeight = this.dimension.height - this.padding.top - this.padding.bottom;
        if (config.hasOwnProperty("title")){ this.title = config.title } else { this.title = "" }
        if (config.hasOwnProperty("axis")){ this.axis = config.axis } else { this.axis = { } }
        if (config.hasOwnProperty("scale")){ this.scale = config.scale } else { this.scale = { } }
        if (config.hasOwnProperty("legend")){ this.legend = config.legend } else { this.legend = { } }

        if (!this.axis.hasOwnProperty("x")){ this.axis.x = { } }
        if (!this.axis.hasOwnProperty("y")){ this.axis.y = { } }
        if (!this.axis.hasOwnProperty("c")){ this.axis.c = { } }
        // color axis and scale has same defaults for all plots. 
        if (!this.axis.c.hasOwnProperty("type")){ this.axis.c.type = "custom" }         
        if (!this.axis.c.hasOwnProperty("domain")){ this.setAxisCDomain()}
        if (!this.axis.c.hasOwnProperty("range")){ this.setAxisCRange() }
        if (!this.scale.hasOwnProperty("c")){  this.setScaleC(); } 

        if (!this.axis.x.hasOwnProperty("title")){ this.axis.x.title = "X" }
        if (!this.axis.y.hasOwnProperty("title")){ this.axis.y.title = "Y" }
        if (!this.axis.c.hasOwnProperty("title")){ this.axis.c.title = "C" }


        if (!this.axis.x.hasOwnProperty("ticks")){ this.axis.x.ticks = 3 }
        if (!this.axis.y.hasOwnProperty("ticks")){ this.axis.y.ticks = 3 }
        if (!this.axis.x.hasOwnProperty("threshold")){ this.axis.x.threshold = false } // dashed line at specified value
        if (!this.axis.y.hasOwnProperty("threshold")){ this.axis.y.threshold = false } // dashed line at specified value
 
        if (!this.axis.hasOwnProperty("innerPadding")){ this.axis.innerPadding = 6 } // padding between axis/scatter points and edge of plot
      
        if (!this.legend.hasOwnProperty("rootId")){ this.legend.rootId =  `${this.rootId}-legend` }
        if (!this.legend.hasOwnProperty("padding")){ this.legend.padding = { top:15, right:15, bottom:15, left:15 } }


        if (config.hasOwnProperty("display")){ this.display = config.display } else { this.display = { } }
        if (!this.display.hasOwnProperty("xAxisTicks")){ this.display.xAxisTicks = true }
        if (!this.display.hasOwnProperty("yAxisTicks")){ this.display.yAxisTicks = true }
        if (!this.display.hasOwnProperty("xAxisTitle")){ this.display.xAxisTitle = true }
        if (!this.display.hasOwnProperty("yAxisTitle")){ this.display.yAxisTitle = true }

        
        if (!this.display.hasOwnProperty("legend")){ this.display.legend = false }
        if (this.display.legend){ this.legend = new legend(this.legend.rootId, this.axis.c, this.scale.c) }

      

        if (!this.display.hasOwnProperty("title")){ this.display.title = true }
        if (!this.display.hasOwnProperty("tooltip")){ this.display.tooltip = true }
        if (!config.hasOwnProperty("tooltipConfig")){ this.tooltipConfig = [ {label: this.axis.x.title, field: "x"}, {label:this.axis.y.title, field: "y"}] } else { this.tooltipConfig = config.tooltipConfig }
    }
    setAxisCDomain(){ 
         if (this.scale.hasOwnProperty("c")){ 
            this.axis.c.domain = this.scale.c.domain()
         } else {
            switch (this.axis.c.type){
                case "custom":
                    this.axis.c.domain = [...new Set(this.data.map(d=>d.c))]
                    break;
                case "ordinal":
                    this.axis.c.domain = [...new Set(this.data.map(d=>d.c))]
                    break;
                case "linear":
                    this.axis.c.domain = d3.extent(this.data.map(d=>d.c))
                    break;
                case "sequential":
                    this.axis.c.domain = d3.extent(this.data.map(d=>d.c))
                    break;
                case "diverging":
                    this.axis.c.domain = d3.extent(this.data.map(d=>d.c))
                    break;
                case "log":
                    this.axis.c.domain = d3.extent(this.data.map(d=>d.c))
                    break;
                case "sequentialLog":
                    this.axis.c.domain = [d3.min(this.data.map(d=>d.c))+1, d3.max(this.data.map(d=>d.c))+1]
            }
         }
    }
    setAxisCRange(){ 
        if (this.scale.hasOwnProperty("c")){ 
            this.axis.c.range = this.scale.c.range()
         } else {
            switch (this.axis.c.type){
                case "custom":
                    this.axis.c.range = this.axis.c.domain
                    break;
                case "ordinal":
                    this.axis.c.range = d3.schemeCategory10
                    break;
                case "linear":
                    this.axis.c.range = [d3.schemeReds[3][0], d3.schemeReds[3][2]] // temporary
                    break;
                case "sequential":
                    this.axis.c.range = d3.interpolateOrRd; // should use 'interpolator' instead of 'range'
                    break;
                case "diverging":
                    this.axis.c.range = d3.interpolateRdBu; // should use 'interpolator' instead of 'range'
                    break;
                // case "pow":
                //     this.axis.c.range = [d3.schemeReds[3][0], d3.schemeReds[3][2]] // temporary
                //     break;
                case "sequentialLog":
                    this.axis.c.range = d3.interpolateOrRd; // should use 'interpolator' instead of 'range'
                    break;
                case "log":
                    this.axis.c.range = [d3.schemeReds[3][0], d3.schemeReds[3][2]] // temporary
                    break;
            }
        } 
    }
    setScaleC(){
            switch (this.axis.c.type){
                case "custom":
                    this.scale.c = d3.scaleOrdinal().domain(this.axis.c.domain).range(this.axis.c.range) 
                    break;
                case "ordinal":
                    this.scale.c = d3.scaleOrdinal().domain(this.axis.c.domain).range(this.axis.c.range) 
                    break;
                case "linear":
                    this.scale.c = d3.scaleLinear().domain(this.axis.c.domain).range(this.axis.c.range)
                    break;
                case "sequential":
                    this.scale.c = d3.scaleSequential().domain(this.axis.c.domain).interpolator(d3.interpolateYlOrRd)
                    break;
                case "diverging":
                    this.scale.c = d3.scaleSequential().domain(this.axis.c.domain).interpolator(d3.interpolateYlOrRd) 
                    break;
                case "log":
                    this.scale.c = d3.scaleLog().domain(this.axis.c.domain).range(this.axis.c.range)
                    break;
                // case "pow":
                //     this.scale.c = d3.scalePow().domain(this.axis.c.domain).range(this.axis.c.range).exponent(2)
                //     break;
                case "sequentialLog":
                    this.scale.c = d3.scaleSequentialLog().domain(this.axis.c.domain).interpolator(d3.interpolateRdBu)
                    break;
                default:
                    this.scale.c = d3.scaleOrdinal().domain(this.axis.c.domain).range(this.axis.c.range) 
                    break;
            }
    }
    getDefaults(){
        return {
            title: this.title,
            axis: this.axis,
            scale: this.scale,
            padding: this.padding,
            dimension: this.dimension,
            display: this.display
        }
    }
}