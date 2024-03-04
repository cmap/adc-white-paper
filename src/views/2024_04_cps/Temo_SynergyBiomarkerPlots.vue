<template>
      <div>
        <v-row>
        <v-col cols="6">
          <v-autocomplete
            v-model="click"
            :items="items"
            label="Search features to highlight"
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
        <v-col cols="3">
            <small><i>Select legend items to highlight</i></small>
            <svg width="100%" :id="`${rootName}-scatterplot-legend`"></svg>
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
const fileName = "temo06_highMGMT_biomarkers.csv"
import * as d3 from 'd3';
import * as plotUtils from '@/js/utils/plot-utils.js';
import * as helpers from '@/js/utils/helpers.js';
import ScatterPlot from '@/plots/scatter-plot.vue';

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
    defaulted: [],
    plots: [],
    mouseover: null,
    click: [],
    highlight: []
  }),
  computed: {

  },
async created() {
    await this.loadData()
  },
  methods: {
    async loadData(){
        this.loading = true;
        Promise.all([
            d3.csv(`${dataPath}2024_04_cps/${fileName}`, function(d,i){
                let string = d.y.split("::");
                return {
                    feature: d["x"].split("_")[1],
                    correlation: d["rho"],
                    qvalue: d["q.val"],
                    neg_log10_qval: d["neg_log10_qval"],
                    pert1_name: string[0],
                    pert2_name: string[1],
                    pert1_dose: string[2],
                    pert2_dose: string[3],
                    feature_type: d["feature.set"],
                    id: d["y"]
                }
            }),
        ])
        .then(response=>{
            this.data = response[0];
            this.items = [...new Set(this.data.map(d=>d.feature))];
            let scatterData = this.createScatterData();
            let plots = this.createLatticeScatterData(scatterData);
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
            // d.id = `${d.feature_type}-${d.feature}-${d.pert1_dose}-${d.pert2_dose}`;
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
            cAxisTitle: "Dose"
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
                    rootId:  `${self.rootName}-scatterplot-legend`,
                    padding: {top: 15, right: 15, bottom:15, left: 15}
                },
            }
        })
        return latticeScatterData;
    },

    createDoseColorScale(doses){
      let domain = [], range=[];
      let groupedDoses = d3.groups(doses, d=> d.split(" + ")[1]).sort((a,b)=>d3.ascending(+a,+b))
      groupedDoses.forEach((d,i)=>{
    
        range.push(helpers.getCustomSequentialColorRange(sortedDoses))
        domain.push(sortedDoses)
      })
      return {domain: domain.flat(), range: range.flat()}
    },
    setLatticeDisplay(plots){
        const maxRow = d3.max(plots.map(d=>d.row));
        plots.forEach(d=> {
            let displayTitle = true,
            displayXAxisTicks = true, 
            displayYAxisTicks =true,
            displayXAxisTitle,
            displayYAxisTitle;


            if (d.column === 0 ) { displayYAxisTitle = true } 
            else { displayYAxisTitle = false }

            if ((d.column === 0 && d.row == maxRow) || d.column == 7) { displayXAxisTitle = true } 
            else { displayXAxisTitle = false }

            let display = { 
                    title: displayTitle, 
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
    // getSelectionAttributes() {
    //   return {
    //       click: false,
    //       highlight: true,
    //       mouseover: false
    //     }
    //   }
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
  