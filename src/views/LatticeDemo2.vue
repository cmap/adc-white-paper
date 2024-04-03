<template>
  <div v-if="loading==false">
    <div class="lattice-id">
      <div v-for="plot in latticePlots" :id="plot.id" class="lattice-plot"
      :style="{'top': `${plot.y}px`, 'left': `${plot.x}px`, 'width': `${plot.width}px`, 'height': `${plot.height}px`}"
      >
      <scatter-plot
              :rootId="plot.id"
              :config="config"
              :data="plot.data"
              :mouseover.sync="mouseover"
                :click.sync="click"
                :highlight.sync="highlight"
                :multi-select="true"
            >
            </scatter-plot>
      </div>
    </div>
  

  </div>
</template>
<script>


import ScatterPlot from '@/plots/scatter-plot.vue';

import * as d3 from 'd3';
export default {
  name: 'LatticeDemo2',
  components: {
    ScatterPlot
  },
  props: {

  },
  data: () => ({
    loading: false,
    latticePlots: null,
    data: null,
    config: null,
    mouseover: null,
    click:null,
    highlight: null
  }),
  computed: {

  },

 async created() {
   await this.createLattice();

  },
  methods: {
    async createLattice(){
      let grid = {
        rows: 5,
        columns: 5
      }
      let data = [...Array(grid.rows * grid.columns).keys()].map((d, i) => {
        return {
          id: i,
          row: Math.floor(i / grid.columns),
          column: i % grid.columns,
          data: [...Array(30).keys()].map((d,i)=>{
            return {
              x: Math.random()*10,
              y: Math.random()*10,
              c: Math.random()*10,
              r: 5,
              id: i

            }
          })
        }
      })
      let dimension =  {width: 1000, height: 1000 }
      let scale = {
            x: d3.scaleBand().domain([...new Set(data.map(d=>d.column))]).range([0, dimension.width]),
            y: d3.scaleBand().domain([...new Set(data.map(d=>d.row))]).range([dimension.height, 0])
        }
        let flat = [];
        data.forEach(d=>{
            d.id = `x-${d.column}-${d.row}-y`
            d.x = scale.x(d.column);
            d.y = scale.y(d.row);
            d.width = scale.x.bandwidth();
            d.height = scale.y.bandwidth();
            d.data.forEach(e=> flat.push(e))
        })
        this.latticePlots = data;
        this.config = this.configure(flat);
        },      
        configure(data) {
                const self = this;
                let xExtent = d3.extent(data.map(d => d.x))
                let yExtent = d3.extent(data.map(d => d.y))
                let cExtent = [...new Set(d3.extent(data.map(d => d.x)))]
                
                return {
                padding: {top: 10, right: 0, bottom: 20, left: 0},
                title: `title`,
                axis: {
                    x: {
                    domain: xExtent,
                    title: "x"
                    },
                    y: {
                    domain: yExtent,
                    title: "y"
                    },
                    c: {
                    title: "c",
                    }
                },
                scale: {
                    c: d3.scaleOrdinal().domain(cExtent).range(["red", "red"])
                },
                display: {title: true, legend: false, xAxisTitle: true, yAxisTitle: true, xAxisTicks: true, yAxisTicks: true},
                mouseEvents: false,
                states: {
                    mouseover: null,
                    click: [],
                    highlight: []
                },
                tooltipConfig: [
                    {label: "x", field: "x"}
                ]
                }
        },

  },
  watch: {

  }
}
</script>

<style>
  /* #lattice-id{
    width:1000;
    height:1000;
    position:relative;
  }

.lattice-plot{
position:absolute;
  border: 1px solid black;

} */
</style>
