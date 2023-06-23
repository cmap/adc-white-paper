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

export function launch(results, rootId){

const data = results;

    // const data = results.map(d=>{
    //     return {
    //         x: d.TDM1_auc,
    //         y: d.ERBB2_expression,
    //         r: 4,
    //         color: d.TDM1_auc,
    //         _info: d
    //     }
    // })
    let config = {
        data: data,
        title: "title",
        axis: {
            x: {
                max: 1,
                min:0.2
            },
            y: {
                max:13,
                min:0
            },
            color: {
                range: ["red", "blue"],
                // range: [0,5]
            }
        },
        rootId: rootId,
        dimension: {   
            width: d3.select(`#${rootId}`).node().clientWidth, 
            height: d3.select(`#${rootId}`).node().clientHeight
        },
        padding:{top: 50, right: 50, bottom:50, left:50},
        display:{ legend: true, title:true, borderbox: true }

    }
    let plot = new scatter(config)
    d3.selectAll(".domain").remove()

}
