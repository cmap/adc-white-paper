<template>
      <div>
      <v-row>
        <v-col cols="6">
          <v-autocomplete
            v-model="click"
            :items="items"
            label="Search cell lines"
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
      <v-col cols="4">
            <small><i>Select legend items to highlight</i></small>
            <svg class="cps-legend" :id="`${rootName}-legend`"></svg>
        </v-col>

    <div class="py-8 lattice-plots" :id="rootName">

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
        <bar-plot 
        v-else-if = "plot.config.type === 'bar'"
        :rootId="plot.id"
        :config="plot.config"
        :data="plot.data"
        v-model:mouseover="mouseover"
        v-model:click="click"
        v-model:highlight="highlight"
        >
        </bar-plot>

    </div>
  </div>
</div>


</template>  
<script>
const dataPath = import.meta.env.PROD ? import.meta.env.BASE_URL+"/data/" : "../../data/";
import * as d3 from 'd3';
import * as plotUtils from '@/js/utils/plot-utils.js';
import * as helpers from '@/js/utils/helpers.js';
import ScatterPlot from '@/plots/scatter-plot.vue';
import HistogramPlot from '@/plots/histogram-plot.vue';
import BarPlot from '@/plots/barplot.vue';
import scatter from '@/plots/scatter';

//const dataPath = import.meta.env.PROD ? import.meta.env.BASE_URL+"/data/" : "../../data/";


export default {
  name: 'Ml210SynergyByDosePlots',
  components: {
  ScatterPlot,
  HistogramPlot,
  BarPlot
  },
  props: {
    rootName: String
  },
  data: () => ({
    loading: true,
    items:[],
    defaulted: [],
    plots: [],
    mouseover: null,
    click: [],
    highlight: [],
    GE_Y_Extent: []
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
            this.items = [...new Set(this.data.map(d=>d.ccle_name))].sort((a,b)=> d3.ascending(a,b));
            let scatterData = this.createScatterData();
            let latticeScatterData = this.createLatticeScatterData(scatterData);
            let geHistogramData = this.createGeBarData();
            let latticeGeHistogramData = this.createLatticeGeBarData(geHistogramData);
            let histogramData = this.createHistogramData();
            let latticeHistogramData = this.createLatticeHistogramData(histogramData);
            let plots = [...latticeScatterData, ...latticeGeHistogramData, ...latticeHistogramData]
            plotUtils.updateLatticeCommonYLayout(plots, this.rootName,  { top: 15, right: 10, bottom: 15, left: 10 } );
            this.setLatticeDisplay(plots);
            this.plots = plots;
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
            Object.assign(d, helpers.getSelectionAttributes())
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
            xAxisTitle: "Synergy",
            yAxisTitle: "GPX4 Dependency",
            cAxisTitle: "Antagonism Count"
        }
       self.GE_Y_Extent = yExtent;
        latticeScatterData.forEach(d=> {
            d.config = {
                title: `${d.columnName} + ${d.rowName}`,
                type: "scatter",
                padding: {},
                axis: {
                    x: {
                    domain: xExtent,
                    title: `${scatterConfig.xAxisTitle} &rarr;`,
                    threshold: "0"
                    },
                    y: {
                    domain: yExtent,
                    title: `${scatterConfig.yAxisTitle} &rarr;`,
                    threshold: false
                    },
                    c: {
                        type: "sequential",
                        title: scatterConfig.cAxisTitle
                    }
                },
                scale: {

                    c: d3.scaleSequential().domain(cExtent).interpolator(d3.interpolateOrRd)
                },
                display: {},
                tooltipConfig: [
                    {label: "CCLE name", field: "ccle_name"},
                    {label: scatterConfig.xAxisTitle, field: "x"},
                    {label: scatterConfig.yAxisTitle, field: "y"},
                    {label: scatterConfig.cAxisTitle, field: "c"}
                ],
                legend: {
                    rootId:  `${self.rootName}-legend`,
                    padding: {top: 15, right: 15, bottom:15, left: 15}
                }
            }
        })
        return latticeScatterData;
    },

    createGeBarData(){
        const self = this;

        let data = self.data.filter(d=> d.pert1_dose == "10").map(a => ({...a}))
        data.forEach(d=>{
            d.bin = d.XPR_GPX4;
        })
        const binExtent = d3.extent(data.map(d => d.bin))
        let histogram = d3.bin()
            .value(function(d) { return +d.bin; })   // I need to give the vector of value
            .domain(binExtent)  // then the domain of the graphic
            .thresholds(25); // then the numbers of bins
        let bar = histogram(data).map(d=> {
            return {
                x0: 0,
                x1: d.length,
                y0: d.x0,
                y1: d.x1,
                y: (d.x0 + d.x1) / 2,
                c: "#cccccc"
            }
        })

        return bar
    },
    createLatticeGeBarData(data){

        const yAxisTitle = "GPX4 Dependency &rarr;";
        const xAxisTitle = "Num cell lines &rarr;"

        const xExtent = d3.extent(data.map(d => d.x1))
      //   const yExtent = d3.extent(data.map(d => d.y0).concat(data.map(d=>d.y1)))
         const yExtent = this.GE_Y_Extent
     return [{
        row: 0,
        column: 7,
        data: data,
        config: {
            title: `test`,
                type: "bar",
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
      }]
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
            
            d.data = histogram(d.data)
            d.data.forEach(d=> {
            if (d.x0 >= 0){
                d.c = d3.schemeRdBu[7][5]
            } else {
                d.c = d3.schemeRdBu[7][1]
            }
            //     d.c = (d.x0 + d.x1) / 2;
            });
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
                        title: xAxisTitle,
                        threshold: "0"
                    },
                    y: {
                        domain: yExtent,
                        title: yAxisTitle
                    },
                    // c: {
                    //     type: "diverging",
                    //     domain: [-1,1]
                    // }
                },
                display: {}
            }
        })
        return latticeData;
    },
    setLatticeDisplay(plots){
        const maxRow = d3.max(plots.map(d=>d.row));
        plots.forEach((d,i)=> {
            let displayTitle = true,
            displayXAxisTicks = true, 
            displayYAxisTicks,
            displayXAxisTitle,
            displayYAxisTitle,
            displayLegend = false;
            if(i==0){
                displayLegend = true;
            }
            if (d.row ===  0 && d.column !=7 ) {  displayTitle = true; } 
            else { displayTitle = false; }

            if (d.column === 0 || d.column == 7 ) { displayYAxisTicks = true } 
            else { displayYAxisTicks = false }

            if (d.column === 0 ) { displayYAxisTitle = true } 
            else { displayYAxisTitle = false }

            if ((d.column === 0 && d.row == maxRow) || d.column == 7) { displayXAxisTitle = true } 
            else { displayXAxisTitle = false }

            let display = { 
                    title: displayTitle, 
                    legend: displayLegend, 
                    xAxisTitle: displayXAxisTitle, 
                    yAxisTitle: displayYAxisTitle, 
                    xAxisTicks: displayXAxisTicks, 
                    yAxisTicks: displayYAxisTicks 
                }
            d.config.display = display;
            d.config.padding = d.padding;
        })
    },

    },
    watch: {

    }
  }
  </script>
