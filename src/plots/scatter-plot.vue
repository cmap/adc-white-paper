<template>

</template>
<script>
import scatter from './scatter.js';
import * as d3 from "d3";
import * as helpers from '@/js/utils/helpers.js';
const maxDistance = 0.0075;
export default {
    name: 'ScatterPlot',
    components: {
      
    },
    data: function () {
      return {
        pLegendSelections: null,
        plot: null
      }
    },
    props: {
      rootId: String,
      config: Object,
      data: Array,
      highlight:Array
    },
    computed: {
    },
    mounted(){
      this.configPlot();
    },
    methods: {
      configPlot(){
        const self = this;
        this.plot = new scatter(self.rootId, self.data, self.config, self.config.states);
        this.$emit("plot", self.plot)

      },
    },
    watch:{
      data(){
        this.plot.data = this.data;
        this.plot.renderPoints();
      }
    }
}
</script>
<style>



.relative-plot-wrapper{
  position:relative;
  width:100%;
  height:100%;
}
#scatter-plot-legend{
  width:100%;
}

/* .plot{
  position:relative;
} */
.plot-svg, .plot-canvas{
  position:absolute;
  top:0px;
  left:0px;
}
.plot-svg{
  z-index:1;
  pointer-events: none;
}
</style>