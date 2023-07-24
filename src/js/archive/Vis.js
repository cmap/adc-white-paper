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

const padding = {top: 50, right: 35, bottom:50, left:65};

export function useScatter(config){

    scatterColor(config.data);
    let plotConfig = updateGenericConfig(config);
    scatterAxis(plotConfig)

    let plot = new scatter(plotConfig)
    d3.selectAll(".domain").remove()

}

export function useVolcano(config){
    volcanoColor(config.data)
    let plotConfig = updateGenericConfig(config);
    volcanoAxis(plotConfig)

    let plot = new scatter(plotConfig)
    d3.selectAll(".domain").remove()  
}


function updateGenericConfig(config){
    return {
        data: config.data,
        title: config.title,
        rootId: config.rootId,
        dimension: {   
            width: d3.select(`#${config.rootId}`).node().clientWidth, 
            height: d3.select(`#${config.rootId}`).node().clientHeight
        },
        padding: padding
    }
}
function volcanoColor(data){
    let colorScale =  {
        y: d3.scaleSequential().interpolator(d3.interpolateHcl("#ffd46e", "purple")).domain(d3.extent(data.map(d=>d.y)))
    } 
    data.forEach(d=>{
     d.color = colorScale.y(d.y)
    })
}
function scatterColor(data){
    let colorScale =  {
        x: d3.scaleSequential().interpolator(d3.interpolateHcl("purple", "#ffd46e")).domain(d3.extent(data.map(d=>d.x))),
        y: d3.scaleSequential().interpolator(d3.interpolateHcl("#ffd46e", "purple")).domain(d3.extent(data.map(d=>d.y)))
    } 
    data.forEach(d=>{
        d.color = d3.interpolateRgbBasis([colorScale.x(d.x), colorScale.y(d.y)])(0.5)
    })
}
function volcanoAxis(config){
    config.axis = {
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
    };
}
function scatterAxis(config){
    config.axis = {
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
    }
}