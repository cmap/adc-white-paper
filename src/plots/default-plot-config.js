import * as d3 from "d3";



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
        config
    ) { 
        this.rootId = rootId;
        if (config.hasOwnProperty("title")){ this.title = config.title } else { this.title = "" }
        if (config.hasOwnProperty("axis")){ this.axis = config.axis } else { this.axis = { } }
        if (!this.axis.hasOwnProperty("x")){ this.axis.x = { } }
        if (!this.axis.hasOwnProperty("y")){ this.axis.y = { } }
        if (!this.axis.hasOwnProperty("c")){ this.axis.c = { } }
        if (!this.axis.x.hasOwnProperty("title")){ this.axis.x.title = "X" }
        if (!this.axis.y.hasOwnProperty("title")){ this.axis.y.title = "Y" }
        if (!this.axis.c.hasOwnProperty("title")){ this.axis.c.title = "C" }
        if (!this.axis.x.hasOwnProperty("ticks")){ this.axis.x.ticks = 3 }
        if (!this.axis.y.hasOwnProperty("ticks")){ this.axis.y.ticks = 3 }
        if (!this.axis.x.hasOwnProperty("threshold")){ this.axis.x.threshold = false } // dashed line at specified value
        if (!this.axis.y.hasOwnProperty("threshold")){ this.axis.y.threshold = false } // dashed line at specified value
        if (!this.axis.hasOwnProperty("innerPadding")){ this.axis.innerPadding = 4 } // padding between axis/scatter points and edge of plot

        if (config.hasOwnProperty("padding")){ this.padding = config.padding } else { this.padding = { top:20, right:20, bottom:20, left:20 } }
        if (config.hasOwnProperty("dimension")){ this.dimension = config.dimension } else { this.dimension = { width: d3.select(`#${this.rootId}`).node().clientWidth, height:  d3.select(`#${this.rootId}`).node().clientHeight } }
        if (!this.dimension.hasOwnProperty("width")){ this.dimension.width = d3.select(`#${this.rootId}`).node().clientWidth }
        if (!this.dimension.hasOwnProperty("height")){ this.dimension.height = d3.select(`#${this.rootId}`).node().clientHeight }
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
        if (!config.hasOwnProperty("tooltipConfig")){ this.tooltipConfig = [ {label: this.axis.x.title, field: "x"}, {label:this.axis.y.title, field: "y"}] } else { this.tooltipConfig = config.tooltipConfig }


        if (config.hasOwnProperty("scale")){ this.scale = config.scale } else { this.scale = { } }

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