<template>
  <v-container class="px-16">

      <PaperHeader title="PRISM high throughput screening of antibody-drug conjugates uncovers clinically relevant targets" sup-title="White Paper" date="07/27/2023"/>
      <p>
        Antibody-drug conjugates (ADCs) are a rapidly growing class of cancer therapeutics. ADCs combine the targeting specificity of monoclonal antibodies with the cytotoxicity of small molecules to provide highly targeted delivery of drug payloads, while sparing healthy tissue from chemotherapeutic damage. Although ADCs have demonstrated significant success in the clinic, ADC development continues to be a challenging endeavor that is time consuming, expensive, and has a high failure rate.<br><br>
        Cell-based functional screening is an essential step in the development of ADCs. The outcome of these preclinical studies can aid in evaluating promising ADC candidates, validating target specificity, and predicting in vivo efficacy. To help facilitate the identification of promising new ADCs, we developed a PRISM screening assay that enables high throughput profiling of ADC activity in hundreds of cell lines simultaneously. In this paper, we demonstrate the utility of PRISM screening to uncover clinically relevant targets.
      </p>

      <section>
        <h2>The PRISM Assay</h2>
        <div class="d-flex align-center">
        <ImageCard title="900+ cancer cell lines" description="pooled+barcoded" img="../../graphics/01 PRISM hero cell lines.png"/>
        <ImageCard title="Antibody-drug conjugate" description="test agents" img="../../graphics/02 PRISM hero test agents.png"/>
        <ImageCard title="5-day viability assay" description="plated+treated" img="../../graphics/03 PRISM hero viability assay.png"/>
        <ImageCard title="Target validation + discovery" description="comprehensive data" img="../../graphics/04 PRISM hero data.png"/>
      </div>
      <p>Our multiplexed cell viability platform, PRISM (profiling relative inhibition simultaneously in mixtures), enables screening of potential cancer therapeutics at an unprecedented scale. We routinely assess the effects of perturbations against more than 900 cancer cell lines concurrently using unique oligonucleotide barcodes stably transduced into individual cancer cell lines. Following barcode transduction, individual cell lines are pooled together in groups of 20-25 based on growth rate similarity, then thawed into 384-well assay-ready plates containing compounds of interest. After 5 days of growth, isolated mRNA is used to detect transcribed barcode abundance of each individual cancer cell line to measure relative viability. We leverage the baseline cellular features (e.g., gene expression, cell lineage, mutation, copy number, metabolomics, proteomics, genome-wide RNAi and CRISPR dependencies) of each cell line to interpret viability profiles, enabling identification of drivers of differential sensitivity and potential biomarkers of compound response.
      </p>
      </section>


<section>
  <h2>Target specific cytotoxicity and bystander killing activity</h2>
  <p>Trastuzumab alone was relatively inert across all PRISM cell lines, as expected.
  T-DM1 and T-MMAE induced a selective pattern of cell killing in a subset of ERBB2 (HER2) overexpressing cell lines.
    <br><br>
    While both T-DM1 and T-MMAE were strongly selective for ERBB2 overexpressing cell lines, the cytotoxicity of T-DM1 was restricted to HER2 overexpressing cells lines whereas T-MMAE exhibited broader cytotoxicity across PRISM cell lines.
  </p>
  <div>
    <svg  class="plot" id="plot-1"></svg>
    <svg  class="plot" id="plot-2"></svg>
  </div>
  <p>These results are consistent with expectations based on linker/payloads of these two ADCs: cell killing should be restricted to antigen expressing cell lines for ADCs with non-permeable payloads (i.e. T-DM1), whereas we expect to see some target-independent activity for ADCs with cell permeable payloads that are capable of exerting bystander effects (i.e. T-MMAE).
  </p>
</section>



<section>
    <h2>PRISM screening identifies relevant biomarkers</h2>
    <p>Biomarker analysis revealed ERBB2 gene expression was observed as a significantly correlated hit for both T-DM1 and T-MMAE. </p>
    <div>
      <svg class="plot" id="plot-3"></svg>
      <svg class="plot" id="plot-4"></svg>
    </div>
    <p>Additionally, when comparing PRISM profiles with shRNA dependency data, ERBB2 emerged as one of the top correlated dependencies for both T-DM1 and T-MMAE.
    </p>
    <div>
        <svg class="plot" id="plot-5"></svg>
        <svg class="plot" id="plot-6"></svg>
      </div>
      <p>Importantly, these results demonstrate that despite observing a higher amount of target-independent cytotoxicity by T-MMAE compared to T-DM1, we were still able to identify the relevant biomarker (HER2) as a target for both ADCs. These results suggest that PRISM screening is capable of distinguishing between permeable and non-permeable payloads, while retaining selectivity of the primary target.
      </p>


</section>



  </v-container>
</template>

<script>
  import PaperHeader from '@/components/PaperHeader.vue'
  import ImageCard from '@/components/ImageCard.vue'
  import $ from "jquery";
  import * as d3 from "d3";
  import * as Vis from '../js/Vis.js';


  const dataPath = "../../data/";
  export default {
        name: 'HomePage',
        components: {PaperHeader, ImageCard},
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
                }),
                d3.csv(`${dataPath}biomarker_GE_T-DM1.csv`, function(d){
                    return {
                      feature: d["feature"],
                      coef: +d["coef"],
                      qval: +d["qval"]
                    }
                }),
                d3.csv(`${dataPath}biomarker_GE_T-MMAE.csv`, function(d){
                    return {
                      feature: d["feature"],
                      coef: +d["coef"],
                      qval: +d["qval"]
                    }
                }),
                d3.csv(`${dataPath}biomarker_shRNA_T-DM1.csv`, function(d){
                    return {
                      feature: d["feature"],
                      coef: +d["coef"],
                      qval: +d["qval"]
                    }
                }),
                d3.csv(`${dataPath}biomarker_shRNA_T-MMAE.csv`, function(d){
                    return {
                      feature: d["feature"],
                      coef: +d["coef"],
                      qval: +d["qval"]
                    }
                })

              ]).then(response=>{
                let TDM1_AUC_Config = {
                  data: response[0].map(d=>{
                    return {
                        x: d.TDM1_auc,
                        y: d.ERBB2_expression,
                        r: 3,
                        _info: d
                    }
                  }),
                  title: "T-DM1",
                  rootId: "plot-1"
                }
                let TMMAE_AUC_Config = {
                    data: response[1].map(d=>{
                    return {
                        x: d.Trastuzumab_MMAE_auc,
                        y: d.ERBB2_expression,
                        r: 3,
                        _info: d
                    }
                  }),
                  title: "T-MMAE",
                  rootId: "plot-2"
                }
                let TDM1_GE_Config = {
                    data: response[2].map(d=>{
                    return {
                        x: d.coef,
                        y: d.qval,
                        r: 3,
                        _info: d
                    }
                  }),
                  title: "T-MD1:  GE dependency for ERBB2",
                  rootId: "plot-3"
                }
                let TMMAE_GE_Config = {
                    data: response[3].map(d=>{
                    return {
                        x: d.coef,
                        y: d.qval,
                        r: 3,
                        _info: d
                    }
                  }),
                  title: "T-MMAE: GE dependency for ERBB2",
                  rootId: "plot-4" ,
                }
                let TDM1_shRNA_Config = {
                    data: response[4].map(d=>{
                    return {
                        x: d.coef,
                        y: d.qval,
                        r: 3,
                        _info: d
                    }
                  }),
                  title: "T-MD1: shRNA dependency for ERBB2",
                  rootId: "plot-5"
                }
                let TMMAE_shRNA_Config = {
                    data: response[5].map(d=>{
                    return {
                        x: d.coef,
                        y: d.qval,
                        r: 3,
                        _info: d
                    }
                  }),
                  title: "T-MMAE: shRNA dependency for ERBB2",
                  rootId: "plot-6"
                }

                Vis.useScatter(TDM1_AUC_Config)
                Vis.useScatter(TMMAE_AUC_Config)
                Vis.useVolcano(TDM1_GE_Config)
                Vis.useVolcano(TMMAE_GE_Config)
                Vis.useVolcano(TDM1_shRNA_Config)
                Vis.useVolcano(TMMAE_shRNA_Config)
              })
          }
        }
      }
</script>
<style scoped>

.plot{
  height:400px;
  width:400px;
  margin:25px 0px;
  display:inline-block;
}

</style>
