<template>
  <v-container class="px-16">
    <PaperHeader title="PRISM high throughput screening of antibody-drug conjugates uncovers clinically relevant targets" sup-title="White Paper" date="07/27/2023"/>
    <PaperSection title="Introduction">
      
      <p>
        Antibody-drug conjugates (ADCs) are a rapidly growing class of cancer therapeutics, with approximately two dozen ADCs approved or in late-stage clinical trials through 2022<sup>1,2</sup>. ADCs combine the targeting specificity of monoclonal antibodies with the cytotoxicity of small molecules to provide highly targeted delivery of drug payloads; the ideal ADC would recognize a cancer-cell specific antigen but spare healthy tissue from indiscriminate chemotherapeutic damage3,4. Although ADCs have achieved significant success in the clinic, ADC development continues to be a challenging endeavor that is time consuming, expensive, and has a high failure rate<sup>5,6</sup>.
        <br><br>
        Much of the difficulty in ADC development arises from their multifaceted structural properties and diverse pharmacological activity<sup>7</sup>. They exhibit properties of both biologics and small molecule inhibitors, can exert activity through multiple mechanisms, and some are capable of inducing target-independent cell killing via a phenomenon known as the bystander effect. Due to this inherent structural and biological complexity, cell-based functional screening plays a crucial role in the initial screening, characterization, and optimization of ADCs. However, such in vitro studies are often performed on a small number of cell lines and thus provide limited information on ADC behavior, resulting in much uncertainty as an ADC progresses through the development pipeline<sup>8</sup>. There is a need for better in vitro screening tools that can provide more comprehensive insights into ADC mechanisms, effectiveness, and potential limitations, leading to more informed decision-making in early stages of development and reducing the risk of failures in later stages of the process.
        <br><br>
        To help facilitate the characterization of ADCs, we developed a screening assay that enables high throughput profiling of the viability effects of ADCs in hundreds of cell lines simultaneously. 
      </p>


      <PaperSubSection title="The PRISM assay">
        <div class="d-flex align-center">
          <ImageCard title="900+ cancer cell lines" description="pooled+barcoded" img="../../graphics/01 PRISM hero cell lines.png"/>
          <ImageCard title="Antibody-drug conjugate" description="test agents" img="../../graphics/02 PRISM hero test agents.png"/>
          <ImageCard title="5-day viability assay" description="plated+treated" img="../../graphics/03 PRISM hero viability assay.png"/>
          <ImageCard title="Target validation + discovery" description="comprehensive data" img="../../graphics/04 PRISM hero data.png"/>
        </div>
        <p>
          Our multiplexed cell viability platform, PRISM (profiling relative inhibition simultaneously in mixtures), enables screening of potential cancer therapeutics at an unprecedented scale<sup>9,10</sup>. We routinely assess the effects of perturbations against hundreds of cancer cell lines concurrently using unique oligonucleotide barcodes stably transduced into individual lines. Following barcode transduction, individual cell lines are pooled together in groups of 20-25 based on growth rate similarity, then thawed into 384-well assay-ready plates and treated with test articles of interest. After 5 days of incubation, isolated mRNA is used to quantify transcribed barcode abundance of each individual cancer cell line to calculate relative viability. We leverage the baseline cellular features (e.g., gene expression, cell lineage, mutation, copy number, metabolomics, proteomics, genome-wide RNAi and CRISPR dependencies) of each cell line to interpret viability profiles, enabling identification of drivers of differential sensitivity and potential biomarkers of response. Visit our <a href="https://www.theprismlab.org/knowledge-base/#prism-assay" target="_blank">knowledge base</a> to learn more about the PRISM assay. 
          <br><br>
          The full collection of PRISM cell lines contains over 900 barcoded cell lines representing more than 45 lineages. The collection is divided into two cell sets: (1) PR500 cell set of 488 solid tumor adherent cell lines, and (2) PR300+ cell set of 431 hematopoietic, solid tumor, and pediatric cell lines. Within each cell set, cell lines are pooled in groups of 20-25 based on their growth rates. See a full annotated list of our PRISM barcoded cell lines <a href="https://docs.google.com/spreadsheets/d/1PcxxZ0O6U20megXtVs6BL10Jr-qnIZPbKk_MXKwz_BI/edit#gid=802313244" target="_blank">here</a>.
        </p>
      </PaperSubSection>
      <PaperSubSection title="Antibody-Drug Conjugates">
        <p>
          ADCs are a class of therapeutics which exploit the properties of monoclonal antibodies to achieve targeted delivery of drug payloads to specific cell populations. Over the past decade, ADCs have seen expansive growth and success in the oncology field, and growing momentum for applications beyond oncology indications<sup>11</sup>. 
          <br><br>
          ADCs are a structurally and biologically complex therapeutic modality<sup>12</sup>. They are composed of three main components: an antibody, a linker, and a cytotoxic payload, each of which can have unique characteristics and activity profiles that affect functional performance and stability of the ADC<sup>13</sup>. For example, whether an ADC is conjugated using a cleavable or non-cleavable linker will affect its stability and target specific activity. Likewise, ADC efficacy is intrinsically related to the characteristics and mechanisms of action of the cytotoxic payload. ADCs that release membrane-permeable payloads can diffuse into neighboring cells and induce antigen-independent cytotoxicity, an activity of ADCs known as the bystander effect. Another factor impacting ADC efficacy is the number of cytotoxic molecules linked to each antibody, referred to as the drug to antibody ratio (DAR). Additional complexity arises from the heterogeneous nature of ADC mixtures, which typically contain varying amounts of free antibody and free payload, each of which can exert their own activity. 
        </p>

        <HorizontalImageCard img="../../graphics/adc_components.png">
          <ContentBlock>
            <ul class="no-bullets">
              <li><b>Antibody</b>: targets a highly expressed antigen on the surface of cancer cells, acts as a targeted delivery system for cytotoxic agents</li>
              <li><b>Linker</b>: can be cleavable or non-cleavable, determines ADC stability in circulation and the mechanism of payload release after an ADC is internalized by antigen-expressing target cells</li>
              <li><b>Payload</b>: a highly potent compound that drives the primary biological activity of the ADC. Current approved payloads fall into three classes: microtubule inhibitors, DNA-damaging agents, or topoisomerase inhibitors.</li>
            </ul>
          </ContentBlock>
        </HorizontalImageCard>    
        <p>
          The primary mechanism of ADC-induced cytotoxicity occurs via their internalization into target antigen-expressing cancer cells. Upon reaching and binding the target antigen, ADCs are taken up by the cell through receptor-mediated endocytosis<sup>14</sup>. Drug payloads are subsequently released following lysosomal degradation into the cytosol, where they then induce death of the target cell via a pathway specific to the mechanism of action of the payload. In addition to target-specific cell killing, some ADC payloads can exert a bystander effect. If the free drug payload is cell permeable, it can kill not only antigen-expressing cells but also neighboring antigen-negative cells.
        </p>
                  
        <v-img class="center" width="50%" src="../../graphics/adc_killing_mechanism.png"></v-img>

      </PaperSubSection>

      <PaperSubSection title="HER2 as a cancer target ">
          <p></p>
      </PaperSubSection>

      <PaperSubSection title="Screening HER2-targeting ADCs in PRISM">
          <p></p>
      </PaperSubSection>
    </PaperSection>

    <ContentBlock>
      Trastuzumab: a therapeutic monoclonal antibody with clinical indications for HER2 overexpressing solid tumors. It is sold under the brand name Herceptin.
      <br><br>
    Trastuzumab emtansine (T-DM1): an ADC consisting of trastuzumab conjugated via a non-cleavable linker (MCC; maleimidomethyl cyclohexane-1-carboxylate) to mertansine (also called DM1), a cytotoxic microtubule inhibitor, with a DAR of 3.518. After T-DM1 is internalized into cells, the released payload (emtansine) is unable to cross the membrane of surrounding HER2-negative cells and is therefore not associated with a bystander killing effect. T-DM1 is FDA approved for the treatment of HER2-overexpressing breast cancer. It is sold under the brand name Kadcyla.
    <br><br>
    Trastuzumab-monomethyl auristatin E (T-MMAE): an ADC consisting of trastuzumab conjugated with a cleavable MC—VC—PAB (maleimidocaproyl— valine-citrulline— para-amino benzyl alcohol) linker to monomethyl auristatin E (MMAE), a microtubule inhibitor, at a DAR of 4. T-MMAE was specifically designed to release MMAE, a cell-permeable payload that therefore can exert bystander killing activity. 

    </ContentBlock>
<!-- 

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


  </section> -->


     
  </v-container>
</template>

<script>
  import PaperHeader from '@/components/PaperHeader.vue'
  import PaperSection from '@/components/PaperSection.vue'
  import PaperSubSection from '@/components/PaperSubSection.vue'
  import ContentBlock from '@/components/ContentBlock.vue'
  import ImageCard from '@/components/ImageCard.vue'
  import HorizontalImageCard from '@/components/HorizontalImageCard.vue'
  // import $ from "jquery";
  import * as d3 from "d3";
  import * as Vis from '../js/Vis.js';


  const dataPath = "../../public/data/";
  export default {
        name: 'AntibodyDrugCongugatersPaper',
        components: {PaperHeader, PaperSection, PaperSubSection, ContentBlock, ImageCard, HorizontalImageCard},
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