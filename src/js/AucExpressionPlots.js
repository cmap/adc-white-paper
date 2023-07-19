import * as d3 from 'd3';
import scatter from './modules/scatter.js';



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

let plots = [];
const padding = {top: 50, right: 35, bottom:50, left:65};

export function launch(data){

    let mergeData = []
    Object.keys(data).forEach((d,i)=>{
       data[d] = data[d].map(e=>{
            return {
                x: e.auc,
                y: e.expression,
                r: 3,
                name: e.cell_line,
                _info: e
            }
        }),
        mergeData.push(data[d])
    })
    mergeData = mergeData.flat()

    let xExtent = d3.extent(mergeData.map(d=>d.x))
    let yExtent = d3.extent(mergeData.map(d=>d.y))
    let colorScale =  {
        x: d3.scaleSequential().interpolator(d3.interpolateHcl("purple", "#ffd46e")).domain(xExtent),
        y: d3.scaleSequential().interpolator(d3.interpolateHcl("#ffd46e", "purple")).domain(yExtent)
    } 


    let plotsConfig = []
    Object.keys(data).forEach((d,i)=>{
        data[d].forEach(function(e){
            e.color = d3.interpolateRgbBasis([colorScale.x(e.x), colorScale.y(e.y)])(0.5)
        })

        plotsConfig.push({
            title: d,
            data: data[d],
            rootId: `expression-auc-plot-${i}`,
            padding: padding,
            dimension: {   
                        width: d3.select(`#expression-auc-plot-${i}`).node().clientWidth, 
                        height: d3.select(`#expression-auc-plot-${i}`).node().clientWidth
                    },
            axis: {
                x: {
                    min: xExtent[0],
                    max: xExtent[1],
                    title: "AUC"
                },
                y: {
                    min: yExtent[0],
                    max: yExtent[1],
                    title: "ERBB2 expression"
                }
            }
        })
    })    


    plotsConfig.forEach(d=>{
        document.getElementById(`${d.rootId}`).style.height = `${d.dimension.height}px`;
        let plot = new scatter(d)
        plots.push(plot)
        d3.selectAll(".domain").remove()

     })
    tooltip()

}

function tooltip(){
    let eachPlot = d3.selectAll(".expression-auc-plot").select("g");
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

