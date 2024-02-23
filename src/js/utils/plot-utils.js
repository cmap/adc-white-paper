import * as d3 from "d3";

export function createLatticeData(data, rowField = "pert_dose_anchor", columnField = "pert_dose_varied", rootName = "lattice", padding = { top: 10, right: 10, bottom: 10, left: 10 }) {
    const self = this;
    let groups = d3.groups(data, d => d[rowField], d => d[columnField]);
    console.log(data, rowField, columnField, rootName, padding)
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
     updateLatticeData(lattice, rootName, padding);
    return lattice;
  }

  export function updateLatticeData(data, rootName="lattice", padding = { top: 10, right: 10, bottom: 10, left: 10 }) {
    const self = this;
    let dimension =  {}, 
    scale = {};

    dimension.width = d3.select(`#${rootName}`).node().clientWidth;
    dimension.innerWidth =  dimension.width - padding.left - padding.right;

    scale.x = d3.scaleBand().domain([...new Set(data.map(d=>d.column))]).range([padding.left, dimension.innerWidth]);
    let rows = d3.max(data.map(d=>d.row)) + 1; // add 1 to account for 0 indexing

    dimension.innerHeight = (scale.x.bandwidth() * rows) + padding.top + padding.bottom;
    dimension.height = dimension.innerHeight + padding.top + padding.bottom;

    d3.select(`#${rootName}`).style("height", `${dimension.height}px`);
    scale.y = d3.scaleBand().domain([...new Set(data.map(d=>d.row))]).range([padding.top, dimension.innerHeight])

    data.forEach(d=>{
        d.id = `${rootName}-x-${d.column}-${d.row}-y`
        d.x = scale.x(d.column);
        d.y = scale.y(d.row);
        d.width = scale.x.bandwidth();
        d.height = scale.y.bandwidth();
    })
  }