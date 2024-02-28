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
        'display': 'inline-block',
        'position': 'relative', 
        'width': `${plot.width}px`, 
        'height': `${plot.height}px`
        }
        ">
      <scatter-plot
        v-if="plot.config.type === 'scatter'"
        :rootId="plot.id"
        :config="plot.config"
        :data="plot.data"
        v-model:mouseover="mouseover"
        v-model:click="click"
        v-model:highlight="highlight"
        >
      </scatter-plot>
      <histogram-plot
      v-else-if = "plot.config.type === 'histogram'"
        :rootId="plot.id"
        :config="plot.config"
        :data="plot.data"
        v-model:mouseover="mouseover"
        v-model:click="click"
        v-model:highlight="highlight"
        >
      </histogram-plot>

    </div>
  </div>
</div>


</template>  
<script>
import * as d3 from 'd3';
import * as plotUtils from '@/js/utils/plot-utils.js';
import ScatterPlot from '@/plots/scatter-plot.vue';
import HistogramPlot from '@/plots/histogram-plot.vue';
//const dataPath = import.meta.env.PROD ? import.meta.env.BASE_URL+"/data/" : "../../data/";


export default {
  name: 'TemoSynergyByDosePlots',
  components: {
  ScatterPlot,
  HistogramPlot
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
  }),
  computed: {

  },
  mounted() {
    const self = this;
    this.launch().then(()=>{
      this.loading = false;
    })
  },
  methods: {
     async launch() {
      const self = this;
      
        let scatterData = self.data.map(a => ({...a})),
            histogramData = self.data.map(a => ({...a})),
            scatterConfig, 
            histogramConfig;

        histogramData.forEach(d=>{
          d.bin = d.synergy;
          d.c = 1;
          d.title = `${d.pert1_name} + ${d.pert2_name}`;
        });
        scatterData.forEach(d=>{
            d.x = d.synergy;
            d.y = d.EXP_MGMT;
            d.c = d.synergy_count;
            d.id = `${d.ccle_name}`;
            d.r = 3;
            d.title = `${d.pert1_name} + ${d.pert2_name}`;
        })
        scatterConfig = {
            title: "temozolomide + O6-benzylguanine",
            xAxisTitle: "Synergy",
            yAxisTitle: "MGMT Expression"
        }
        histogramConfig = {
            title: "temozolomide + O6-benzylguanine",
            xAxisTitle: "Synergy",
            yAxisTitle: "High MGMT Expression Count"
        }

        // group and sort data with attributes for: row,rowName, column, columnName, data
      let latticeScatterData = plotUtils.createLatticeData(scatterData, "pert2_dose", "pert1_dose");
      let latticeHistogramData = plotUtils.createLatticeData(histogramData, "pert2_dose", "pert1_dose");
        latticeScatterData.forEach(d=> {
            d.row = 0; 
            d.type = "scatter";
            d.title = `${d.rowName} + ${d.columnName}`;
        })
        latticeHistogramData.forEach(d=> {
            d.row = 1
            d.type = "histogram";
            d.title = `${d.rowName} + ${d.columnName}`;
        })

      let latticeData = [...latticeScatterData, ...latticeHistogramData];
        // calculate arrtibutes for width, height, x, y for each plot based on number of rows/columns in data or define rows/columns
        plotUtils.updateLatticeData(latticeData, self.rootName, self.LatticePadding, {columns: 7});
    
        const maxRow = d3.max(latticeData.map(d=>d.row));
        const padding = {top: 15, right: 5, bottom: 15, left: 25};
        const xExtent = d3.extent(scatterData.map(d => d.x))
        const yExtent = d3.extent(scatterData.map(d => d.y))
        const cExtent = d3.extent(scatterData.map(d => d.c))

      latticeData.forEach(plot=>{
        let displayXAxisTicks, 
            displayYAxisTicks,
            config;

        if (plot.row ===  maxRow) { displayXAxisTicks = true; } 
        else { displayXAxisTicks = false; }

        if (plot.column === 0) { displayYAxisTicks = true } 
        else { displayYAxisTicks = false }

        switch (plot.type){ // weird to use rowName to determine plot type
          case "histogram":
            config = {
                type: "histogram",
                padding: padding,
                title: plot.title,
                axis: {
                  x: {
                      title: histogramConfig.xAxisTitle
                  },
                  y: {
                      title: histogramConfig.yAxisTitle
                  },
                  c: {
                    colorByThreshold: true,
                    type: "ordinal",
                    range: ["#d73027", "#d73027"],
                    domain: [1,1]
                  },
                },
                display: { 
                  title: true, 
                  legend: false, 
                  xAxisTitle: false, 
                  yAxisTitle:false, 
                  threshold: 0
                }
              }
            break;
          case "scatter":
            config = {
              type: "scatter",
              padding: padding,
              title: plot.title,
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
            };
            break;
        }
        plot.config = config;

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




  </style>
  