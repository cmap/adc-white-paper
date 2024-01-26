<template>
    <div>
      <div id="test-id">


      </div>

    </div>
  </template>
  
  <script>
  import lattice from '@/js/modules/lattice';
  import * as d3 from 'd3';


  export default {
    name: 'LatticeGrid',
    components: {
    },
    props: {

    },
    data: () => ({
      // rootName: "lattice",
      grid: null
    }),
    computed: {
      
    },
    mounted(){
      let self = this;
      let grid = {
        rows: 5,
        columns: 5
      }
      let data = [...Array(grid.rows * grid.columns).keys()].map((d, i) => {
        return {
          id: i,
          row: Math.floor(i / grid.columns),
          column: i % grid.columns,
          data: [...Array(30).keys()].map(d=>{
            return {
              x: Math.random()*10,
              y: Math.random()*10
            }
          })
        }
      })

let latticePlots = new lattice(data, "test-id")


console.log(latticePlots)



    },

    methods: {
       processGrid(data) {
          var rows = Math.ceil(Math.sqrt(data.length));
          var columns = rows;
          var cell = 0;	
          for (var i = 0; i < rows; i++) {
              for (var j = 0; j < columns; j++) {	
                if (data[cell]) {	
                    data[cell].x = j;
                    data[cell].y = i;	
                    cell++;	
                }
                else {
                  break;
                }
              }
          }
          return data;
        }
    }
  }
  </script>
  
  <style>
  #test-id{
    width:100%;
    height:50vh;
  }
  </style>
  