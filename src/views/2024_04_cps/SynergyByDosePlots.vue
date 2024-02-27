<template>
      <div>
      <v-row>
        <v-col cols="6">
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
        </v-col>
      </v-row>

    <div class="lattice-plots" :id="rootName">

      <div v-for="plot in plots" 
      :id="plot.id" 
      class="lattice-plot" 
      :style="
      {
        'position': 'absolute', 
        'top': `${plot.y}px`, 
        'left': `${plot.x}px`, 
        'width': `${plot.width}px`, 
        'height': `${plot.height}px`
        }
        ">
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
import * as plotUtils from '@/js/utils/plot-utils.js';
import ScatterPlot from '@/plots/scatter-plot.vue';
//const dataPath = import.meta.env.PROD ? import.meta.env.BASE_URL+"/data/" : "../../data/";


export default {
  name: 'SynergyByDosePlots',
  components: {
  ScatterPlot
  },
  props: {
    data: Array,
    rootName: String,
    combinationName: String
  },
  data: () => ({
    loading: true,
    items:[],
    defaulted: [],
    LatticePadding: {top: 40, right: 40, bottom: 0, left: 0},
    plots: [],
    mouseover: null,
    click: [],
    highlight: []
    // firstRow: null,
    // lastColumn: null,
    // rowsTitle: null,
    // columnsTitle: null,
  }),
  computed: {

  },
  // async created() {
  //   const self = this;
  //   try {
  //     await this.setupPlot();
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     this.loading = false;
  //   }

  // },
  mounted() {
    const self = this;
    this.launch().then(()=>{
      this.loading = false;
    })
  },
  methods: {
     async launch() {
      const self = this;
      
      let scatterData = self.data.map(a => ({...a}))
      let histogramData = self.data.map(a => ({...a}))
      let latticeData;
      let scatterConfig;

      switch (this.combinationName){
          case "temo_benzyl":  
        histogramData.forEach(d=>{
          d.bin = d.synergy;
          d.c = 1;
        });
          scatterData.forEach(d=>{
            d.x = d.synergy;
            d.y = d.ge_mgmt;
            d.c = d.synergy_count;
            d.id = `${d.ccle_name}-${d.culture}`;
            d.r = 3;
            d.rowField = d.pert2_dose;
            d.columnField = d.pert1_dose;
          })
          scatterConfig = {
            title: "temozolomide + O6-benzylguanine",
            xAxisTitle: "Synergy",
            yAxisTitle: "MGMT Expression"
          }

          latticeData = plotUtils.createLatticeData(scatterData, "rowField", "columnField")

        let latticeData2 = latticeData.map(a => ({...a}))
        latticeData2.forEach(d=> d.row = 1)
        latticeData = latticeData.concat(latticeData2)
          break;
          case "ml210_ferro":
          scatterData.forEach(d=>{
              d.x = d.synergy;
              d.y = d.xpr_gpx4;
              d.c = d.antagony_count;
              d.id = `${d.ccle_name}-${d.culture}`;
              d.r = 3;
              d.rowField = d.pert2_dose;
              d.columnField = d.pert1_dose;
            })
          scatterConfig = {
            title: "ML210 + ferrostatin-1",
            xAxisTitle: "Synergy",
            yAxisTitle: "GPX4 Dependency"
          }
          latticeData = plotUtils.createLatticeData(scatterData, "rowField", "columnField")
          break;
          case "azd_a133":
            scatterData.forEach(d=>{
              d.x = d.pert1_viability;
              d.y = d.pert2_viability;
              d.c = d.combination_viability;
              d.id = `${d.ccle_name}-${d.culture}`;
              d.r = 3;
              d.rowField = d.pert2_dose;
              d.columnField = d.pert1_dose;
            })
          scatterConfig = {
            title: "A-1331852 + AZD5991",
            xAxisTitle: "A-1331852 Viability",
            yAxisTitle: "AZD5991 Viability"
          }
          latticeData = plotUtils.createLatticeData(scatterData, "rowField", "columnField")
      }

      // should some of this be done in a 'lattice' component??? ie: on for use on the portal
    //  let latticeData = plotUtils.createLatticeData(scatterData, "rowField", "columnField")
      // let latticeData2 = latticeData;
      // latticeData2.forEach(d=> d.row = 1)
      // latticeData = latticeData.concat(latticeData2)

      plotUtils.updateLatticeData(latticeData, self.rootName, self.LatticePadding, {columns: 7})
    
      let xExtent = d3.extent(scatterData.map(d => d.x))
      let yExtent = d3.extent(scatterData.map(d => d.y))
      let cExtent = d3.extent(scatterData.map(d => d.c))
      let maxRow = d3.max(latticeData.map(d=>d.row));
      latticeData.forEach(plot=>{
        let displayXAxisTicks, displayYAxisTicks;
        if (plot.row ===  maxRow) { displayXAxisTicks = true; } 
        else { displayXAxisTicks = false; }

        if (plot.column === 0) { displayYAxisTicks = true } 
        else { displayYAxisTicks = false }

        plot.config = {
          padding: {top: 15, right: 5, bottom: 15, left: 25},
          title: `${plot.columnName} + ${plot.rowName}`,
          axis: {
            x: {
              domain: xExtent,
              title: scatterConfig.xAxisTitle,
              threshold: 0
            },
              y: {
              domain: yExtent,
              title: scatterConfig.yAxisTitle
            }
          },
          scale: {
              c: d3.scaleLinear().domain(cExtent).range(["grey", "red"])
          },
          display: { title: true, legend: false, xAxisTitle: false, yAxisTitle: false, xAxisTicks: displayXAxisTicks, yAxisTicks: displayYAxisTicks },
          tooltipConfig: [
            {label: "CCLE name", field: "ccle_name"},
            {label: scatterConfig.xAxisTitle, field: "x"},
            {label: scatterConfig.yAxisTitle, field: "y"},
            {label: "Pert1", field: "pert1_name"},
            {label: "Pert2", field: "pert2_name"},
            {label: "Pert1 Dose", field: "pert1_dose"},
            {label: "Pert2 Dose", field: "pert2_dose"},
            {label: "Pert1 Viability", field: "pert1_viability"},
            {label: "Pert2 Viability", field: "pert2_viability"}
          ]
        }
        
      })


      this.plots = latticeData; // set plots to data to render plots in template
      this.click = this.defaulted;
      this.items = [...new Set(self.data.map(d=>d.ccle_name))].sort(); 
      console.log(this.plots)


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
  /* #azd_a133_synergy_plots{
    width:80% !important;
  } */
.lattice-plots{
  position: relative;
  width:1000px;
  height:100%;
  min-width:768px;
}
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


.plot-svg, .plot-canvas{
  position:absolute;
  top:0px;
  left:0px;
}
.plot-svg{
  z-index:1;
  pointer-events: none !important;

}
.rotate{
  -moz-transform: translateX(-50%) translateY(-50%) rotate(-90deg);
  -webkit-transform: translateX(-50%) translateY(-50%) rotate(-90deg);
  transform:  translateX(-50%) translateY(-50%) rotate(-90deg);
}
.tick > text{
  font-size: 9px !important;
  fill: #000;
}
.axis-title{
  font-size:11.5px !important;
  font-weight:500 !important;
  color:#454545;
  fill: #454545;
}
.plot-title{
  font-size:11.5px !important;
  font-weight:700 !important;

  /* text-overflow: clip; */
  white-space: nowrap;
}
.x-axis-title{
  position: absolute;
  bottom:0px;
  left:45%;
}
.y-axis-title{
  position: absolute;
  bottom:50%;
  left:-10px;
  line-height:0px;
  -moz-transform: translateX(-50%) translateY(-50%) rotate(-90deg);
  -webkit-transform: translateX(-50%) translateY(-50%) rotate(-90deg);
  transform:  translateX(-50%) translateY(-50%) rotate(-90deg);
}



@media screen and (min-width: 200px) and (max-width: 768px) {



}
  </style>
  