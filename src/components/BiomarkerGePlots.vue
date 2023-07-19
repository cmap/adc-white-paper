<template>
      <v-autocomplete
          v-model="selected"
          :items="items"
          label="Search genes to highlight"
          multiple
          chips
          persistent-hint
          closable-chips
      >
      </v-autocomplete>
      <v-btn size="x-small" variant="plain" color="primary" @click="clickDefault">Highlight ERBB2</v-btn>
      <div>
        <svg  class="plot" id="biomarker-ge-plot-0"></svg>
        <svg  class="plot" id="biomarker-ge-plot-1"></svg>
      </div>
</template>

<script>

  import * as d3 from "d3";
  import * as Vis from '../js/BiomarkerGePlots.js';


  const dataPath = "../../data/";
  export default {
        name: 'BiomarkerGePlots',
        data () {
          return {
            items:[],
            selected: ["ERBB2"],
            defaulted: ["ERBB2"]
          }
        },
        mounted(){
          this.getData()
        },
        methods: {
          clickDefault(){
            this.selected = this.defaulted;
          },
           getData() {

            Promise.all([
                d3.csv(`${dataPath}biomarker_GE_T-DM1.csv`, function(d){
                    return {
                      feature: d["feature"].slice(3),
                      coef: +d["coef"],
                      qval: +d["log10(q.val)"]
                    }
                }),
                d3.csv(`${dataPath}biomarker_GE_T-MMAE.csv`, function(d){
                    return {
                      feature: d["feature"].slice(3),
                      coef: +d["coef"],
                      qval: +d["log10(q.val)"]
                    }
                }),
              ]).then(response=>{

                let data = {
                  TDM1: response[0],
                  TMMAE: response[1]
                }
                this.items = [...new Set(response[0].concat(response[1]).map(d=>d.feature))].sort()
                console.log(this.items)

                Vis.launch(data)
                Vis.highlight(this.selected)
            })
          }
        },
        watch: {
          selected(){
            Vis.highlight(this.selected)
          }
        }
      }
</script>
<style scoped>

.plot{
  width:30%;
  display:inline-block;
}

.scatter-pt.selected{
  fill-opacity: 1;
  stroke-width:5px;
}

@media (max-width: 600px){
  .plot{
    width:98%;
    display:inline-block;
  }

}

@media (min-width: 600) {


}

</style>

