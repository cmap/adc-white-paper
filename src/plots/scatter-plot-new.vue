<template>
    <div class="">

    </div>
</template>



<script>
import scatter from './scatter-new.js';
import * as d3 from "d3";
import * as helpers from '@/js/utils/helpers.js';
const maxDistance = 0.05;
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
      mouseover: Object,
      click: Array,
      highlight: Array,
      multiSelect: Boolean
    },
    computed: {
      selectmulti(){
        if (this.multiSelect){
          return this.multiSelect
        } else {
          return true
        }
      },
      states(){
        return {
          mouseover: this.mouseover,
          click: this.click,
          highlight: this.highlight
        }
      }
    },
    mounted(){
      this.launch();
    },

    methods: {
      launch(){
        const self = this;
        this.plot = new scatter(self.rootId, self.data, self.config, self.states);
        this.plotMouseEvents(); 
        if (this.config.display.legend){
          this.plotLegendEvents();
        }
      },
      plotMouseEvents(){
        const self = this;
        const canvas = d3.select(`#${self.plot.rootId}-canvas`)
        const context = canvas.node().getContext('2d');

        let onClick = (event)=>{
          const data = self.plot.data.filter(d=>d.highlighted==true);
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
              if (distance <=maxDistance){
                if (self.selectmulti){
                   this.$emit("update:click",  helpers.insertUniqueObject(self.click, closest))
                }
                //  else {
                // }
              }
            } else {
              // do nothing!
            }
        }
        let onMouseout = (event)=>{
          this.$emit("update:mouseover", {})
          self.plot.hideTooltip();
        }
        let onMousemove = (event)=>{
          const data = self.plot.data.filter(d=>d.highlighted==true);
          const tree = d3.quadtree()
            .x(d=> d.x)
            .y(d=> d.y)
            .extent([[0, 0], [self.plot.dimension.innerWidth, self.plot.dimension.innerHeight] ])
            .addAll(data);

            let mouse = d3.pointer(event);
            let closest = tree.find( 
              self.plot.scale.x.invert(mouse[0]),
              self.plot.scale.y.invert(mouse[1]) 
            );


            if (data.length!=0 && closest!=undefined){
              let distance = helpers.euclidDistance(
                closest.x,
                closest.y,
                self.plot.scale.x.invert(mouse[0]),
                self.plot.scale.y.invert(mouse[1])
              )

              if (distance <= maxDistance){
                this.$emit("update:mouseover", closest)
                self.plot.showTooltip(closest, mouse)
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
    plotLegendEvents(){
        const self = this;
        const legend = d3.select(`#${self.plot.legend.rootId} g`)
        let highlight = self.highlight;
        legend.selectAll(".legend.tick")
          .on("click", function(event, d){
            self.$emit("update:highlight",   helpers.updateSelectedArray(highlight, d))
            d3.selectAll(".legend.tick.active").classed("active", false)
            d3.selectAll(".legend.tick").filter(e=> self.highlight.includes(e)).classed("active", true)
        })
      }
    },
    watch:{
      mouseover(){
        this.plot.states.mouseover = this.mouseover;
        this.plot.renderPoints();
      },
      click(){
        this.plot.states.click = this.click;
        this.plot.renderPoints();
      },
      highlight(){
        this.plot.states.highlight = this.highlight;
        this.plot.renderPoints();
      },
      data(){
        this.plot.data = this.data;
        this.plot.states = this.states;
        this.plot.renderPoints();
      }
    }
}
</script>
<style scoped>

</style>
