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

export function launch(config){
    console.log(config)


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
            },
            color: {}
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
