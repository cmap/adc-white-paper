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
const legendHeight = 150;

export function launch(data, rootId){



   data = data.map(e=>{
        return {
            group: e.cells,
            x: +e.pert_dose,
            y: e.viability,
            r: 3,
            series: e.ratio,
            _info: e
        }
    })

let xExtent = d3.extent(data.map(d=>d.x))
let yExtent = d3.extent(data.map(d=>d.y))



let groups =  d3.groups(data, d => d.group).map(d=>{
    return {
        name: d[0],
        data: d3.groups(d[1], e => e.series).map(e=>{
            return {
                name: e[0],
                data: e[1].sort(function(a,b){ return d3.ascending(a.x, b.x)})
            }
        })
    }
})

groups.forEach(d=>{
    let seriesDomain = [...new Set(d.data.map(d=>d.name))]
    let colorScale = d3.scaleOrdinal(seriesDomain, d3.schemeTableau10)
    d.colorScale = colorScale; // temporary hack!

    d.data.forEach((e,i)=>{
      e.color = colorScale(e.name)
        e.data.forEach(f=>{
            f.color = colorScale(e.name)
        })
    })
})
let plotsConfig = [];
groups.forEach((d,i)=>{
    plotsConfig.push({
        title: d.name,
        data: d.data,
        rootId: `${rootId}-${i}`,
        padding: padding,
        dimension: {   
            width: d3.select(`#${rootId}-${i}`).node().clientWidth, 
            height: d3.select(`#${rootId}-${i}`).node().clientWidth
                //     width: d3.select(`#${rootId}-${i}`).node().clientWidth, 
                //     height: d3.select(`#${rootId}-${i}`).node().clientWidth + legendHeight,
                //    innerWidth: d3.select(`#${rootId}-${i}`).node().clientWidth - padding.left - padding.right,
                //    innerHeight: this.dimension.height - padding.top - padding.bottom
                },
        axis: {
            x: {
                min: xExtent[0],
                max: xExtent[1],
                title: "Concentration"
            },
            y: {
                min: 0,
                max: yExtent[1],
                title: "Viability"
            },
            color: d.colorScale
        }
    })
})


 

    plotsConfig.forEach(d=>{
        document.getElementById(`${d.rootId}`).style.height = `${d.dimension.height}px`;
        let plot = new lineplot(d)



    })


//    let legend = d3.select("#legend")
//    legend.selectAll("rect").data()

}

