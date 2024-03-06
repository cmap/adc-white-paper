<template>

</template>



<script>
import heatmap from './heatmap.js';
import * as d3 from "d3";
import * as helpers from '@/js/utils/helpers.js';
import * as plotUtils from '@/js/utils/plot-utils.js';

const maxDistance = 0.0075;
export default {
    name: 'HeatmapPlot',
    components: {
      
    },
    data: function () {
      return {
        plot: null,
      }
    },
    props: {
      rootId: String,
      config: Object,
      data: Array,
      mouseover: String,
      click: Array,
      multiSelect: Boolean
    },
    computed: {
      selectmulti(){
        if (this.multiSelect){
          return this.multiSelect
        } else {
          return true
        }
      }
    },
    mounted(){
      const self = this;
      this.configPlot();
    },
    methods: {
      configPlot(){
        this.states = {
          mouseover: this.mouseover,
          click: this.click
        }

       this.plot = new heatmap(this.rootId, this.data, this.config, this.states);
       this.plotMouseEvents();
      },
      plotMouseEvents(){
        const self = this;
        const canvas = d3.select(`#${self.plot.rootId}-canvasFocus`)
        const context = canvas.node().getContext('2d');
  
        function scaleBandInvertX(scale, mouse) {
            var step = scale.step();
            var index = Math.floor((mouse / step));
            return scale.domain()[index];
        }

        function scaleBandInvertY(scale, mouse) {
            var step = scale.step();
            var index = Math.floor((mouse / step));
            return scale.domain().reverse()[index];
        }

        let onClick = (event)=>{
          let click = self.click.map(d=>d);
            let mouse = d3.pointer(event);
            let x =  scaleBandInvertX(self.plot.scale.x, mouse[0])
            let y = scaleBandInvertY(self.plot.scale.y, mouse[1])
            let closest = self.plot.data.filter(d=> d.x == x && d.y==y)[0]
            if (closest){
              if (self.selectmulti){
                
                  this.$emit("update:click",  helpers.updateSelectedArray(click, closest.id))
                } else {
                  this.$emit("update:click", [closest.id])
                }
            } else {
              // do nothing!
            }
        }
        let onMouseout = (event)=>{
          this.$emit("update:mouseover",null)
          plotUtils.hideTooltip(self.plot)
        }
        let onMousemove = (event)=>{

            let mouse = d3.pointer(event);
            let x =  scaleBandInvertX(self.plot.scale.x, mouse[0])
            let y = scaleBandInvertY(self.plot.scale.y, mouse[1])

            let closest = self.plot.data.filter(d=> d.x == x && d.y==y)[0]
            if (closest){
              this.$emit("update:mouseover", closest.id)
              plotUtils.showTooltip(self.plot, closest, mouse)
            }
            else {
                onMouseout()
            }      
        }
        context.canvas.addEventListener('mousemove', onMousemove );
        context.canvas.addEventListener('click', onClick );
        context.canvas.addEventListener ("mouseout", onMouseout);
      }
    },
    watch:{
      mouseover(){
      this.plot.states.mouseover = this.mouseover;
      this.plot.renderSelections();
    },
    click(){
      this.plot.states.click = this.click;
      this.plot.renderSelections();
    }
  }
}
</script>
<style scoped>

</style>