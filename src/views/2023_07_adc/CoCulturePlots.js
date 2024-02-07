import * as d3 from 'd3';
import lineplot from '../../js/modules/lineplot.js';



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

    // let PuBl = ["#800F7A", "#87429B", "#8E75BC", "#95A8DD", "#9CD9FC"] 
    // let BlPu = ["#04598B", "#406BA5", "#7C7EBE", "#B891D7", "#F4A4F0"]
// let colorPallets = [PuBl, BlPu]

   let colorPallets = [["#d0d1e6","#a6bddb","#74a9cf","#2b8cbe","#045a8d"], ["#bfd3e6","#9ebcda","#8c96c6","#8856a7","#810f7c"]]
   
    groups.forEach((d, index)=>{
        let seriesDomain = [...new Set(d.data.map(d=>d.name))].sort()
        let colorScale = d3.scaleOrdinal(seriesDomain, colorPallets[index])
        d.colorScale = colorScale; 

        d.data.forEach((e,i)=>{
        e.color = colorScale(e.name)
            e.data.forEach(f=>{
                f.color = colorScale(e.name)
            })
        })
    })

    let getLegendTitle = (name)=>{
        if (name == "HCC1806"){
            return `NCIN87 : HCC1806 Cell Ratio`
            
        } else {
            return `HCC1806 : NCIN87 Cell Ratio`
        }
    }


    let plotsConfig = [];
    groups.forEach((d,i)=>{
        plotsConfig.push({
            title: `${d.data[0].data[0]._info.compound} - ${d.name}`,
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
                }
            },
            legend: {
                display: true,
                title: getLegendTitle(d.name),
                scale: d.colorScale
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

