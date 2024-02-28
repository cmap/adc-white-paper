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
        :style="{
        'display': 'inline-block',
        'position': 'relative', 
        'width': `${plot.width}px`, 
        'height': `${plot.height}px`
        }">
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
const dataPath = import.meta.env.PROD ? import.meta.env.BASE_URL+"/data/" : "../../data/";
import * as d3 from 'd3';
import * as plotUtils from '@/js/utils/plot-utils.js';
import ScatterPlot from '@/plots/scatter-plot.vue';
import HistogramPlot from '@/plots/histogram-plot2.vue';


//const dataPath = import.meta.env.PROD ? import.meta.env.BASE_URL+"/data/" : "../../data/";


export default {
  name: 'Ml210SynergyByDosePlots2',
  components: {
  ScatterPlot,
  HistogramPlot
  },
  props: {
    rootName: String
  },
  data: () => ({
    loading: true,
    items:[],
    defaulted: [],
    LatticePadding: {top: 0, right: 0, bottom: 0, left: 0},
    plots: [],
    mouseover: null,
    click: [],
    highlight: []
  }),
  computed: {

  },
//   mounted() {
//     const self = this;
//     this.launch().then(()=>{
//       this.loading = false;
//     })
//   },
async created() {
 await this.loadData()

  },
  methods: {
    async loadData(){
        this.loading = true;
        Promise.all([
            d3.csv(`${dataPath}2024_04_cps/ml210_ferro_data.csv`, function(d){
            return {
                ccle_name: d["ccle_name"],
                culture: d["culture"],
                pert1_name: d["pert1"],
                pert2_name: d["pert2"],
                pert1_dose: d["dose1"],
                pert2_dose: d["dose2"], 
                pert1_viability: +d["capped_library"],
                pert2_viability: +d["capped_anchor"],
                combination_viability: +d["capped_combination"],
                synergy: +d["S"],
                antagonism_count: +d["antagonism_count_across_doses"],
                XPR_GPX4: +d["XPR_GPX4"]
            }
            }),
        ]).then(response=>{
            this.data = response[0];
            let scatterData = this.createScatterData();
            let latticeScatterData = this.createLatticeScatterData(scatterData);
            let histogramData = this.createHistogramData();
            let latticeHistogramData = this.createLatticeHistogramData(histogramData);
            // combine scatter and histogram data for optimizing lattice layout
            let plots = latticeScatterData.concat(latticeHistogramData);
            const maxRow = d3.max(plots.map(d=>d.row));
            plotUtils.updateLatticeLayout(plots, this.rootName);
            this.setLatticeDisplay(plots);
            // plots.forEach(d=>{
            //     let displayXAxisTicks, 
            //     displayYAxisTicks,
            //     displayXAxisTitle,
            //     displayYAxisTitle;

            //     if (d.row ===  maxRow) {  displayXAxisTicks = true;  } 
            //     else { displayXAxisTicks = false; }

            //     if (d.column === 0) { displayYAxisTicks = true } 
            //     else { displayYAxisTicks = false }

            //     if (d.column === 0 && d.row == 0) { displayYAxisTitle = true } 
            //     else { displayYAxisTitle = false }

            //     if (d.column === 0 && d.row == maxRow) { displayXAxisTitle = true } 
            //     else { displayXAxisTitle = false }
            //     d.config.padding = d.padding;
            //     d.config.display = { 
            //         title: true, 
            //         legend: false, 
            //         xAxisTitle: displayXAxisTitle, 
            //         yAxisTitle: displayYAxisTitle, 
            //         xAxisTicks: displayXAxisTicks, 
            //         yAxisTicks: displayYAxisTicks 
            //     }
            // })

this.plots = plots;
           // this.plots = latticeScatterData.concat(latticeHistogramData);
            this.loading = false;
        })
    },
    createScatterData(){
        const self = this;
        let data = self.data.map(a => ({...a}))
        data.forEach(d=>{
            d.x = d.synergy;
            d.y = d.XPR_GPX4;
            d.c = d.antagonism_count;
            d.id = `${d.ccle_name}`;
            d.r = 3;
        })
        return data;
    },
    createLatticeScatterData(scatterData){
        const self = this;
        let latticeScatterData = plotUtils.createLatticeData(scatterData, "pert2_dose", "pert1_dose");
        const xExtent = d3.extent(scatterData.map(d => d.x))
        const yExtent = d3.extent(scatterData.map(d => d.y))
        const cExtent = d3.extent(scatterData.map(d => d.c))
        const scatterConfig = {
            xAxisTitle: "Synergy &rarr;",
            yAxisTitle: "MGMT Expression &rarr;"
        }
       
        latticeScatterData.forEach(d=> {
            d.config = {
                title: `${d.rowName} + ${d.columnName}`,
                type: "scatter",
                padding: {},
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
                display: {},
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
        return latticeScatterData;
    },
    createHistogramData(){
        const self = this;
        let data = self.data.map(a => ({...a}))
        data.forEach(d=>{
            d.x = d.synergy;
            d.y = d.XPR_GPX4;
        })
        return data;


    },
    createLatticeHistogramData(data){
        const self = this;
        let latticeData = plotUtils.createLatticeData(data, "pert2_dose", "pert1_dose");
        const xExtent = d3.extent(data.map(d => d.x))
        let yValues = []

        latticeData.forEach(d=> {
            d.row = 1;
            let histogram = d3.bin()
            .value(function(d) { return +d.x; })   // I need to give the vector of value
            .domain(xExtent)  // then the domain of the graphic
            .thresholds(25); // then the numbers of bins
            
            d.data = histogram(d.data);
            yValues.push(d3.max(d.data.map(d=>d.length)))
        })
        const yExtent = [0, d3.max(yValues)]
        const xAxisTitle = "Synergy &rarr;";
        const yAxisTitle = "Num cell lines &rarr;"
        
        latticeData.forEach(d=> {
            d.config = {
                title: `${d.rowName} + ${d.columnName}`,
                type: "histogram",
                padding: {},
                axis: {
                    x: {
                    domain: xExtent,
                    title: xAxisTitle
                    },
                    y: {
                    domain: yExtent,
                    title: yAxisTitle
                    }
                },
                display: {}
            }
        })
        return latticeData;
    },
    setLatticeDisplay(plots){
        const maxRow = d3.max(plots.map(d=>d.row));
        plots.forEach(d=> {
            let displayXAxisTicks, 
            displayYAxisTicks,
            displayXAxisTitle,
            displayYAxisTitle;

            if (d.row ===  maxRow) {  displayXAxisTicks = true;  } 
            else { displayXAxisTicks = false; }

            if (d.column === 0) { displayYAxisTicks = true } 
            else { displayYAxisTicks = false }

            if (d.column === 0) { displayYAxisTitle = true } 
            else { displayYAxisTitle = false }

            if (d.column === 0 && d.row == maxRow) { displayXAxisTitle = true } 
            else { displayXAxisTitle = false }

            let display = { 
                    title: true, 
                    legend: false, 
                    xAxisTitle: displayXAxisTitle, 
                    yAxisTitle: displayYAxisTitle, 
                    xAxisTicks: displayXAxisTicks, 
                    yAxisTicks: displayYAxisTicks 
                }
            d.config.display = display;
            d.config.padding = d.padding;
        })
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
  