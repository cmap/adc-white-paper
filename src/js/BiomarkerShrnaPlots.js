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


const padding = {top: 50, right: 35, bottom:50, left:65};

export function launch(data){

    let mergeData = []
    Object.keys(data).forEach((d,i)=>{
       data[d] = data[d].map(e=>{
            return {
                x: e.coef,
                y: e.qval,
                r: 3,
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
            title: d,
            data: data[d],
            rootId: `biomarker-shrna-plot-${i}`,
            padding: padding,
            dimension: {   
                        width: d3.select(`#biomarker-shrna-plot-${i}`).node().clientWidth, 
                        height: d3.select(`#biomarker-shrna-plot-${i}`).node().clientWidth
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
    console.log(d)
    document.getElementById(`${d.rootId}`).style.height = `${d.dimension.height}px`;
    let plot = new scatter(d)
    d3.selectAll(".domain").remove()
 })

}




