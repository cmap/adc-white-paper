<template>
  <div>
      <v-autocomplete
          v-model="click"
          :items="items"
          label="Search cell lines to highlight"
          multiple
          chips
          closable-chips
          clearable
          variant="underlined"
          elevation="0"
      >
      </v-autocomplete>
      <!-- <v-btn size="x-small" variant="tonal" color="primary" @click="clickDefault">Highlight ERBB2 (HER2) overexpressing cell lines</v-btn> -->
  <div style="position: relative; " :id="rootName">
      <div v-if="loading==false"  v-for="plot in plots" :id="plot.id" class="lattice-plot"
      :style="{'top': `${plot.y}px`, 'left': `${plot.x}px`, 'width': `${plot.width}px`, 'height': `${plot.height}px`}"
      >
      <!-- <div v-if="plot.row==0" style="position:absolute; top:0px; left:0px; width:100%; height:100%; pointer-events: none !important; text-align:center">{{  plot.columnName }}</div> -->
      <scatter-plot
        :rootId="plot.id"
        :config="plot.config"
        :data="plot.data"
        v-model:mouseover="mouseover"
        v-model:click="click"
        v-model:highlight="highlight"
        >
      </scatter-plot>
      </div>
    </div>
  </div>
</template>  
<script>
import * as d3 from 'd3';
import * as api from '@/js/utils/api.js';
import {axiosGET, handleAxiosError} from '@/js/utils/api.js';
import ScatterPlot from '@/plots/scatter-plot.vue';


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
    items:[],
    // selected: ["BT474", "EFM192A", "HCC1419", "KYSE410", "MKN7", "NCIH2170", "NCIN87", "OE19", "SKOV3", "TE4"],
    defaulted: ["AGS_STOMACH"],
    GlobalConfig: {
      padding: {top: 0, right: 0, bottom: 10, left: 10},
      xAxisTitle: "Synergy",
      yAxisTitle: "-log10 (q value)",
    },
    plots: null,
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
    this.click = this.defaulted;
  },
  methods: {
    async getData() {
      const self = this;
      try {
        const responses = await axiosGET([`${self.$API_URL}prism-portal/synergy_table?filter=${JSON.stringify(self.params)}`],  `${self.$USER_KEY}`);
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
        d.id = d.ccle_name;
        Object.assign(d, self.getSelectionAttributes());
      })
      this.items = [...new Set(scatter.map(d=>d.ccle_name))].sort()
      this.plots = this.createLatticeData(scatter);

      } catch (error) {
        console.error(error)
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
              columnName: e[0],
              row: rowIndex,
              rowName: d[0],
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
    configure(plots, plot) {
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
        title: `${plot.columnName} | ${plot.rowName}`,
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
    },
    watch: {

    }
  }
  </script>
  
  <style>

.plot-tooltip, #plot-tooltip{
  position:absolute !important;
  white-space: nowrap;
  font-size:12px;
  line-height: 1.5em;
  background:white !important;
  z-index: 10000;
  padding:.5em;
  box-shadow: 0.5px 0.5px 10px 0px rgba(141, 137, 137, 0.5) !important; 
  min-width:200px;
  pointer-events: none !important;
}

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
  pointer-events: none !important;
  overflow: visible;
}
/* .y-axis-title{
  transform: rotate(-90deg);
  text-align:center;
}
.x-axis-title{
  text-align:center;
} */
  </style>
  