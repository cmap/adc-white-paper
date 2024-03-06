<template>

</template>



<script>

import scatter from './scatter.js';
import * as d3 from "d3";
import * as helpers from '@/js/utils/helpers.js';
import * as plotUtils from '@/js/utils/plot-utils.js';

export default {
  name: 'ScatterPlot',
  components: {

  },
  data: function () {
    return {
      plot: null,
      maxDistance: 0.15
    }
  },
  props: {
    rootId: String,
    config: Object,
    data: Array,
    mouseover: String,
    click: Array,
    highlight: Array
  },
  computed: {
    states(){
      return {
        mouseover: this.mouseover,
        click: this.click,
        highlight: this.highlight
      }
    }
  },
  mounted(){
    this.configPlot();
  },
  methods: {
    highlightMe(value){
      const self = this;
      let highlight = this.highlight.map(d=>d);
      this.$emit("update:highlight",  helpers.updateSelectedArray(highlight, value))
      d3.selectAll(".legend.tick.active").classed("active", false).style("font-weight", "normal")
    let active =  d3.selectAll(".legend.tick").filter(e=> highlight.includes(e))
    active.classed("active", true).style("font-weight", "bold")

    },
    configPlot(){
      const self = this;
      this.plot = new scatter(self.rootId, self.data, self.config, self.states);
      this.plotMouseEvents(); 
      if (this.config.display.legend){
          this.plotLegendEvents();
        }
    },
    plotLegendEvents(){
        const self = this;
        d3.select(`#${self.plot.legend.rootId} g`).selectAll(".legend.tick")
          .on("click", function(event, d){
            self.highlightMe(d)        
        })
      },
    plotMouseEvents(){
      const self = this;
      const canvas = d3.select(`#${self.plot.rootId}-canvasFocus`)
      const context = canvas.node().getContext('2d');

      let onClick = (event)=>{
        const data = self.plot.data.filter(d=>d.highlight==true);
        let click = self.click.map(d=>d);

        const tree = d3.quadtree()
          .x(d=> d.x)
          .y(d=> d.y)
          .extent([[0, 0], [self.plot.dimension.innerWidth, self.plot.dimension.innerHeight] ])
          .addAll(data);

          let mouse = d3.pointer(event);
          let closest = tree.find( self.plot.scale.x.invert(mouse[0]),
          self.plot.scale.y.invert(mouse[1]) );
          let distance;
          if (data.length!=0  && closest!=undefined){
            distance = helpers.euclidDistance(closest.x,closest.y, self.plot.scale.x.invert(mouse[0]), self.plot.scale.y.invert(mouse[1]))
            if (distance <=this.maxDistance){
                this.$emit("update:click",  helpers.updateSelectedArray(click, closest.id))
            }
          } else {
            // do nothing!
          }
      }
      let onMouseout = (event)=>{
        this.$emit("update:mouseover", null)
     //   self.plot.hideTooltip();
        plotUtils.hideTooltip(self.plot)
      }
      let onMousemove = (event)=>{
        const data = self.plot.data.filter(d=>d.highlight==true);
        const tree = d3.quadtree()
          .x(d=> d.x)
          .y(d=> d.y)
          .extent([[0, 0], [self.plot.dimension.innerWidth, self.plot.dimension.innerHeight] ])
          .addAll(data);

          let mouse = d3.pointer(event);
          let closest = tree.find( self.plot.scale.x.invert(mouse[0]),
          self.plot.scale.y.invert(mouse[1]) );

          if (data.length!=0 && closest!=undefined){
            let distance = helpers.euclidDistance(
              closest.x,closest.y,
              self.plot.scale.x.invert(mouse[0]),
              self.plot.scale.y.invert(mouse[1])
            )
            if (distance <= this.maxDistance){
              this.$emit("update:mouseover", closest.id)
              // self.plot.showTooltip(closest, mouse)
              plotUtils.showTooltip(self.plot, closest, mouse)
            }
            else {
              onMouseout()
            }
          } else {
            // do nothing!
          }
      }
      context.canvas.addEventListener('mousemove', onMousemove );
      context.canvas.addEventListener('click', onClick );
      context.canvas.addEventListener ("mouseout", onMouseout);
  },
    updateCanvasOpacity(){
      let opacity, saturation; 
      this.click.length > 0 || this.mouseover ? opacity = 0.3 : opacity = 1; 
      this.click.length > 0 || this.mouseover ? saturation = 0.75 : saturation = 1; 

      d3.select(`#${this.plot.rootId}-canvasFocus`).style("opacity", opacity).style("filter", `saturate(${saturation})`);
    }
  },
  watch:{
    mouseover(){
      this.plot.states.mouseover = this.mouseover;
      this.updateCanvasOpacity();
      this.plot.renderSelections();
    },
    click(){
      this.plot.states.click = this.click;
      this.updateCanvasOpacity();
      this.plot.renderSelections();
    },
    highlight(){
      const self = this;
      this.plot.states.highlight = this.highlight;
      this.plot.data.forEach(d=> { 
        if ((self.highlight.length > 0 && self.highlight.includes(d.c) || self.highlight.length == 0)) { 
          d.highlight = true 
        }  else { d.highlight = false }

      })
      this.plot.renderFocus();
    }
  }
}
</script>
<style scoped>


</style>
