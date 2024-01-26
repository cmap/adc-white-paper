<template>
    <div class="">

    </div>
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
        if (this.config.display.legend){
          this.plotLegendEvents();
        }
      },
    plotLegendEvents(){
        const self = this;
        const legend = d3.select(`#${self.plot.legend.rootId} g`)
        let highlight;
        legend.selectAll(".legend.tick")
          .on("click", function(event, d){
          if (self.highlight == d){
            d3.selectAll(".legend.tick.active").classed("active", false)

            highlight = []
            //self.plot.scale.c.domain()
          } else {
            d3.selectAll(".legend.tick.active").classed("active", false)
            d3.select(this).classed("active", true)
            highlight = [d]
          }
          self.$emit("update:highlight", highlight)
        })
      }
    },
    watch:{
      data(){
        this.plot.data = this.data;
        this.plot.renderPoints();
      }
    }
}
</script>
<style scoped>

.relative-plot-wrapper{
  position:relative;
  width:100%;
  height:100%;
}
#scatter-plot-legend{
  width:100%;
}
</style>