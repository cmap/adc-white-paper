<template>
  <div v-if="!loading">
        <div class="my-6" style="position: relative;" :id="rootName">
        <heatmap-plot
          :rootId="rootName"
          :config="plot.config"
          :data="plot.data"
          :click="click"
          :highlight="highlight"
            >
          </heatmap-plot>
  </div>
  <div class="legend-wrapper">
    <small style="text-align:center"><i>Cell Lines Killed (Viability &lt; 0.3)</i></small>
    <svg width="100%" :id="`${rootName}-heatmap-legend`"></svg>
  </div>

  </div>
 
</template>  
<script>
import * as d3 from 'd3';
import * as api from '@/js/utils/api.js';
import HeatmapPlot from '@/plots/heatmap-plot.vue';
const dataPath = import.meta.env.PROD ? import.meta.env.BASE_URL+"/data/" : "../../data/";
const padding =   {top: 20, right: 20, bottom: 60, left: 40}
export default {
  name: 'ViabilityMatrixPlots',
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
    highlight: [],
    config: {
      "BRD-K32107296_BRD-K92041145":{
        "fileName": "temo_benzyl_data.csv",
        "title": "Sensitivity Across Doses",
        "xAxisTitle": "temozolomide Dose",
        "yAxisTitle": "O6-benzylguanine Dose",
        "cAxisTitle": "Cell lines killed (Viability < 0.3)",
        "padding": padding
      },
      "BRD-K01877528_BRD-K97375133":{
        "fileName": "ml210_ferro_data.csv",
        "title": "Sensitivity Across Doses",
        "xAxisTitle": "ML210 Dose",
        "yAxisTitle": "ferrostatin-1 Dose",
        "yAxisTitle": "O6-benzylguanine Dose",
        "cAxisTitle": "Cell lines killed (Viability < 0.3)",
        "padding":  {top: 20, right: 10, bottom: 60, left: 40}
      },
      "BRD-K00005264_BRD-K50731585":{
        "fileName": "azd_a133_data.csv",
        "title": "Sensitivity Across Doses",
        "xAxisTitle": "AZD7762 Dose",
        "yAxisTitle": "A-1331852 Dose",
        "yAxisTitle": "O6-benzylguanine Dose",
        "cAxisTitle": "Cell lines killed (Viability < 0.3)",
        "padding":  {top: 20, right: 10, bottom: 60, left: 70}
      
      }
    },
    plot: {}
  }),
  computed: {
    // configure(){
    //     const self = this;
    //     let cExtent = d3.extent(self.data, d=>d.c);

    //     return {
    //       padding: this.plotConfig.padding,
    //       title: 'title',
    //       axis: {
    //         x: {
    //             title: this.plotConfig.xAxisTitle
    //         },
    //         y: {
    //           title: this.plotConfig.yAxisTitle
    //         },
    //         c: {
    //           title: this.plotConfig.cAxisTitle

    //         }
    //       },
    //       scale: {
    //         c: d3.scaleLinear()
    //           .domain(cExtent)
    //           .range(["blue", "red"])
    //       },
    //       display: { 
    //           title: true,             
    //           legend: false,
    //           xAxisTitle: true,
    //           yAxisTitle:true
    //         }, 
    //       legend: {
    //         rootId:  `${self.rootName}-heatmap-legend`,
    //         padding: {top: 15, right: 15, bottom:50, left: 15}
    //       },
    //       tooltipConfig: [
    //           {label: "c", field: "c"},
    //           {label: "x", field: "x"},
    //           {label: "y", field: "y"},
    //         ]
    //     }
    // }

  },
 async created(){

  await this.getData();


  },
  methods: {
       async getData(){
      const self = this;
      let config = self.config[self.pert_id];

      Promise.all([
                d3.csv(`${dataPath}2024_04_cps/${config.fileName}`, function(d){
                    return {
                      ccle_name: d["ccle_name"],
                      pert1: d["pert1"],
                      pert2: d["pert2"],
                      dose1: d["dose1"],
                      dose2: d["dose2"],
                      ccle_name: d["ccle_name"],
                      group: `${d["pert1"]}_${d["dose1"]}_${d["pert2"]}_${d["dose2"]}`,
                      value: +d["capped_combination"] < 0.3 ? true : false
                    }
                })
              ]).then(response=>{
                let data = response[0];

                let groups = d3.groups(data, d => d.dose2, d => d.dose1);
                //Sort the groups here
                groups.forEach(d => {
                  d[1].sort((a, b) => d3.ascending(parseFloat(a[0]), parseFloat(b[0])))
                })
                groups = groups.sort(function (a, b) {
                  return d3.ascending(parseFloat(a[0]), parseFloat(b[0]))
                })
                let heatmap = groups.map((d) => {
                  return d[1].map((e) => { 
                      return {
                        x: e[0],
                        y: d[0],
                  //      length: e[1].length,
                     //    c: ((e[1].filter(f => f.value === true).length)/e[1].length)*100,
                        c: e[1].filter(f => f.value === true).length,
                        id: `${e[0]}_${d[0]}`
                      }
                    })
                }).flat();
console.log(heatmap, groups, data)
                this.plot = {data: heatmap, config: self.configure(heatmap, config)}
                self.loading = false;
            })
            },
            configure(data, config) {
              const self = this;
              let xExtent = d3.extent(data.map(d => d.x))
              let yExtent = d3.extent(data.map(d => d.y))
              let cExtent = d3.extent(data.map(d => d.c))
              console.log(cExtent)
              return {
                padding: config.padding,
                title: config.title,
                axis: {
                  x: {
                 //   domain: xExtent,
                    title: config.xAxisTitle,
                  },
                    y: {
                 //   domain: yExtent,
                    title: config.yAxisTitle
                  },
                  c: {
                    title: "Cell lines killed (Viability < 0.3)"
                  }
                },
                scale: {
                  c: d3.scaleSequential([0, Math.floor(cExtent[1])], d3.interpolateYlOrRd)
               //   c: d3.scaleSequential([0, 75], d3.interpolateYlOrRd)

                //  c: d3.scaleLinear([0, Math.floor(cExtent[1])], ["yellow", "red"])
                },
                display: { 
                  title: true, 
                  legend: true, 
                  xAxisTitle: true, 
                  yAxisTitle: true, 
                  xAxisTicks: true, 
                  yAxisTicks: true 
                },
                legend: {
                  rootId:  `${self.rootName}-heatmap-legend`,
                  padding:  {top: 0, right: padding.right, bottom: 20, left: padding.left}
                },
                tooltipConfig: [
                  {label: config.xAxisTitle, field: "x"},
                  {label: config.yAxisTitle, field: "y"},
                  {label: "Cell lines killed (Viability < 0.3)", field: "c"}
                ]
              }
            }
   
    },
    watch: {

    }
  }
  </script>
  
  <style>
.legend-wrapper{
  width:300px;
  text-align: center;
}
#BRD-K32107296_BRD-K92041145-viability-heatmap-plot,
#BRD-K01877528_BRD-K97375133-viability-heatmap-plot{
  width:300px;
  height:200px;
}

#BRD-K00005264_BRD-K50731585-viability-heatmap-plot{
  width:300px;
  height:300px;
}
.tick > text{
  font-size: 9.5px !important;
  fill: #000;
}
.axis-title{
  font-size:11px !important;
  font-weight:500 !important;
  color:#454545;
  fill: #454545;
}
.plot-title{
  font-size:12px !important;
  font-weight:700 !important;
  line-height:0px;
}

  </style>
  