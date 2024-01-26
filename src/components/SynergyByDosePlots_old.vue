<template>
    <div :id="rootName">
    <ColorMatrix></ColorMatrix>
    <div :id="`${rootName}-plots`">
      <v-row v-for="row in grid" :id="`${rootName}-${row.index}`" :key="row.index" class="plot-row">
        <v-col cols="1" style="margin: auto;"><div class="y-axis-title">-log10 (q value)</div></v-col>
        
        <v-col v-for="column in row.columns"
               cols=""
               class="scatterplot relative-plot-wrapper"
               :key="`${row.index}-${column.index}`"
               :id="`${rootName}-scatterplot-${row.index}-${column.index}`">
            <scatter-plot
              :rootId="`${rootName}-scatterplot-${row.index}-${column.index}`"
              :config="column.config"
              :data="scatterData.filter(d=> d.row === row.name && d.column === column.name)"
              :mouseover.sync="mouseover"
                :click.sync="click"
                :highlight.sync="highlight"
                :multi-select="true"
            >
            </scatter-plot>
        </v-col>
  
      </v-row>
      <v-row>
        <v-col cols="12"><div class="x-axis-title" style="margin: auto;">Synergy</div></v-col>
      </v-row>

    </div>
    </div>
  </template>
  
  <script>
  import * as d3 from 'd3';
  import * as api from '@/js/utils/api.js';
  import {axiosGET, handleAxiosError} from '@/js/utils/api.js';
import ColorMatrix from './ColorMatrix.vue';
import ScatterPlot from '@/plots/scatter-plot.vue';


  let api_url = "https://dev-api.clue.io/api/";
  let email = "clue_demo@clue.io";
  let password = "clue_anonymous";



  export default {
    name: 'SynergyByDosePlots',
    components: {
    ColorMatrix,
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
      loading: false,
      loading: true,
      NoDataResults: null,
      ScatterCommonConfig: {
        padding: {top: 0, right: 0, bottom: 10, left: 0},
        xAxisTitle: "Synergy",
        yAxisTitle: "-log10 (q value)",
      },
      grid: null,
      scatterData: null,
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
          d.row = d.pert_dose_anchor;
          d.column = d.pert_dose_varied;
          d.x = +d.S;
          d.y = +d.neg_log10_qval;
          d.r = 3;
          d.c = d.ccle_name;
          d.label = d.ccle_name;
          d.id = `${d.ccle_name}-${d.pert_dose}`;
          Object.assign(d, self.getSelectionAttributes());
        })
        this.scatterData = scatter;
        this.grid = this.customGrid(scatter); // for vue-bootstrap rows/columns
          console.log(scatter);
        } catch (error) {
        //  handleAxiosError(error, self.$route.fullPath);
        } finally {
          self.loading = false;
        }
      },
          /** unique nested structure for each visualization page */
    customGrid(scatter) {

      let numColumns = [];
      let groups = d3.groups(scatter, d => d.row, d => d.column);
      //const keys = Object.keys((groups[0])[0]);

      //Sort the groups here
      groups.forEach(d => {
        d[1].sort((a, b) => d3.ascending(parseFloat(a[0]), parseFloat(b[0])))
      })
      groups = groups.sort(function (a, b) {
        return d3.descending(parseFloat(a[0]), parseFloat(b[0]))
      })

      let grid = groups
          .map((d, index) => { // rows
            return {
              name: d[0],
              index: index,
              columns: d[1].map((e, i) => { // columns
                numColumns.push(i)
                return {
                  name: e[0],
                  index: i,
                  row: {name: d[0], index: index},
                  column: {name: e[0], index: i}
                }
              })
            }
          })
      grid.forEach(row => {
        row.columns.forEach(column => {
          column.gridInfo = {
            rows: grid.length,
            columns: d3.max(numColumns)
          },
              column.config = this.customScatterConfig(column)
        })
      })
      return grid
      },
      /** unique config for each visualization page */
      customScatterConfig(plot) {
        const self = this;
        let displayXAxisTitle = false,
            displayYAxisTitle = false,
            displayLegend = false,
            displayXAxisTicks, 
            displayYAxisTicks;
        // if (plot.row.index === plot.gridInfo.rows - 1) {
        //   displayXAxisTitle = true;
        // } else {
        //   displayXAxisTitle = false;
        // }
        // if (plot.column.index === 0) {
        //   displayYAxisTitle = true
        // } else {
        //   displayYAxisTitle = false
        // }
        if (plot.row.index === plot.gridInfo.rows - 1) {
          displayXAxisTicks = true;
        } else {
          displayXAxisTicks = false;
        }
        if (plot.column.index === 0) {
          displayYAxisTicks = true
        } else {
          displayYAxisTicks = false
        }
        let xExtent = d3.extent(self.scatterData.map(d => d.x))
        let yExtent = d3.extent(self.scatterData.map(d => d.y))
        // let cExtent = d3.extent(self.scatterData.map(d=>d.c))
        let cExtent = [...new Set(d3.extent(self.scatterData.map(d => d.c)))]
        let scheme = d3.schemeOrRd[5]


        return {
          padding: this.ScatterCommonConfig.padding,
          title: `${plot.column.name} | <span class='light'>${plot.row.name}</span>`,
          axis: {
            x: {
              domain: xExtent,
              title: this.ScatterCommonConfig.xAxisTitle
            },
            y: {
              domain: yExtent,
              title: this.ScatterCommonConfig.yAxisTitle
            },
            c: {
              title: this.ScatterCommonConfig.cAxisTitle,
            }
          },
          scale: {
            c: d3.scaleOrdinal().domain(cExtent).range([scheme[3]])
          },
          display: {title: false, legend: displayLegend, xAxisTitle: displayXAxisTitle, yAxisTitle: displayYAxisTitle, xAxisTicks: displayXAxisTicks, yAxisTicks: displayYAxisTicks},
          mouseEvents: false,
          states: {
            mouseover: null,
            click: [],
            highlight: []
          },
          tooltipConfig: [
            {label: "CCLE name", field: "ccle_name"},
            {label: this.ScatterCommonConfig.xAxisTitle, field: "x"},
            {label: this.ScatterCommonConfig.yAxisTitle, field: "y"},
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
  svg{
    overflow: visible !important;
  }
  .plot-row{
  height: 200px;
  width:100%;
  margin:0px !important;
}

  .relative-plot-wrapper{
  position:relative;
  width:100%;
  height:100%;
}
#scatter-plot-legend{
  width:100%;
}

/* .plot{
  position:relative;
} */
.plot-svg, .plot-canvas{
  position:absolute;
  top:0px;
  left:0px;
}
.plot-svg{
  z-index:1;
  pointer-events: none;
}

  .legend-wrapper{
    width:500px;
    height:500px;
    border: 1px solid black;
    margin:100px;
    position: relative;
  }
  .y-axis-title{
    transform: rotate(-90deg);
    text-align:center;
  }
  .x-axis-title{
    text-align:center;
  }
  </style>
  