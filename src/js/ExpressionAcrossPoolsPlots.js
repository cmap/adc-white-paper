import * as d3 from 'd3';
import boxplot from './modules/boxplot.js';



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

const padding = {top: 50, right: 35, bottom:50, left:65};

export function launch(data){

    let parsedData = data.map(d=>{
        return {
            x: d.pool_id,
            y: d.expression,
            r:3,
            color:{
                pt: undefined,
                box: undefined
            },
            name: d.cell_line_display_name,
            _info: d
        }
    })

    let yExtent = d3.extent(parsedData.map(d=>d.y))
    let colorScale =  d3.scaleSequential().interpolator(d3.interpolateHcl("purple", "#ffd46e")).domain(yExtent)
    parsedData.forEach(d=>{
        d.color.pt = colorScale(d.y)
        d.color.box = d3.interpolateHcl("purple", "#ffd46e")(0.5)
    })


    let groupData = d3.groups(parsedData, d => d.x).sort((a, b) => {
        return d3.ascending(a[0], b[0])
    })

    let plotData = groupData.map(d => {
        return {
            title: d[0],
            data: d[1]
        }
    })



    let plotConfig = {
        title: "Title",
        data: plotData,
        rootId: `expression-across-pools-plot`,
        padding: padding,
        dimension: {   
                    width: d3.select("#expression-across-pools-plot").node().clientWidth,
                    height: d3.select(`#expression-across-pools-plot`).node().clientHeight
                },
        axis: {
            x: {
               domain: plotData.map(d=>d.title),
                title: "x title"
            },
            y: {
                min: yExtent[0],
                max: yExtent[1],
                title: "y title"
            }
        }
    }

    new boxplot(plotConfig.data, plotConfig.title, plotConfig.axis, plotConfig.rootId, plotConfig.dimension, plotConfig.padding )


}


    
function tooltip(){
    let eachPlot = d3.selectAll(".biomarker-plot").select("g");
    let pts = eachPlot.selectAll(".scatter-pt");
    pts.on("mouseover", function(event, d){
        let selected = pts.filter(e=> e.name == d.name).moveToFront().classed("mouseover", true)
        selected.append("text").html(d.name).attr("class", "scatter-pt-label").attr("dy", -8).attr("text-anchor", "middle")
        })
        .on("mouseleave", function(){
            pts.selectAll("text").remove()
            pts.classed("mouseover", false)
        })    
}
export function highlight(selected){
    plots.forEach(plot=>{
        d3.select(`#${plot.rootId}-g`)
        .selectAll("circle")
        .attr("r", d=> d.r)
        .attr("stroke", d=> d.color)
        .filter(d=> selected.includes(d.name))
        .attr("r", d=> d.r*2)
        .attr("stroke", "black")
        .moveToFront()

    })
}




