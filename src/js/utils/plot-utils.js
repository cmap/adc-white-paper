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

  export function updateLatticeData(data, rootName="lattice", padding = { top: 10, right: 10, bottom: 10, left: 10 }, grid = {rows: null, columns: null}) {
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
    })
  }
  export function updateLatticeLayout(data, rootName="lattice", padding = { top: 10, right: 10, bottom: 10, left: 10 }, grid = {rows: null, columns: null}) {
    const self = this;
    let dimension =  {}, 
    scale = {},
    columns = grid.columns,
    rows = grid.rows;

    dimension.width = d3.select(`#${rootName}`).node().clientWidth;
    dimension.innerWidth =  dimension.width - padding.left - padding.right;

    if (!columns) { columns = d3.max(data.map(d=>d.column)) + 1; } // add 1 to account for 0 indexing  
    if (!grid.rows) { rows = d3.max(data.map(d=>d.row)) + 1; } // add 1 to account for 0 indexing

    let addPadding = 35;
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

  let addPadding = 25;
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