<template>
  <div style="position: relative;" :id="rootName">
      <div v-if="loading==false"  v-for="plot in plots" :id="plot.id" class="lattice-plot"
      :style="{'top': `${plot.y}px`, 'left': `${plot.x}px`, 'width': `${plot.width}px`, 'height': `${plot.height}px`}"
      >
      <scatter-plot
        :rootId="plot.id"
        :config="plot.config"
        :data="plot.data"
        :mouseover.sync="mouseover"
        :click.sync="click"
        :highlight.sync="highlight"
        :multi-select="true"
      >
      </scatter-plot>
      </div>
    </div>
</template>  
<script>
import * as d3 from 'd3';
import * as api from '@/js/utils/api.js';
import {axiosGET, handleAxiosError} from '@/js/utils/api.js';
import ScatterPlot from '@/plots/scatter-plot.vue';

let api_url = "https://dev-api.clue.io/api/";
let email = "clue_demo@clue.io";
let password = "clue_anonymous";



export default {
  name: 'SynergyByDosePlots',
  components: {
  ScatterPlot
  },
  props: {
    pert_id: String,
    pert_plate: String,
    project: String,
    screen: String,
    rootName: String
  },
  data: () => ({
    loading: true,
    GlobalConfig: {
      padding: {top: 0, right: 0, bottom: 10, left: 10},
      xAxisTitle: "Synergy",
      yAxisTitle: "-log10 (q value)",
    },
    plots: null,
    // config: null,
    mouseover: null,
    click: [],
    highlight: []
  }),
  computed: {
    params() {
      return {
        pert_id: this.pert_id,
        pert_plate: this.pert_plate,
        project: this.project,
        screen: this.screen
      }
    }
  },
  async created() {
    const self = this;
    const apikey = await api.login(self.$API_URL, self.$ANONYMOUS_EMAIL?.toLowerCase(), self.$ANONYMOUS_PWD);
      if (!apikey) {
        throw "No API Key";
      }
      self.$USER_KEY = apikey;

    await this.getData();
  },
  methods: {
    async getData() {
      const self = this;
      try {
        const responses = await axiosGET([`${api_url}prism-portal/synergy_table?filter=${JSON.stringify(self.params)}`],  `${self.$USER_KEY}`);
        let scatter = responses[0].data;
        scatter.forEach((d, i) => {
        d.pert_iname_varied = d.pert_iname.split("|")[0];
        d.pert_iname_anchor = d.pert_iname.split("|")[1];
        d.pert_dose_varied = d.pert_dose.split("|")[0];
        d.pert_dose_anchor = d.pert_dose.split("|")[1];
        d.x = +d.S;
        d.y = +d.neg_log10_qval;
        d.r = 3;
        d.c = d.ccle_name;
        d.label = d.ccle_name;
        d.id = `${d.ccle_name}-${d.pert_dose}`;
        d.mouseover_id = d.ccle_name;
        Object.assign(d, self.getSelectionAttributes());
      })

      this.plots = this.createLatticeData(scatter);
      // this.config = this.configure();
      console.log(this.plots)
  

      } catch (error) {
        console.error(error)
      //  handleAxiosError(error, self.$route.fullPath);
      } finally {
        self.loading = false;
      }
    },
    createLatticeData(scatter, rowField = "pert_dose_anchor", columnField = "pert_dose_varied") {
      const self = this;
      let groups = d3.groups(scatter, d => d[rowField], d => d[columnField]);
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
              row: rowIndex,
              data: e[1]
            }
          })
      }).flat();
      self.updateLatticeData(lattice);
      return lattice;
    
    },
    updateLatticeData(data) {
      const self = this;
      let dimension =  {}, 
      scale = {};
 
      dimension.width = d3.select(`#${this.rootName}`).node().clientWidth;
      // scale.x = d3.scaleBand().domain([...new Set(data.map(d=>d.column))]).range([0, dimension.width]); // grid based on local data
      scale.x = d3.scaleBand().domain([0,1,2,3,4,5,6]).range([0, dimension.width]); // grid based on global data
      let rows = d3.max(data.map(d=>d.row)) + 1; // add 1 to account for 0 indexing

      dimension.height = scale.x.bandwidth() * rows;
      d3.select(`#${this.rootName}`).style("height", `${dimension.height}px`);
      scale.y = d3.scaleBand().domain([...new Set(data.map(d=>d.row))]).range([0, dimension.height])

      data.forEach(d=>{
          d.id = `${self.rootName}-x-${d.column}-${d.row}-y`
          d.x = scale.x(d.column);
          d.y = scale.y(d.row);
          d.width = scale.x.bandwidth();
          d.height = scale.y.bandwidth();
          d.config = self.configure(data, d);
      })
    },
    // adjSizeForAxisPadding(){

    // },
    configure(plots, plot) {
      console.log(plots, plot)
      const self = this;
      let data = plots.map(d=>d.data).flat();

      let xExtent = d3.extent(data.map(d => d.x))
      let yExtent = d3.extent(data.map(d => d.y))
      let cExtent = [...new Set(d3.extent(data.map(d => d.x)))]
      let displayXAxisTicks, displayYAxisTicks;
      if (plot.row ===  d3.max(plots.map(d=>d.row))) { displayXAxisTicks = true; } 
      else { displayXAxisTicks = false; }
      if (plot.column === 0) { displayYAxisTicks = true } 
      else { displayYAxisTicks = false }
        
        return {
        padding: self.GlobalConfig.padding,
        title: `title`,
        axis: {
            x: {
            domain: xExtent,
            title: self.GlobalConfig.xAxisTitle
            },
            y: {
            domain: yExtent,
            title: self.GlobalConfig.yAxisTitle
            }
        },
        scale: {
            c: d3.scaleOrdinal().domain(cExtent).range(["red", "red"])
        },
        display: {title: true, legend: false, xAxisTitle: false, yAxisTitle: false, xAxisTicks: displayXAxisTicks, yAxisTicks: displayYAxisTicks},
        mouseEvents: true,
        states: {
            mouseover: null,
            click: [],
            highlight: []
        },
        tooltipConfig: [
          {label: "CCLE name", field: "ccle_name"},
          {label: this.GlobalConfig.xAxisTitle, field: "x"},
          {label: this.GlobalConfig.yAxisTitle, field: "y"},
          {label: "Varied|Anchor Compound", field: "pert_iname"},
          {label: "Varied|Anchor Dose", field: "pert_dose"}
        ]
        }
      },
    getSelectionAttributes() {
        return {
            selected: false,
            highlighted: true,
            mouseover: false
        }
      }
    }
  }
  </script>
  
  <style>



.lattice-plot{
  position:absolute;
}

.plot-svg, .plot-canvas{
  position:absolute;
  top:0px;
  left:0px;
}
.plot-svg{
  z-index:1;
  pointer-events: none;
  overflow: visible;
}
.y-axis-title{
  transform: rotate(-90deg);
  text-align:center;
}
.x-axis-title{
  text-align:center;
}
  </style>
  