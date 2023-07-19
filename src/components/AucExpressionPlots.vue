<template>
    <v-autocomplete
          v-model="selected"
          :items="items"
          label="Search"
          multiple
          chips
          hint="Search cell lines to highlight"
          persistent-hint
          closable-chips
      >
      </v-autocomplete>
      <div>
        <svg  class="plot" id="expression-auc-plot-0"></svg>
        <svg  class="plot" id="expression-auc-plot-1"></svg>
        <svg  class="plot" id="expression-auc-plot-2"></svg>
      </div>
</template>

<script>

  import * as d3 from "d3";
  import * as Vis from '../js/AucExpressionPlots.js';


  const dataPath = "../../data/";
  export default {
        name: 'AucExpressionPlots',
        data () {
          return {
            items:[],
            selected: ["BT474", "EFM192A", "HCC1419", "KYSE410", "MKN7", "NCIH2170", "NCIN87", "OE19", "SKOV3", "TE4"]
          }
        },
        mounted(){
          this.getData()
        },
        methods: {

           getData() {

            Promise.all([
                d3.csv(`${dataPath}ERBB2 log2(TPM+1) Expression vs T-DM1 AUC.csv`, function(d){
                    return {
                      depmap_id: d["DepMap ID"],
                      auc: +d["T-DM1 AUC"],
                      expression: +d["ERBB2 log2(TPM+1) Expression Public 23Q2"],
                      cell_line: d["Cell Line Name"],
                      lineage: d["Lineage"],
                      primary_disease: d["Primary Disease"]
                    }
                }),
                d3.csv(`${dataPath}ERBB2 log2(TPM+1) Expression vs T-MMAE AUC.csv`, function(d){
                    return {
                      depmap_id: d["DepMap ID"],
                      auc: +d["Trastuzumab-MMAE AUC"],
                      expression: +d["ERBB2 log2(TPM+1) Expression Public 23Q2"],
                      cell_line: d["Cell Line Name"],
                      lineage: d["Lineage"],
                      primary_disease: d["Primary Disease"]
                    }
                }),
                d3.csv(`${dataPath}ERBB2 log2(TPM+1) Expression vs Trastuzumab AUC.csv`, function(d){
                    return {
                      depmap_id: d["DepMap ID"],
                      auc: +d["Trastuzumab"],
                      expression: +d["ERBB2 log2(TPM+1) Expression Public 23Q2"],
                      cell_line: d["Cell Line Name"],
                      lineage: d["Lineage"],
                      primary_disease: d["Primary Disease"]
                    }
                })
              ]).then(response=>{

                let data = {
                  TDM1: response[0],
                  TMMAE: response[1],
                  TRA: response[2]
                }

                this.items = [...new Set(response[0].concat(response[1]).concat(response[2]).map(d=>d.feature))].sort()
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



@media (max-width: 600px){
  .plot{
    width:98%;
    display:inline-block;
  }

}

@media (min-width: 600) {


}

</style>

