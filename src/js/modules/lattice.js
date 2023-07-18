
import * as d3 from "d3";
import scatter from './scatter.js';
import barplot from './barplot.js';
import violin from './violin.js';


export default class lattice {
    constructor(data,
        rootId,
        dimension = { width: undefined, height:undefined},
        padding={top: 50, right: 50, bottom:50, left:50},
    ) {

        this.data = data;
        this.rootId = rootId;
        if (dimension.width == undefined){
            dimension.width = d3.select(`#${rootId}`).node().clientWidth;
        }
        if (dimension.height == undefined){
            dimension.height = d3.select(`#${rootId}`).node().clientHeight
        }

        this.dimension = dimension;
        this.padding = padding;
        this.updateDimensions();
        this.createGridScale();
        this.render();
    }

    updateDimensions() {
        this.dimension.innerWidth = this.dimension.width - this.padding.left - this.padding.right;
        this.dimension.innerHeight = this.dimension.height - this.padding.top - this.padding.bottom;
    }
    createGridScale(){
        this.scale = {
            x: d3.scaleBand().domain(this.data.map(d=>d.column)).range([0, this.dimension.innerWidth]),
            y: d3.scaleBand().domain(this.data.map(d=>d.row)).range([0, this.dimension.innerHeight])
        }
    }
    render(){

        d3.select(`#${this.rootId} g`).remove();

        let svg =  d3.select(`#${this.rootId}`)
            .append("g")
            .attr("id", `${this.rootId}-g`)
            .attr("class", "lattice-plots")
            .attr("transform", `translate(${this.padding.left}, ${this.padding.top})`)

      svg.selectAll(".lattice-plot")
            .data(this.data)
            .enter()
            .append("g")
            .attr("class", "lattice-plot")
            .attr("id", d=>`${d.type}-${d.row}-${d.column}`)
            .attr("transform", d=>`translate(${this.scale.x(d.column)}, ${this.scale.y(d.row)})`)
            .each(d=>{
               d.rootId = `${d.type}-${d.row}-${d.column}`
               let grid = {
                row: d.row,
                column: d.column
               }
             //   let rootId = `plot-${d.row}-${d.column}`;
                let dimension = {
                    width: this.scale.x.bandwidth(),
                    height:this.scale.y.bandwidth()
                };
                switch(d.type){
                    case "scatter":
                        new scatter(d.data, d.title, d.axis, d.rootId, dimension, d.padding, d.display)
                        break;
                    case "violin":
                        new violin(d.data, d.title, d.axis, d.rootId, dimension, d.padding, d.displayOptions)
                        break;
                    case "barplot":
                        new barplot(d.data, d.title, d.axis, d.rootId, dimension, d.padding, d.displayOptions, grid)
                        break;
                }
            })
    }
}


