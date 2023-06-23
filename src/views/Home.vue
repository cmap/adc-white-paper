<template>
  <v-container class="fill-height">
    <v-responsive class="fill-height">
      <PageTitle/>
      <ImageCard/>
      <svg id="auc-plot-1"></svg>
      <svg id="auc-plot-2"></svg>
    </v-responsive>
  </v-container>
</template>

<script>
  import PageTitle from '@/components/PageTitle.vue'
  import ImageCard from '@/components/ImageCard.vue'
  import $ from "jquery";
  import * as d3 from "d3";
  import * as Vis from '../js/auc_plots.js';

  export default {
        name: 'HomePage',
        components: {PageTitle, ImageCard},
        data () {
          return {

          }
        },
        mounted(){
          this.getData()
        },
        methods: {
          
           getData() {

            Promise.all([
                d3.csv("../../public/data/ERBB2 log2(TPM+1) Expression vs T-DM1 AUC.csv", function(d){
                    return {
                      depmap_id: d["DepMap ID"],
                      TDM1_auc: +d["T-DM1 AUC"],
                      ERBB2_expression: +d["ERBB2 log2(TPM+1) Expression Public 23Q2"],
                      cell_line: d["Cell Line Name"],
                      lineage: d["Lineage"],
                      primary_disease: d["Primary Disease"]
                    }
                }),
                d3.csv("../../public/data/ERBB2 log2(TPM+1) Expression vs T-MMAE AUC.csv", function(d){
                    return {
                      depmap_id: d["DepMap ID"],
                      Trastuzumab_MMAE_auc: +d["Trastuzumab-MMAE AUC"],
                      ERBB2_expression: +d["ERBB2 log2(TPM+1) Expression Public 23Q2"],
                      cell_line: d["Cell Line Name"],
                      lineage: d["Lineage"],
                      primary_disease: d["Primary Disease"]
                    }
                })
              
              ]).then(response=>{


                const data_1 = response[0].map(d=>{
                    return {
                        x: d.TDM1_auc,
                        y: d.ERBB2_expression,
                        r: 4,
                        color: d.TDM1_auc,
                        _info: d
                    }
                })
                const data_2 = response[1].map(d=>{
                    return {
                        x: d.Trastuzumab_MMAE_auc,
                        y: d.ERBB2_expression,
                        r: 4,
                        color: d.Trastuzumab_MMAE_auc,
                        _info: d
                    }
                })

                console.log("response", response)
                // Vis.launch(response[0], "auc-plot-1")
                // Vis.launch(response[1], "auc-plot-2")
                Vis.launch(data_1, "auc-plot-1")
                Vis.launch(data_2, "auc-plot-2")
              })
          }
        }
      }
</script>
<style scoped>

#auc-plot-1, #auc-plot-2{
  width:400px;
  height:400px;
  margin:25px;
  border:1px solid black;
  display:inline-block;
}
</style>