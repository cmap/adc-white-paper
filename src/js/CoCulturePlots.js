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
// CELL LINE is the series???
console.log(data)
let mergeData = []
Object.keys(data).forEach((d,i)=>{
   data[d] = data[d].map(e=>{
        return {
            x: +e.pert_dose,
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
let seriesExtent = [...new Set(mergeData.map(d=>d.series))]
let colorScale = d3.scaleSequential().interpolator(d3.interpolateHcl("purple", "#ffd46e")).domain([0, seriesExtent.length])

let plotsConfig = []
Object.keys(data).forEach((d,i)=>{

    let series = d3.groups(data[d], d => d.series).sort((a, b) => {
        return d3.ascending(a[0], b[0])
    }).map((d,i) => {
        return {
            series: d[0],
            color: colorScale(i),
            data: d[1].sort(function(a,b){ return d3.ascending(a.x, b.x)}),
        }
    })

    plotsConfig.push({
        title: d,
        data: series,
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
})


}

