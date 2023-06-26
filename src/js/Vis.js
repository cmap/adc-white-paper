import * as d3 from 'd3';
import scatter from './modules/scatter.js';
import * as $ from "jquery";


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

export function launchAUCVis(config){

    let colorScale =  {
        x: d3.scaleSequential().interpolator(d3.interpolateHcl("purple", "#ffd46e")).domain(d3.extent(config.data.map(d=>d.x))),
        y: d3.scaleSequential().interpolator(d3.interpolateHcl("#ffd46e", "purple")).domain(d3.extent(config.data.map(d=>d.y)))
    } 
    config.data.forEach(d=>{
        d.color = d3.interpolateRgbBasis([colorScale.x(d.x), colorScale.y(d.y)])(0.5)
    })

    let plotConfig = {
        data: config.data,
        title: config.title,
        axis: {
            x: {
                max: 1,
                min:0.2,
                title: "AUC"
            },
            y: {
                max:13,
                min:0,
                title: "ERBB2 expression"
            }
        },
        rootId: config.rootId,
        dimension: {   
            width: d3.select(`#${config.rootId}`).node().clientWidth, 
            height: d3.select(`#${config.rootId}`).node().clientHeight
        },
        padding:{top: 50, right: 35, bottom:50, left:65},
        display: config.display
    }
    let plot = new scatter(plotConfig)
    d3.selectAll(".domain").remove()

}

export function launchVolcanoVis(config){

    let colorScale =  {
        x: d3.scaleSequential().interpolator(d3.interpolateHcl("purple", "#ffd46e")).domain(d3.extent(config.data.map(d=>d.x))),
        y: d3.scaleSequential().interpolator(d3.interpolateHcl("#ffd46e", "purple")).domain(d3.extent(config.data.map(d=>d.y)))
    } 
    config.data.forEach(d=>{
     d.color = colorScale.y(d.y)
    })

    let plotConfig = {
        data: config.data,
        title: config.title,
        axis: {
            x: {
                min: -1,
                max: 1,
                title: "Correlation"
            },
            y: {
                min: 0,
                max: 40,
                title: "-log10 (q value)"
            }
        },
        rootId: config.rootId,
        dimension: {   
            width: d3.select(`#${config.rootId}`).node().clientWidth, 
            height: d3.select(`#${config.rootId}`).node().clientHeight
        },
        padding:{top: 50, right: 35, bottom:50, left:65},
        display: config.display
    }
    let plot = new scatter(plotConfig)
    d3.selectAll(".domain").remove()  

}