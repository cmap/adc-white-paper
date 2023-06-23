<template>
  <v-container class="fill-height">
    <v-responsive class="fill-height">
      <PageTitle/>
      <ImageCard/>
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
                console.log("response", response)
                Vis.launch(response[0])
              })
          }
        }
      }
</script>
