import * as d3 from "d3";

export function createLatticeData(data, rowField = "pert_dose_anchor", columnField = "pert_dose_varied", rootName = "lattice") {
    const self = this;
    let groups = d3.groups(data, d => d[rowField], d => d[columnField]);
    //Sort the groups here
    groups.forEach(d => {
      d[1].sort((a, b) => d3.ascending(parseFloat(a[0]), parseFloat(b[0])))
    })
    groups = groups.sort(function (a, b) {
      return d3.descending(parseFloat(a[0]), parseFloat(b[0]))
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
     updateLatticeData(lattice, rootName);
    return lattice;
  }

  export function updateLatticeData(data, rootName="lattice") {
    const self = this;
    let dimension =  {}, 
    scale = {},
    left = 0,
    top = 0;

    dimension.width = d3.select(`#${rootName}`).node().clientWidth;
    scale.x = d3.scaleBand().domain([0,1,2,3,4,5,6]).range([left, dimension.width]); // grid based on global data
    let rows = d3.max(data.map(d=>d.row)) + 1; // add 1 to account for 0 indexing

    dimension.height = scale.x.bandwidth() * rows;
    d3.select(`#${rootName}`).style("height", `${dimension.height}px`);
    scale.y = d3.scaleBand().domain([...new Set(data.map(d=>d.row))]).range([top, dimension.height])

    data.forEach(d=>{
        d.id = `${rootName}-x-${d.column}-${d.row}-y`
        d.x = scale.x(d.column);
        d.y = scale.y(d.row);
        d.width = scale.x.bandwidth();
        d.height = scale.y.bandwidth();
        // d.config = self.configure(data, d);
    })
  }