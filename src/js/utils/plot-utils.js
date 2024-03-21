import * as d3 from "d3";

export function createLatticeData(data, rowField = "rowField", columnField = "columnField") {
    const self = this;
    let groups = d3.groups(data, d => d[rowField], d => d[columnField]);
    //Sort the groups here
    groups.forEach(d => {
      d[1].sort((a, b) => d3.ascending(parseFloat(a[0]), parseFloat(b[0])))
    })
    groups = groups.sort(function (a, b) {
      return d3.ascending(parseFloat(a[0]), parseFloat(b[0]))
    })
    let lattice = groups.map((d, rowIndex) => {
      return d[1].map((e, colIndex) => { 
          return {
            column: colIndex,
            columnName: e[0],
            row: rowIndex,
            rowName: d[0],
            data: e[1]
          }
        })
    }).flat();
    // updateLatticeData(lattice, rootName, padding);
    return lattice;
}
export function updateLatticeLayout(data, rootName="lattice", padding = { top: 10, right: 10, bottom: 10, left: 10 }, grid = {rows: null, columns: null}) {
  const self = this;
  let dimension =  {}, 
  scale = {},
  columns = grid.columns,
  rows = grid.rows;

  dimension.width = d3.select(`#${rootName}`).node().clientWidth;
  dimension.innerWidth =  dimension.width - padding.left - padding.right;

  if (!columns) {
    columns = d3.max(data.map(d=>d.column)) + 1; // add 1 to account for 0 indexing
  } 

  if (!grid.rows) {
    rows = d3.max(data.map(d=>d.row)) + 1; // add 1 to account for 0 indexing
  }
  let xDomain = [...Array(columns).keys()];
  let yDomain = [...Array(rows).keys()];
  scale.x = d3.scaleBand().domain(xDomain).range([padding.left, dimension.innerWidth]);
  dimension.innerHeight = (scale.x.bandwidth() * rows) + padding.top + padding.bottom;
  dimension.height = dimension.innerHeight + padding.top + padding.bottom;

  d3.select(`#${rootName}`).style("height", `${dimension.height}px`);
  scale.y = d3.scaleBand().domain(yDomain).range([padding.top, dimension.innerHeight])

  data.forEach(d=>{
      d.id = `${rootName}-x-${d.column}-${d.row}-y`
      d.x = scale.x(d.column);
      d.y = scale.y(d.row);
      d.width = scale.x.bandwidth();
      d.height = scale.y.bandwidth();
      d.padding = padding;
  })
}
export function updateLatticeCommonXYLayout(data, rootName="lattice", padding = { top: 10, right: 10, bottom: 10, left: 10 }, grid = {rows: null, columns: null}) {
    const self = this;
    let dimension =  {}, 
    scale = {},
    columns = grid.columns,
    rows = grid.rows;

    dimension.width = d3.select(`#${rootName}`).node().clientWidth;
    dimension.innerWidth =  dimension.width - padding.left - padding.right;

    if (!columns) { columns = d3.max(data.map(d=>d.column)) + 1; } // add 1 to account for 0 indexing  
    if (!grid.rows) { rows = d3.max(data.map(d=>d.row)) + 1; } // add 1 to account for 0 indexing

    let addPadding = 33;
    let xSize = (dimension.innerWidth - addPadding) / columns;

    data.forEach(d=>{
      d.id = `${rootName}-x-${d.column}-${d.row}-y`
      let width, height, paddingLeft, paddingBottom;

      if (d.column == 0){
          paddingLeft = padding.left + addPadding;
          width = xSize + addPadding;
      } else {
          paddingLeft = padding.left;
          width = xSize;
      }

      if (d.row == (rows - 1)) {
        paddingBottom = addPadding + padding.bottom;
        height = xSize + addPadding;    
      } else {
        height = xSize;
        paddingBottom = padding.bottom;
      }
      d.padding = {
        left: paddingLeft,
        bottom: paddingBottom,
        top: padding.top,
        right: padding.right
      }
      d.width = width;
      d.height = height;
  })
}
export function updateLatticeCommonYLayout(data, rootName="lattice", padding = { top: 10, right: 10, bottom: 10, left: 10 }, grid = {rows: null, columns: null}) {
  const self = this;
  let dimension =  {}, 
  scale = {},
  columns = grid.columns,
  rows = grid.rows;

  dimension.width = d3.select(`#${rootName}`).node().clientWidth;
  dimension.innerWidth =  dimension.width - padding.left - padding.right;

  if (!columns) { columns = d3.max(data.map(d=>d.column)) + 1; } // add 1 to account for 0 indexing  
  if (!grid.rows) { rows = d3.max(data.map(d=>d.row)) + 1; } // add 1 to account for 0 indexing

  let addPadding = 33;
  let xSize = (dimension.innerWidth - addPadding) / columns;

  data.forEach(d=>{
    d.id = `${rootName}-x-${d.column}-${d.row}-y`
    let width, height, paddingLeft, paddingBottom;

    if (d.column == 0){
        paddingLeft = padding.left + addPadding;
        width = xSize + addPadding;
    } else {
        paddingLeft = padding.left;
        width = xSize;
    }
    paddingBottom = addPadding + padding.bottom;
    height = xSize + addPadding;    
    d.padding = {
      left: paddingLeft,
      bottom: paddingBottom,
      top: padding.top,
      right: padding.right
    }
    d.width = width;
    d.height = height;
})
}

// functions below should be class extensions/methods?? they rely on the class properties
export function plotTitle(config){
  const plot = d3.select(`#${config.rootId}`)
  plot
      .append("div")
      .style("width", `${config.dimension.width}px`)
      .attr("class", "plot-title")
      .style("position", "absolute")
      .style("top", 0)
      .style("left", 0)
      .style("text-align", "center")
      .html(config.title)
}

export function thresholds(config){
  const svg = d3.select(`#${config.rootId}-svg`);
  if (config.axis.x.threshold){
      svg.selectAll(".axis.x .tick line").filter(d=>d== +config.axis.x.threshold ).remove(); 
      svg.select(".axis.x").append("line")
      .attr("class", "tick threshold-line")
      .attr("x1", config.scale.x(config.axis.x.threshold))
      .attr("x2", config.scale.x(config.axis.x.threshold))
      .attr("y1", 0)
      .attr("y2", -config.dimension.innerHeight)
      .attr("stroke-dasharray", "4,4")
      .attr("stroke", "black")
      .attr("stroke-width", "0.75px")
  } 
  if (config.axis.y.threshold){

    svg.selectAll(".axis.y .tick line").filter(d=>d==config.axis.y.threshold).remove()
    svg.select(".axis.y").append("line")
    .attr("class", "tick threshold-line")
    .attr("y1", config.scale.y(config.axis.y.threshold))
    .attr("y2", config.scale.y(config.axis.y.threshold))
    .attr("x1", 0)
    .attr("x2", config.dimension.innerWidth)
    .attr("stroke-dasharray", "4,4")
    .attr("stroke", "black")
    .attr("stroke-width", "0.75px")
}
}
export function xaxis(config){
  const svg = d3.select(`#${config.rootId}-g`), // this should not be so specific
  tickPadding = 2.5;

  const x = d3.axisBottom()
  .scale(config.scale.x)   
  .ticks(config.axis.x.ticks)
  .tickPadding(tickPadding)

  svg.append("g")
  .attr("class", "axis x")
  .attr("transform", `translate(0,${config.dimension.innerHeight})`)
  .call(x)
  svg.selectAll(".domain").remove();

  if (!config.display.xAxisTicks){
    svg.selectAll(".axis.x .tick text").remove()
    }
  if (config.display.xAxisTitle){
      d3.select(`#${config.rootId}-svg`)
      .append("text")
      .attr("class", "axis-title")
      .attr("x", config.dimension.width/2)
      .attr("text-anchor", "middle")
      .attr("y",  config.dimension.height)
      .attr("dy", "-1.0em")
      .html(config.axis.x.title)
  }

}

export function yaxis(config){
  const svg = d3.select(`#${config.rootId}-g`), // this should not be so specific
  tickPadding = 2.5;

  const y = d3.axisLeft(config.scale.y) 
  .ticks(config.axis.y.ticks)
  .tickPadding(tickPadding)

  svg.append("g")
  .attr("class", "axis y")
  .attr("transform", `translate(0,0)`)
  .call(y)

  svg.selectAll(".axis.y .tick line").attr("x1", config.dimension.innerWidth);
  svg.selectAll(".domain").remove();

  if (!config.display.yAxisTicks){
      svg.selectAll(".axis.y .tick text").remove()
  }
  if (config.display.yAxisTitle){
      d3.select(`#${config.rootId}-svg`)
      .append("text")
      .attr("class", "axis-title")
      .attr("transform", `translate(${0},${ config.dimension.height/2})rotate(-90)`)
      .attr("dy", "1.0em")
      .attr("text-anchor", "middle")
      .html(config.axis.y.title)
  }
}

export function showTooltip(config, point, mouse){
  const tooltip = d3.select(`#${config.rootId}-tooltip`);
  let string; 
      string = '';
      config.tooltipConfig.forEach((d,i)=>{
          string += `<b>${d.label}:</b> ${point[d.field]}<br>`
      })

  tooltip
  .html(string)
  .style(`top`, `${mouse[1]-(12*6)}px`) 
  .style(`left`, `${mouse[0]+14 }px`)

  tooltip.transition().duration(50).style("opacity", 1)
}

export function hideTooltip(config){
  const tooltip = d3.select(`#${config.rootId}-tooltip`);
  tooltip.transition().duration(100).style("opacity", 0)
} 