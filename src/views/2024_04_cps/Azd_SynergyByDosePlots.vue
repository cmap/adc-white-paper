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
      <v-row>
        <v-col cols="6"> <span class="plot-title"> AZD5991 Dose  (µM) + A-1331852 Dose  (µM)</span></v-col>
        <v-col cols="4"><svg class="cps-legend"  :id="`${rootName}-legend`"></svg></v-col>
    </v-row>


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

export default {
  name: 'AzdSynergyByDosePlots',
  components: {
  ScatterPlot
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
            d3.csv(`${dataPath}2024_04_cps/A133AZD.csv`, function(d){
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
                neg_log10_qval: +d["neg_log10_qval"],
                synergy_count_across_doses: +d["synergy_count_across_doses"],
                xpr_mcl1: +d["XPR_MCL1"],
              xpr_bclxl: +d["XPR_BCLXL"],
              xpr_bcl2: +d["XPR_BCL2"],
              xpr_bclw: +d["XPR_BCLW"]
            }
            }),
        ]).then(response=>{
            this.data = response[0];
            this.items = [...new Set(this.data.map(d=>d.ccle_name))].sort((a,b)=> d3.ascending(a,b));
            let scatterData = this.createScatterData();
            let plots = this.createLatticeScatterData(scatterData);
         
            plotUtils.updateLatticeCommonXYLayout(plots, this.rootName,  { top: 15, right: 10, bottom: 15, left: 10 } );
            this.setLatticeDisplay(plots);
            this.plots = plots;
            this.loading = false;
        })
    },
    createScatterData(){
        const self = this;
        let data = self.data.map(a => ({...a}))
        data.forEach(d=>{
            // d.x = d.pert2_viability;
            // d.y = d.pert1_viability;
            d.y = d.neg_log10_qval;
            d.x = d.synergy;
         //   d.c = d.combination_viability;
            d.c = d.synergy_count_across_doses;
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
        const cExtent = d3.extent(scatterData.map(d => d.c)) // use [0,1] instead?
        const scatterConfig = {
            xAxisTitle: "AZD5991 Viability",
            yAxisTitle: "A-1331852 Viability",
            cAxisTitle: "Combination Viability"
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
                    title: scatterConfig.xAxisTitle,
                    threshold: 0.5
                    },
                    y: {
                    domain: yExtent,
                    title: scatterConfig.yAxisTitle,
                    threshold: 0.5
                    },
                    c: {
                        type: "sequential",
                        title: scatterConfig.cAxisTitle
                    }
                    
                },
                scale: {
                    c: d3.scaleSequential().domain([0,1]).interpolator(d3.interpolateGnBu)
                },
                display: {},
                tooltipConfig: [
                    {label: "CCLE name", field: "ccle_name"},
                    {label: scatterConfig.xAxisTitle, field: "x"},
                    {label: scatterConfig.yAxisTitle, field: "y"},
                    {label: scatterConfig.cAxisTitle, field: "c"},
                ],
                legend: {
                    rootId:  `${self.rootName}-legend`,
                    padding: {top: 15, right: 15, bottom:15, left: 15}
                },
            }
        })
        return latticeScatterData;
    },

    setLatticeDisplay(plots){
        const maxRow = d3.max(plots.map(d=>d.row));
        plots.forEach((d,i)=> {
            let displayTitle = true,
            displayXAxisTicks, 
            displayYAxisTicks,
            displayXAxisTitle,
            displayYAxisTitle,
            displayLegend = false;
            if(i==0){
                displayLegend = true;
            }

            if (d.row ===  maxRow ) {  displayXAxisTicks = true;  } 
            else { displayXAxisTicks = false; }



            if (d.column === 0) { displayYAxisTicks = true } 
            else { displayYAxisTicks = false }

            if (d.column === 0 && d.row == 2 ) { displayYAxisTitle = true } 
            else { displayYAxisTitle = false }

            if ((d.column === 0 && d.row == maxRow)) { displayXAxisTitle = true } 
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
        console.log(plots.filter(d=>d.config.display.legend))
    },

    },
    watch: {

    }
  }
  </script>
  
  <style>




  </style>
  