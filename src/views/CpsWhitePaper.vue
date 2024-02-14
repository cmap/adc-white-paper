<template>
  <div v-if="loading==false">

    <page-content> 
      <PaperHeader 
      title="Multiplexed cancer cell line combination screening using PRISM" 
      badge="White paper"
      date="03/01/2024" 
      authors="... Matthew G. Rees, Jennifer A. Roth"/>
      <PaperSection title="Introduction">
        <p class="text-body-1">Combination therapies are routinely used in cancer care, and patient cure is almost never achieved by monotherapy1. However, which combinations will benefit specific cancer patients is largely unknown. While many studies have used cell culture and animal model systems to characterize combination effects, the sheer number of clinical, investigational, and tool anticancer agents, coupled with the diversity and heterogeneity of cancer, precludes comprehensive investigation2–5. Accordingly, most such studies are restricted to a small number of drugs or a restricted set of cancer contexts. Methods to address these limitations, such as those that enable measurement of candidate combinations in many cell lines simultaneously, would greatly increase the potential scale of combinations research, generating preclinical evidence that may help identify candidate combinations for clinical trials.
        </p>
        <h3>The PRISM Combination Assay</h3>
        <v-row>
          <v-col>
            <ImageCard min-height="3em" title="900+ cancer cell lines"  :img="imgPath + 'PRISM_assay_cps_cell lines.png'"/>
          </v-col>
          <v-col>
            <ImageCard min-height="3em" title="Single-agent & combination treatment" :img="imgPath + 'PRISM_assay_cps_treatment.png'"/>
          </v-col>
          <v-col>
            <ImageCard min-height="3em" title="5-day viability assay"  :img="imgPath + 'PRISM_assay_cps_assay.png'"/>

          </v-col>
          <v-col>
            <ImageCard min-height="3em" title="Viability profile" :img="imgPath + 'PRISM_assay_cps_viability.png'"/>
          </v-col>
          
          <v-col>
            <ImageCard min-height="3em" title="Analysis with 100k+ features" :img="imgPath + 'PRISM_assay_cps_data.png'"/>
          </v-col>
          <v-col>
            <ImageCard min-height="3em" title="Identify candidates for clinical trials" :img="imgPath + 'PRISM_assay_cps_application.png'"/>
          </v-col>
        </v-row>
      </PaperSection>
      <PaperSection title="Analysis of combination data">
        <p class="text-body-1">Experimental combinations are generally benchmarked by comparing the effects of two (or more) agents to the corresponding single-agent activities, using established metrics to describe the combined effects (e.g., independent action, additivity, synergy, antagonism)6. For example, the Bliss model assesses proportional cell killing, where under the null hypothesis (no interaction between two or more perturbations) viability effects are multiplicative7. The quantification and classification of combination effects may aid prioritization of combinations for additional investigation while also providing biological and mechanistic insights. For example, antagonistic combinations might be deprioritized from further study, while synergistic combinations may be useful in overcoming resistance8. Independent (or additive) combinations may be useful to combat inter- or intra-patient heterogeneity; this behavior is characteristic of many effective clinical combinations (and most curative combinations) described to date9,10. 
      </p>
      <h3>Classifications of combination effects</h3>
      <v-row>
        <v-col>
          <ImageCard alignText="center" max-width="250" title="Additive" :img="imgPath + 'classification_additive.png'"/>
        </v-col>
        <v-col>
          <ImageCard align-text="center" max-width="250" title="Antagonistic"  :img="imgPath + 'classification_antagonistic.png'"/>
        </v-col>
        <v-col>
          <ImageCard align-text="center" max-width="250" title="Synergistic"  :img="imgPath + 'classification_synergistic.png'"/>
        </v-col>
      </v-row>
      </PaperSection>
      <PaperSection title="Considerations for dose selection">
        <p class="text-body-1">The ideal dose range for the single-agent components in combination screening would span at least one concentration with no effect on cell line viability but evidence for cellular activity (e.g., target engagement) across all models to be tested, and one dose where the maximal effects attributable to on-mechanism activity are observed. To facilitate determining this dose range for test combinations, we routinely assess single agents over a range of concentrations in up to 900 cell lines using PRISM. An alternative approach would test single-agent concentration ranges in a number of individual cell lines, and/or, if available, leverage published cell biology or screening data (e.g., at depmap.org).
        <br><br>
        For combination components with minimal differential viability effects, testing a single dose may represent the most efficient combinatorial design. By contrast, strong differential viability effects of one combination partner across cell lines supports the use of multiple doses; this approach also facilitates aggregation of the viability readout across doses (e.g., through fitting of dose-response curves). Where it is not possible to span the entire range of response to a given compound, it is recommended to focus on the lower end of the ideal concentration range (i.e., less cell viability effects) to facilitate identification of increased cell killing (e.g., additivity or synergy)–unless the experimental goal is to identify and characterize antagonistic combinations (e.g., drug rescue screens). 
        </p>
       [GRAPHIC]
      </PaperSection>
      <PaperSection title="Results">
        <PaperSubSection title="Selection of test combinations">
            <p>To test the suitability of PRISM for pooled cell line combination screening, we selected three test combinations: temozolomide+O6-benzylguanine, A-1331852+AZD5991, and ML210+ferrostatin-1.</p>
            <v-list>
                <v-list-item>
                  <v-list-item-title>temozolomide+O6-benzylguanine</v-list-item-title>
                  <v-list-item-subtitle>
                    MGMT (O-6-methylguanine-DNA methyltransferase) is an experimentally- and clinically-validated biomarker of resistance to temozolomide: MGMT reverses the action of temozolomide as the MGMT protein directly repairs temozolomide-induced alkylation11. Inhibition of MGMT by agents such as O6-benzylguanine has been reported to enhance temozolomide activity in a subset of MGMT-expressing cell lines in vitro8. O6-benzylguanine does not have appreciable viability effects in PRISM at concentrations sufficient to inhibit MGMT and enhance temozolomide sensitivity8.
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>A-1331852+AZD5991</v-list-item-title>
                  <v-list-item-subtitle>
                    MGMT (O-6-methylguanine-DNA methyltransferase) is an experimentally- and clinically-validated biomarker of resistance to temozolomide: MGMT reverses the action of temozolomide as the MGMT protein directly repairs temozolomide-induced alkylation11. As a single agent, we observe that resistance to temozolomide is strongly associated with MGMT expression across the large panel of cell lines in PRISM. Inhibition of MGMT by agents such as O6-benzylguanine has been reported to enhance temozolomide activity in a subset of MGMT-expressing cell lines in vitro8. O6-benzylguanine does not have appreciable viability effects in PRISM at concentrations sufficient to inhibit MGMT and enhance temozolomide sensitivity8.
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>ML210+ferrostatin-1</v-list-item-title>
                  <v-list-item-subtitle>
                    ML210 inhibits GPX4 (glutathione peroxidase 4) and kills cells via ferroptosis through generation of reactive lipid peroxide species; in PRISM, we observe that ML210 phenocopies GPX4 CRISPR dependency. Ferrostatin-1 is a radical-trapping antioxidant that protects cells from reactive species and therefore rescues cells from ferroptosis14,15. Ferrostatin-1 does not have appreciable viability effects in PRISM at concentrations sufficient to inhibit ferroptosis14.
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
        </PaperSubSection>
        <PaperSubSection title="Pooled combination screening results">
          <p>Because O6-benzylguanine and ferrostatin-1 demonstrated minimal effects on viability as single agents across a large panel of cell lines, we screened a single dose (5 µM and 10 µM, respectively) in combination with 7 concentrations of temozolomide (top concentration: 100µM; threefold dilution) and ML210 (top concentration: 10µM; threefold dilution), respectively. As both A-1331852 and AZD5991 had dose-dependent effects on cell viability, we screened a 5x5 matrix (threefold dilution) of these compounds (top concentrations: 0.041 and 0.37µM, respectively). Combinations and all component single agents at matching concentrations were plated using an HP D300e drug printer and screened in nearly 900 cancer cell lines using standard PRISM conditions and data processing [link]. </p>
      


          <PaperSubSection>
            <v-row>
              <v-col xs="12" sm="12" md="4" lg="4">
                <v-list-item-subtitle>7 concentrations <br>top concentration: 10µM; threefold dilution</v-list-item-subtitle>
                <v-list>
                  <v-list-item>
                    <v-list-item-title>temozolomide</v-list-item-title>
                    <v-list-item-subtitle>7 concentrations <br>top concentration: 100µM; threefold dilution</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>O6-benzylguanine</v-list-item-title>
                    <v-list-item-subtitle>1 concentration: 5 µM</v-list-item-subtitle>
                  </v-list-item>
                </v-list>

                <ViabilityMatrixPlots
                pert_id="BRD-K32107296_BRD-K92041145"
                rootName="BRD-K32107296_BRD-K92041145-viability-heatmap-plot"
                >
                </ViabilityMatrixPlots>
              </v-col>
              <v-col xs="12" sm="12" md="4" lg="4">
                <v-list-item-subtitle>7 concentrations <br>top concentration: 10µM; threefold dilution</v-list-item-subtitle>
                <v-list>
                  <v-list-item>
                    <v-list-item-title>ML210</v-list-item-title>
                    <v-list-item-subtitle>7 concentrations <br>top concentration: 10µM; threefold dilution</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>ferrostatin-1</v-list-item-title>
                    <v-list-item-subtitle>1 concentration:  10 µM</v-list-item-subtitle>
                  </v-list-item>
                  
                </v-list>
                <ViabilityMatrixPlots
                pert_id="BRD-K01877528_BRD-K97375133"
                rootName="BRD-K01877528_BRD-K97375133-viability-heatmap-plot"
                >
                </ViabilityMatrixPlots>
              </v-col>
              <v-col xs="12" sm="12" md="4" lg="4">
                <v-list-item-subtitle>Matrix: library agent and anchor agent tested at 5 doses in a 5x5 format</v-list-item-subtitle>
                <v-list>
                  <v-list-item>
                    <v-list-item-title>A-1331852</v-list-item-title>
                    <v-list-item-subtitle>5 concentrations <br>top concentration: 0.041µM; threefold dilution</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>AZD5991</v-list-item-title>
                    <v-list-item-subtitle>5 concentrations <br>top concentration: 0.037µM; threefold dilution</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
                <ViabilityMatrixPlots
                pert_id="BRD-K00005264_BRD-K50731585"
                rootName="BRD-K00005264_BRD-K50731585-viability-heatmap-plot"
                >
                </ViabilityMatrixPlots>
              </v-col>
            </v-row>
          </PaperSubSection>




          <PaperSubSection>
            <h4>Synergy Scores</h4>
            <p>
            We calculated a synergy score for combination effects at each dose combination pair based on the Bliss model, where under the null hypothesis (no interaction between perturbations) viability effects are multiplicative (i.e., log-viability effects are additive). In particular, the synergy score was defined as LFCa+LFCb−LFCc, where LFCa and LFCb are the log(2)-fold change (relative to vehicle treatment) in each constituent single-agent compound and LFCc is the log(2)-fold change in the combination. Large positive values indicate synergy (LFCa+LFCb > LFCc) while large negative values (LFCa+LFCb &lt; LFCc) indicate antagonism. Significance (q values) for synergy scores were calculated based on the standard error of each cell line‡.</p>

            
            [GRAPHIC]
          </PaperSubSection>
       

        
          <PaperSubSection>
            <h4>temozolomide+O6-benzylguanine</h4>
            <p>
              In the presence of O6-benzylguanine, cell lines that expressed MGMT were sensitized to temozolomide (i.e., synergy was observed) (figure 3). Intriguingly, while MGMT expression appeared necessary for sensitization to temozolomide, a subset of cell lines remained resistant to temozolomide even in the presence of O6-benzylguanine. Accordingly, we asked whether any baseline genomic features were associated with the calculated temozolomide+O6-benzylguanine synergy score in MGMT-high expressing cell lines (MGMT expression > 1.5, see figure X). We found that low expression of the MSH6 gene (and low protein levels of MSH6, or its heterodimeric partner protein MSH2) were associated with lack of synergy in MGMT-proficient cell lines. MSH2 and MSH6 are genes involved in DNA mismatch repair, and their loss has been previously suggested to be associated with resistance to temozolomide16,17.
            </p>
            <SynergyByDosePlots 
              pert_id="BRD-K32107296_BRD-K92041145"
              pert_plate="PCPS020"
              project="CPS010_VALIDATION_COMPOUNDS"
              screen="CPS010"
              rootName="BRD-K32107296_BRD-K92041145-synergy-plots"
              :dict="Mgmt_Ge_Dict"
              >
              </SynergyByDosePlots>
          </PaperSubSection>
        
          <PaperSubSection>
            <h4>ML210+ferrostatin-1</h4>
            <p></p>
              <SynergyByDosePlots 
                pert_id="BRD-K01877528_BRD-K97375133"
                pert_plate="PCPS020"
                project="CPS010_VALIDATION_COMPOUNDS_INTERNAL"
                screen="CPS010"
                rootName="BRD-K01877528_BRD-K97375133-synergy-plots"
                :dict="Gpx4_Xpr_Dict"
              >
              </SynergyByDosePlots>
          </PaperSubSection>
        
          <PaperSubSection>
            <h4>A-1331852+AZD5991</h4>
            <p></p>
              <SynergyByDosePlots 
                pert_id="BRD-K00005264_BRD-K50731585"
                pert_plate="PCPS020"
                project="CPS010_VALIDATION_COMPOUNDS_INTERNAL"
                screen="CPS010"
                rootName="BRD-K00005264_BRD-K50731585-synergy-plots"
                :dict="Gpx4_Xpr_Dict"
              >
              </SynergyByDosePlots>
          </PaperSubSection>

        </PaperSubSection>

      </PaperSection>


      <PaperSection title="Conclusion">
        <p class="text-body-1">Paragraph</p>
      </PaperSection>

      
      <PaperSection title="References">
        <v-card elevation="0" class="py-0">
      <ol>
       <li></li>
        <li></li>
        <li></li>
      </ol>
    </v-card>
      </PaperSection>
    </page-content>

  </div>
</template>
<script>
const dataPath = import.meta.env.PROD ? import.meta.env.BASE_URL+"/data/" : "../../data/";
import * as d3 from 'd3';
import PageContent from '@/components/PageContent.vue';
import PaperHeader from '@/components/PaperHeader.vue';
import PaperSection from '@/components/PaperSection.vue';
import PaperSubSection from '@/components/PaperSubSection.vue';
import BlockContent from '@/components/BlockContent.vue';
import SynergyByDosePlots from './2024_04_cps/SynergyByDosePlots.vue';
import ViabilityMatrixPlots from './2024_04_cps/ViabilityMatrixPlots.vue';
import ColorMatrix from '@/components/ColorMatrix.vue';
import ImageCard from '@/components/ImageCard.vue'

export default {
  name: 'CpsWhitePaper',
  components: {
    PageContent,
    PaperHeader,
    PaperSection,
    PaperSubSection,
   SynergyByDosePlots,
    ViabilityMatrixPlots,
    ImageCard
    
// BlockContent
  },
  props: {

  },
  data: () => ({
    loading: false,
    Mgmt_Ge_Dict: {},
    Gpx4_Xpr_Dict: {}
  }),
  computed: {
    imgPath () {

          return import.meta.env.PROD ? import.meta.env.BASE_URL + "/graphics/2024_04_cps/" : "../../graphics/2024_04_cps/";
          
        }

  },

 async created() {
  await this.getMGMTGeDict();
  },
  mounted(){

  },
  methods: {
    async getMGMTGeDict(){
    let dict1 = {}, dict2={};
      Promise.all([
                d3.csv(`${dataPath}2024_04_cps/temo_benzyl_data.csv`, function(d){
                  dict1[d["ccle_name"]] = d["GE_MGMT"]
                }),
                d3.csv(`${dataPath}2024_04_cps/ml210_ferro_data.csv`, function(d){
                  dict2[d["ccle_name"]] = d["XPR_GPX4"]
                }),
              ]).then(response=>{
                this.Mgmt_Ge_Dict = dict1;
                this.Gpx4_Xpr_Dict = dict2;
                
            })
    }


  },
  watch: {

  }
}
</script>

<style>
.paper-sub-sub-section{
  margin-top: 32px !important;
  margin-bottom: 32px !important;
}
.card-title{
  font-size: 0.9em !important;
}
</style>
