<template>
        <v-autocomplete
          v-model="selected"
          :items="items"
          label="Search genes to highlight"
          multiple
          chips
          closable-chips
          variant="underlined"
          clearable
      >
      </v-autocomplete>
      <v-btn size="x-small" variant="tonal" color="primary" @click="clickDefault">Highlight ERBB2</v-btn>
      <small class="px-2">Mouseover over points to show labels</small>
      <div>
        <svg  class="plot biomarker-plot" id="biomarker-shrna-plot-0"></svg>
        <svg  class="plot biomarker-plot" id="biomarker-shrna-plot-1"></svg>
      </div>
</template>

<script>

  import * as d3 from "d3";
  import * as Vis from '../js/BiomarkerShrnaPlots.js';


  const dataPath = "../../data/";
  export default {
        name: 'BiomarkerShrnaPlots',
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
                d3.csv(`${dataPath}biomarker_shRNA_T-DM1.csv`, function(d){
                    return {
                      feature: d["feature"].slice(6),
                      coef: +d["coef"],
                      qval: +d["log10(q.val)"]
                    }
                }),
                d3.csv(`${dataPath}biomarker_shRNA_T-MMAE.csv`, function(d){
                    return {
                      feature: d["feature"].slice(6),
                      coef: +d["coef"],
                      qval: +d["log10(q.val)"]
                    }
                }),
              ]).then(response=>{

                let data = {
                  ["T-DM1"]: response[0],
                  ["T-MMAE"]: response[1],
                }

                this.items = [...new Set(response[0].concat(response[1]).map(d=>d.feature))].sort()


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
  width:40%;
  display:inline-block;
  overflow: visible;
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

