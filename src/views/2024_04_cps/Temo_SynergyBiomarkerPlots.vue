<template>
      <div>
        <v-row>
        <v-col cols="6">
          <v-autocomplete
            v-model="click"
            :items="items"
            label="Search top 100 features"
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
        <v-col cols="7">
            <small><i>Select legend items to highlight</i></small>
            <svg class="cps-legend" :id="`${rootName}-legend`"></svg>
        </v-col>
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
const fileName = "temoO6_highMGMT_biomarkers.csv"
import * as d3 from 'd3';
import * as plotUtils from '@/js/utils/plot-utils.js';
import * as helpers from '@/js/utils/helpers.js';
import ScatterPlot from '@/plots/scatter-plot.vue';
import { nextTick } from 'vue';

export default {
  name: 'TemoSynergyBiomarkerPlots',
  components: {
    ScatterPlot
  },
  props: {
    rootName: String
  },
  data: () => ({
    loading: true,
    items:[],
    defaulted: ["MSH2", "MSH6"],
    plots: [],
    mouseover: null,
    click: ["MSH2", "MSH6"],
    highlight: [],
    featureTypeLabel: {
        "EXP": "Gene Expression",
        "RPPA": "Proteomics",
        "CN": "Copy Number",
        "XPR": "CRISPR Knock-Out",
        "REP": "Repurposing Compounds"
    }
  }),
  computed: {

  },
async created() {
    await this.loadData()

  },
  methods: {
    async loadData(){
        this.loading = true;
        const self = this;
        Promise.all([
            d3.csv(`${dataPath}2024_04_cps/${fileName}`, function(d,i){
                let string = d.y.split("::");
                return {
                    feature: d["feature"].replace("Caution_", ""),
                    correlation: d["rho"],
                    qvalue: +d["q.val"],
                    neg_log10_qval: d["neg_log10_qval"],
                    pert1_name: string[0],
                    pert2_name: string[1],
                    pert1_dose: string[2],
                    pert2_dose: string[3],
                    feature_type: self.featureTypeLabel[d["feature.set"]],
                    id: d["y"]
                }
            }),
        ])
        .then(response=>{
            this.data = response[0].sort((a,b)=>d3.descending(+a.qvalue, +b.qvalue));
            this.data.filter(d=> d.feature_type=="Proteomics").forEach(d=>{
                
            let split = d.feature.split("_");
            let parsed;
                if (split[0]==split[1]){
                    parsed = split[0]
                } else {
                    parsed = d.feature
                }
                d.feature = parsed;
            })
            let scatterData = this.createScatterData();
            let plots = this.createLatticeScatterData(scatterData);
            let items = []
            plots.forEach(d=>{
                d.data.sort((a,b)=>d3.descending(+a.qvalue, +b.qvalue))
                items.push(...d.data.filter((e,i)=>i<= 100).map(e=>e.feature))
                
            })
            this.items = [...new Set(items)];

             this.plots = plots;

            this.loading = false;


        })
    },
    createScatterData(){
        const self = this;
        let data = self.data.map(a => ({...a}))
        data.forEach(d=>{
            d.x = d.correlation;
            d.y = d.neg_log10_qval;
            d.c = `${d.pert1_dose} + ${d.pert2_dose}`;
            d.id=d.feature;
            d.r = 3;
            Object.assign(d, helpers.getSelectionAttributes())
        })
        return data;
    },
    createLatticeScatterData(scatterData){
        const self = this;
        let group = d3.groups(scatterData, d=>d.feature_type);
        let columns = 5;

        let row = 0, column=0;
        let latticeScatterData = group.map((d,i)=>{
            if (column < columns){
                row = row;
                column = column+1;
            } else {
                row =row+1;
                column = 1;
            }
            return {
                row: row,
                columnName: d[0],
                column: column-1,
                data: d[1]
            }
        })

        plotUtils.updateLatticeCommonYLayout(latticeScatterData, this.rootName, {top: 20, right: 20, bottom: 20, left: 50});

        const cExtent = [...new Set(scatterData.map(d => d.c))].sort((a,b)=>d3.ascending(+a.split(" + ")[0], +b.split(" + ")[0]))

        const scatterConfig = {
            xAxisTitle: "Coorelation",
            yAxisTitle: "q value",
            cAxisTitle: "Dose (µM)"
        }
        const maxRow = d3.max(latticeScatterData.map(d=>d.row));
        latticeScatterData.forEach((d,i)=> {
            let displayTitle = true,
            displayXAxisTicks = true, 
            displayYAxisTicks =true,
            displayXAxisTitle,
            displayYAxisTitle,
            displayLegend = false;
            if(i==0){
                displayLegend = true;
            }
            if (d.column === 0 ) { displayYAxisTitle = true } 
            else { displayYAxisTitle = false }

            if ((d.column === 0 && d.row == maxRow) || d.column == 7) { displayXAxisTitle = true } 
            else { displayXAxisTitle = false }

            d.config = {
                title: `${d.columnName}`,
                type: "scatter",
                padding: d.padding,
                axis: {
                    x: {
                        domain: [-0.5,1],
                        title: `${scatterConfig.xAxisTitle}`,
                        threshold: "0"
                    },
                    y: {
                        domain: [0, d3.max(d.data.map(e=>e.y))],
                        title: `${scatterConfig.yAxisTitle}`,
                    },
                    c: {
                        type: "ordinal",
                        title: scatterConfig.cAxisTitle
                    }
                },
                scale: {
                    c: d3.scaleOrdinal().domain(cExtent).range(helpers.getCustomSequentialColorRange(cExtent))
                },
                display: { 
                    title: displayTitle, 
                    legend: displayLegend, 
                    xAxisTitle: displayXAxisTitle, 
                    yAxisTitle: displayYAxisTitle, 
                    xAxisTicks: displayXAxisTicks, 
                    yAxisTicks: displayYAxisTicks 
                },
                tooltipConfig: [
                    {label: "Feature", field: "feature"},
                    {label: "Feature Type", field: "feature_type"},
                    {label: scatterConfig.xAxisTitle, field: "x"},
                    {label: scatterConfig.yAxisTitle, field: "y"},
                    {label: scatterConfig.cAxisTitle, field: "c"}
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
            displayXAxisTicks = true, 
            displayYAxisTicks =true,
            displayXAxisTitle,
            displayYAxisTitle,
            displayLegend = false;
            if(i==0){
                displayLegend = true;
            }


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
        highlight(){

        },
        mouseover(){
            // console.log(this.mouseover)
        },
        click(){
            // console.log("click",this.click)
        }

    }
  }
  </script>
  
  <style>




  </style>
  