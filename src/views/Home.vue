<template>
  <v-container class="fill-height">
    <v-responsive class="fill-height">
      <PageTitle/>
      <p>
        Antibody-drug conjugates (ADCs) are a rapidly growing class of cancer therapeutics. ADCs combine the targeting specificity of monoclonal antibodies with the cytotoxicity of small molecules to provide highly targeted delivery of drug payloads, while sparing healthy tissue from chemotherapeutic damage. Although ADCs have demonstrated significant success in the clinic, ADC development continues to be a challenging endeavor that is time consuming, expensive, and has a high failure rate.
        <br><br>
        Cell-based functional screening is an essential step in the development of ADCs. The outcome of these preclinical studies can aid in evaluating promising ADC candidates, validating target specificity, and predicting in vivo efficacy. To help facilitate the identification of promising new ADCs, we developed a PRISM screening assay that enables high throughput profiling of ADC activity in hundreds of cell lines simultaneously. In this paper, we demonstrate the utility of PRISM screening to uncover clinically relevant targets 
      </p>
      <div class="d-flex align-center">
        <ImageCard title="900+ cancer cell lines" description="pooled+barcoded" img="../../public/graphics/01 PRISM hero cell lines.png"/>
        <ImageCard title="Antibody-drug conjugate" description="test agents" img="../../public/graphics/02 PRISM hero test agents.png"/>
        <ImageCard title="5-day viability assay" description="plated+treated" img="../../public/graphics/03 PRISM hero viability assay.png"/>
        <ImageCard title="Target validation + discovery" description="comprehensive data" img="../../public/graphics/04 PRISM hero data.png"/>
      </div>
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

  const dataPath = "../../public/data/";
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
                d3.csv(`${dataPath}ERBB2 log2(TPM+1) Expression vs T-DM1 AUC.csv`, function(d){
                    return {
                      depmap_id: d["DepMap ID"],
                      TDM1_auc: +d["T-DM1 AUC"],
                      ERBB2_expression: +d["ERBB2 log2(TPM+1) Expression Public 23Q2"],
                      cell_line: d["Cell Line Name"],
                      lineage: d["Lineage"],
                      primary_disease: d["Primary Disease"]
                    }
                }),
                d3.csv(`${dataPath}ERBB2 log2(TPM+1) Expression vs T-MMAE AUC.csv`, function(d){
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
                let TDM1Config = {
                  data: response[0].map(d=>{
                    return {
                        x: d.TDM1_auc,
                        y: d.ERBB2_expression,
                        r: 3,
                        color: d.TDM1_auc,
                        _info: d
                    }
                  }),
                  title: "T-DM1",
                  rootId: "auc-plot-1",
                  display:{ legend: false, title: false, borderbox: false, xTitle: true, yTitle: true }
                }
                let TMMAEConfig = {
                    data: response[1].map(d=>{
                    return {
                        x: d.Trastuzumab_MMAE_auc,
                        y: d.ERBB2_expression,
                        r: 3,
                        color: d.Trastuzumab_MMAE_auc,
                        _info: d
                    }
                  }),
                  title: "T-MMAE",
                  rootId: "auc-plot-2" ,
                  display:{ legend: false, title: false, borderbox: false, xTitle: true, yTitle: false }
                }


                Vis.launch(TDM1Config)
                Vis.launch(TMMAEConfig)
              })
          }
        }
      }
</script>
<style scoped>

#auc-plot-1, #auc-plot-2{
  width:500px;
  height:500px;
  margin:25px 0px;
  display:inline-block;
}
</style>