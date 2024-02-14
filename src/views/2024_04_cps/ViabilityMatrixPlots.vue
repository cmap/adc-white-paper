<template>
    <div  class="my-6" style="position: relative;" :id="rootName">
     {{ rootName }} 
    <heatmap-plot
          :rootId="rootName"
          :config="configure"
          :data="data"
          v-model:mouseover="mouseover"
          v-model:click="click"
          v-model:highlight="highlight"

            >
          </heatmap-plot>
  </div>
</template>  
<script>
import * as d3 from 'd3';
import * as api from '@/js/utils/api.js';
import HeatmapPlot from '@/plots/heatmap-plot.vue';

export default {
  name: 'ViabilityMatrixPlots',
  components: {
    HeatmapPlot
  },
  props: {
    rootName: String
  },
  data: () => ({
    mouseover: null,
    click: [],
    highlight: [],
    plotConfig: {
      padding: {top: 10, right: 10, bottom: 25, left: 25},
      xAxisTitle: "x title",
      yAxisTitle: "y title",
      cAxisTitle: "c title",
    
    },
    data: [ {
          "x": 0.1372,
          "y": 5.0,
          "c": 0.7,
          "id":1
        },
        {
          "x": 0.4115,
          "y": 5.0,
          "c": 0.6,
          "id":2
        },
        {
          "x": 1.235,
          "y": 5.0,
          "c": 0.5,
          "id":3
        },
        {
          "x": 3.704,
          "y": 5.0,
          "c": 0.4,
          "id":4
        },
        {
          "x": 11.11,
          "y": 5.0,
          "c": 0.3,
          "id":5
        },
        {
          "x": 33.33,
          "y": 5.0,
          "c": 0.2,
          "id":6
        },
        {
          "x": 100,
          "y": 5.0,
          "c": 0.1,
          "id":7
        }],
    plot: null
  }),
  computed: {
    configure(){
        const self = this;
        let cExtent = d3.extent(self.data, d=>d.c);

        return {
          padding: this.plotConfig.padding,
          title: 'title',
          axis: {
            x: {
                title: this.plotConfig.xAxisTitle
            },
            y: {
              title: this.plotConfig.yAxisTitle
            },
            c: {
              title: this.plotConfig.cAxisTitle

            }
          },
          scale: {
            c: d3.scaleLinear()
              .domain(cExtent)
              .range(["blue", "red"])
          },
          display: { 
              title: true,             
              legend: false,
              xAxisTitle: true,
              yAxisTitle:true
            }, 
          legend: {
            rootId:  `${self.rootName}-heatmap-legend`,
            padding: {top: 15, right: 15, bottom:50, left: 15}
          },
          tooltipConfig: [
              {label: "c", field: "c"},
              {label: "x", field: "x"},
              {label: "y", field: "y"},
            ]
        }
    }

  },
 mounted(){
   this.load()


  },
  methods: {
    load(){
      const self = this;



    },

   
    },
    watch: {

    }
  }
  </script>
  
  <style>

#test{
  height:500px;
}

  </style>
  