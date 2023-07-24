<template>
        <!-- <v-autocomplete
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
      <small class="px-2">Mouseover over points to show labels</small> -->
      <div>
        <svg class="plot" id="expression-across-pools-plot"></svg>
      </div>
</template>

<script>

  import * as d3 from "d3";
  import * as Vis from '../js/ExpressionAcrossPoolsPlots.js';


  const dataPath = "../../data/";
  export default {
        name: 'ExpressionAcrossPoolsPlots',
        data () {
          return {
          //   items:[],
          //   selected: ["ERBB2"],
          //   defaulted: ["ERBB2"]
           }
        },
        mounted(){
          this.getData()
        },
        methods: {
          // clickDefault(){
          //   this.selected = this.defaulted;
          // },
           getData() {

            Promise.all([
                d3.csv(`${dataPath}ERBB2 expression PR500.csv`, function(d){
                    return {
                      pool_id: d["pool_id"],
                      cell_line_display_name: d["cell_line_display_name"],
                      expression: +d["ERBB2 expression"],
                      status: d["ERBB2 status"]
                    }
                })
              ]).then(response=>{

                // let data = {
                //   TDM1: response[0],
                //   TMMAE: response[1]
                // }

                // this.items = [...new Set(response[0].concat(response[1]).map(d=>d.feature))].sort()

                Vis.launch(response[0].filter(d=> d.cell_line_display_name != "NA"))
           //     Vis.highlight(this.selected)
            })
          }
        },
        watch: {
          // selected(){
          //   Vis.highlight(this.selected)
          // }
        }
      }
</script>
<style scoped>

#expression-across-pools-plot{
  width:700px;
  height:400px;
}


@media (max-width: 600px){
  #expression-across-pools-plot{
    width:98%;
height:300px;
  }

}

@media (min-width: 600) {


}

</style>

