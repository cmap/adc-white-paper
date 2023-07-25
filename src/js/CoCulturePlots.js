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
    let xValues = [...new Set(data.map(d=>d.x))]
   
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


   let colorPallets = [["#d0d1e6","#a6bddb","#74a9cf","#2b8cbe","#045a8d"], ["#bfd3e6","#9ebcda","#8c96c6","#8856a7","#810f7c"]]
 //   colorPallet = ["#440154","#3b528b","#21918c","#5ec962","#fde725"];
    groups.forEach((d, index)=>{
        let seriesDomain = [...new Set(d.data.map(d=>d.name))]
        // let colorScale = d3.scaleOrdinal(seriesDomain, colorPallet)
        // d.colorScale = colorScale; 
        let colorScale = d3.scaleOrdinal(seriesDomain, colorPallets[index])
        d.colorScale = colorScale; 

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
            title: `${d.data[0].data[0]._info.compound}: ${d.name}`,
            data: d.data,
            rootId: `${rootId}-${i}`,
            padding: padding,
            dimension: {   
                width: d3.select(`#${rootId}-${i}`).node().clientWidth, 
                height: d3.select(`#${rootId}-${i}`).node().clientWidth
                    },
            axis: {
                x: {
                    min: xExtent[0],
                    max: xExtent[1],
                    title: "Concentration",
                    tickValues: xValues
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

