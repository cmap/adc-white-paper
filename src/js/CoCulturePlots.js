import * as d3 from 'd3';
import lineplot from './modules/lineplot.js';



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

const padding = {top: 75, right: 35, bottom:50, left:65};

export function launch(data){
console.log(data)

let mergeData = []
Object.keys(data).forEach((d,i)=>{
   data[d] = data[d].map(e=>{
        return {
            x: e.pert_dose,
            y: e.viability,
            r: 3,
            series: e.ratio,
            _info: e
        }
    }),
    mergeData.push(data[d])
})
mergeData = mergeData.flat()

let xExtent = d3.extent(mergeData.map(d=>d.x))
let yExtent = d3.extent(mergeData.map(d=>d.y))



let plotsConfig = []
Object.keys(data).forEach((d,i)=>{
    data[d].forEach(function(e){
        e.color = "blue"
    })

    plotsConfig.push({
        title: d,
        data: data[d],
        rootId: `co-culture-plot-${i}`,
        padding: padding,
        dimension: {   
                    width: d3.select(`#co-culture-plot-${i}`).node().clientWidth, 
                    height: d3.select(`#co-culture-plot-${i}`).node().clientWidth
                },
        axis: {
            x: {
                min: xExtent[0],
                max: xExtent[1],
                title: "Dose"
            },
            y: {
                min: 0,
                max: yExtent[1],
                title: "Viability"
            }
        }
    })
})    


plotsConfig.forEach(d=>{
    document.getElementById(`${d.rootId}`).style.height = `${d.dimension.height}px`;
    let plot = new lineplot(d)
    // plots.push(plot)
    //   d3.selectAll(".domain").remove()
})


}

