<template>
  <div v-if="!loading">

  <div :id="rootName">

    <div v-for="plot in plots" 
      :id="plot.id" 
      :class="`lattice-plot ${plot.class}`" 
      :style="{
      'display': 'inline-block',
      'position': 'relative'
      }">
    <heatmap-plot
    :rootId="plot.id"
    :config="plot.config"
    :data="plot.data"
    v-model:mouseover="mouseover"
    v-model:click="click"
    >
    </heatmap-plot>
    </div>
  </div>
  <!-- <v-row :id="rootName">
    <v-col v-for="plot in plots">
      <div
      :id="plot.id" 
      class="lattice-plot single-agent-heatmap" 
      :style="{
      'display': 'inline-block',
      'position': 'relative', 
      }">
    <heatmap-plot
    :rootId="plot.id"
    :config="plot.config"
    :data="plot.data"
    v-model:mouseover="mouseover"
    v-model:click="click"
    >
    </heatmap-plot>
    </div>
    </v-col>
  </v-row>
-->
  <v-col cols="4">
    <svg class="cps-legend" :id="`${rootName}-heatmap-legend`"></svg>
  </v-col>

  </div>
 
</template>  
<script>
import * as d3 from 'd3';
import HeatmapPlot from '@/plots/heatmap-plot.vue';
const dataPath = import.meta.env.PROD ? import.meta.env.BASE_URL+"/data/" : "../../data/";
const padding =   {top: 10, right: 20, bottom: 50, left: 40}
export default {
  name: 'Adz_A13_ViabilityHeatmaps',
  components: {
    HeatmapPlot
  },
  props: {
    rootName: String,
    pert_id: String
  },
  data: () => ({
    loading: true,
    mouseover: null,
    click: [],
    plot1: {},
    plot2: {},
    plots: [],
    numCellLines:null
  }),
  computed: {

  },
 async created(){

  await this.getData();

  },
  methods: {
       async getData(){
      const self = this;
      Promise.all([
                d3.csv(`${dataPath}2024_04_cps/azd_a133_data.csv`, function(d){
                    return {
                      ccle_name: d["ccle_name"],
                      pert1: d["pert1"],
                      pert2: d["pert2"],
                      dose1: d["dose1"],
                      dose2: d["dose2"],
                      combo_viability: +d["capped_combination"] < 0.3 ? true : false,
                      pert1_viability: +d["capped_library"] < 0.3 ? true : false,
                      pert2_viability: +d["capped_anchor"] < 0.3 ? true : false
                    }
                })
              ]).then(response=>{
                let data = response[0];
                this.numCellLines = [...new Set(data.map(d=>d.ccle_name))].length;
                let pert1Heatmap = data.map(d => {
                  return {
                    x: d.dose1,
                    y: 0,
                    value: d.pert1_viability
                  }
                })
                let pert2Heatmap = data.map(d => {
                  return {
                    x: d.dose2,
                    y: 1,
                    value: d.pert2_viability
                  }
                })
                let pert12Heatmap = data.map(d => {
                  return {
                    x: d.dose1,
                    y: d.dose2,
                    value: d.combo_viability
                  }
                })



                let heatmap1Data = this.createHeatmapData(pert1Heatmap)
                let heatmap2Data = this.createHeatmapData(pert2Heatmap)
                let heatmap3Data = this.createMatrixData(pert12Heatmap)
                console.log(heatmap3Data)
                let plot1 = {data: heatmap1Data, config: self.configure(heatmap1Data)}
                let plot2 = {data: heatmap2Data, config: self.configure(heatmap2Data)}
                let plot3 = {data: heatmap3Data, config: self.configure(heatmap3Data)}
                plot1.config.display.legend = true;
                plot1.id = `${self.rootName}-pert1-heatmap`
                plot2.id = `${self.rootName}-pert2-heatmap`
                plot3.id = `${self.rootName}-pert12-heatmap`
                plot1.class= "single-agent-heatmap"
                plot2.class= "single-agent-heatmap"
                plot3.class= "combo-heatmap"
                this.plots = [plot1, plot2, plot3]
                self.loading = false;
            })
            },
            createMatrixData(data){
              let groups = d3.groups(data, d => d.y, d => d.x);
                //Sort the groups here
                groups.forEach(d => {
                  d[1].sort((a, b) => d3.ascending(parseFloat(a[0]), parseFloat(b[0])))
                })
                groups = groups.sort(function (a, b) {
                  return d3.ascending(parseFloat(a[0]), parseFloat(b[0]))
                })
               return groups.map((d) => {
                  return d[1].map((e) => { 
                      return {
                        x: e[0],
                        y: d[0],
                     //    c: ((e[1].filter(f => f.value === true).length)/e[1].length)*100,
                        c: e[1].filter(f => f.value === true).length,
                        id: `${e[0]}_${d[0]}`
                      }
                    })
                }).flat();

            },
            createHeatmapData(data){
              let groups = d3.groups(data, d => d.x)
                groups = groups.sort(function (a, b) {
                  return d3.ascending(parseFloat(a[0]), parseFloat(b[0]))
                })
               return groups.map((d,i) => {
                      return {
                        x: d[0],
                        y: 0,
                        c: (+d[1].filter(f => f.value === true).length)+1,
                        value: d[1].filter(f => f.value === true).length,
                        id: i
                      }
               
                }).flat();
            },
            configure(data) {
              const self = this;
              return {
                padding: padding,
                title: "Viability Heatmap",
                axis: {
                  x: {
                    title: "Dose",
                  },
                  c: {
                    type: "sequentialLog",
                    title: "Cell lines killed (Viability < 0.3)"
                  }
                },
                scale: {
                 c: d3.scaleSequentialLog(d3.interpolateYlOrRd).domain([1, 386])
                },
                display: { 
                  title: true, 
                  legend: false, 
                  xAxisTitle: true, 
                  yAxisTitle: false, 
                  xAxisTicks: true, 
                  yAxisTicks: false 
                },
                legend: {
                  rootId:  `${self.rootName}-heatmap-legend`,
                },
                tooltipConfig: [
                  {label: "Dose", field: "x"},
                  {label: "Cell lines killed (Viability < 0.3)", field: "value"}
                ]
              }
            }
   
    },
    watch: {

    }
  }
  </script>
  
  <style>
.single-agent-heatmap{
  width: 300px;
  height: 120px;
}
.combo-heatmap{
  width: 300px;
  height: 300px;
}

  </style>
  