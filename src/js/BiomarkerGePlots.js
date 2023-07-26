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
                x: e.coef,
                y: e.qval,
                r: 3,
                name: e.feature,
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
            title: `${d} - Gene Expression`,
            data: data[d],
            rootId: `biomarker-ge-plot-${i}`,
            padding: padding,
            dimension: {   
                        width: d3.select(`#biomarker-ge-plot-${i}`).node().clientWidth, 
                        height: d3.select(`#biomarker-ge-plot-${i}`).node().clientWidth
                    },
            axis: {
                x: {
                    min: xExtent[0],
                    max: xExtent[1],
                    title: "Correlation"
                },
                y: {
                    min: 0,
                    max: yExtent[1],
                    title: "-log10 (q value)"
                }
            }
        })
    })    


 plotsConfig.forEach(d=>{
    document.getElementById(`${d.rootId}`).style.height = `${d.dimension.height}px`;
    let plot = new scatter(d)
    plots.push(plot)
 //   d3.selectAll(".domain").remove()
 })
 tooltip()

}

function tooltip(){
    let eachPlot = d3.selectAll(".biomarker-plot").select("g");

    eachPlot.selectAll(".scatter-pt")
        .filter(e=> e.name == "ERBB2")
        .moveToFront()
        .classed("mouseover", true)
        .classed("keep-alive", true)
        .append("text")
        .html(d=> d.name)
        .attr("class", "scatter-pt-label")
        .attr("dy", -8)
        .attr("text-anchor", "middle")

        let pts = eachPlot.selectAll(".scatter-pt:not(.keep-alive)");

    pts.on("mouseover", function(event, d){
        let selected = pts.filter(e=> e.name == d.name).moveToFront().classed("mouseover", true)
        selected.append("text").html(d.name).attr("class", "scatter-pt-label").attr("dy", -8).attr("text-anchor", "middle")
        })
        .on("mouseleave", function(){
            pts.classed("mouseover", false).selectAll("text").remove()
            eachPlot.selectAll(".selected").moveToFront()
        })    
}


export function highlight(selected){
    plots.forEach(plot=>{
       let pts = d3.select(`#${plot.rootId}-g`).selectAll(".scatter-pt")
            .classed("selected", false)
    
        pts.selectAll("circle")
            .attr("r", d=> d.r)
           
      let selectedPts =  pts.filter(d=> selected.includes(d.name))
      selectedPts.moveToFront()

      selectedPts.classed("selected", true).moveToFront()
            .selectAll("circle")
            .attr("r", d=> d.r*1.5)
    
        })

    }
