<template>
  <div v-if="!loading">
    <page-content> 
      <PaperHeader 
      title="Multiplexed cancer cell line combination screening using PRISM" 
      badge="White paper"
      date="03/01/2024" 
      authors="... Matthew G. Rees, Jennifer A. Roth"/>
      <PaperSection title="Introduction">
        <p>Combination therapies are routinely used in cancer care, and patient cure is almost never achieved by monotherapy1. However, which combinations will benefit specific cancer patients is largely unknown. While many studies have used cell culture and animal model systems to characterize combination effects, the sheer number of clinical, investigational, and tool anticancer agents, coupled with the diversity and heterogeneity of cancer, precludes comprehensive investigation2–5. Accordingly, most such studies are restricted to a small number of drugs or a restricted set of cancer contexts. Methods to address these limitations, such as those that enable measurement of candidate combinations in many cell lines simultaneously, would greatly increase the potential scale of combinations research, generating preclinical evidence that may help identify candidate combinations for clinical trials.
        </p>
          <h4>The PRISM Combination Assay</h4>
          <v-row>
            <v-col cols="12" sm="6" md="3" lg="3" xl="3">
              <ImageCard min-height="3em" title="900+ cancer cell lines" description="pooled + barcoded" :img="imgPath + 'main-graphic-46.png'"/>
            </v-col>
            <v-col cols="12" sm="6" md="3" lg="3" xl="3">
              <ImageCard min-height="3em" title="Single-agent + combination" description="plated + treated pools" :img="imgPath + 'main-graphic-47.png'"/>
            </v-col>
            <v-col cols="12" sm="6" md="3" lg="3" xl="3">
              <ImageCard min-height="3em" title="Sensitivity profile" description="Comparisons across doses" :img="imgPath + 'main-graphic-48.png'"/>
            </v-col>
            <v-col cols="12" sm="6" md="3" lg="3" xl="3">
              <ImageCard min-height="3em" title="Candidate combination discovery" description="Comparisons across doses" :img="imgPath + 'main-graphic-49.png'"/>
            </v-col>
          </v-row>
      </PaperSection>

      <PaperSection title="Analysis of combination data">
        <p>Experimental combinations are generally benchmarked by comparing the effects of two (or more) agents to the corresponding single-agent activities, using established metrics to describe the combined effects (e.g., independent action, additivity, synergy, antagonism)6. For example, the Bliss model assesses proportional cell killing, where under the null hypothesis (no interaction between two or more perturbations) viability effects are multiplicative7. The quantification and classification of combination effects may aid prioritization of combinations for additional investigation while also providing biological and mechanistic insights. For example, antagonistic combinations might be deprioritized from further study, while synergistic combinations may be useful in overcoming resistance8. Independent (or additive) combinations may be useful to combat inter- or intra-patient heterogeneity; this behavior is characteristic of many effective clinical combinations (and most curative combinations) described to date9,10. 
        </p>
          <h4>Classifications of combination effects</h4>
          <v-row>
            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
                <ImageCard align-text="center" title="Additive" :img="imgPath + 'combo_effects-1.svg'"/>
            </v-col>
            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <ImageCard align-text="center" title="Antagonistic" :img="imgPath + 'combo_effects-2.svg'"/>
            </v-col>
            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <ImageCard align-text="center" title="Synergistic" :img="imgPath + 'combo_effects-3.svg'"/>
            </v-col>
          </v-row>


      </PaperSection>
      <PaperSection title="Considerations for dose selection">
        <p>The ideal dose range for the single-agent components in combination screening would span at least one concentration with no effect on cell line viability but evidence for cellular activity (e.g., target engagement) across all models to be tested, and one dose where the maximal effects attributable to on-mechanism activity are observed. To facilitate determining this dose range for test combinations, we routinely assess single agents over a range of concentrations in up to 900 cell lines using PRISM. An alternative approach would test single-agent concentration ranges in a number of individual cell lines, and/or, if available, leverage published cell biology or screening data (e.g., at depmap.org).
        <br><br>
        For combination components with minimal differential viability effects, testing a single dose may represent the most efficient combinatorial design. By contrast, strong differential viability effects of one combination partner across cell lines supports the use of multiple doses; this approach also facilitates aggregation of the viability readout across doses (e.g., through fitting of dose-response curves). Where it is not possible to span the entire range of response to a given compound, it is recommended to focus on the lower end of the ideal concentration range (i.e., less cell viability effects) to facilitate identification of increased cell killing (e.g., additivity or synergy)–unless the experimental goal is to identify and characterize antagonistic combinations (e.g., drug rescue screens). 
        </p>
          <h4>Pairing combination components based on differential viability effects</h4>
          <v-row>
            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-img class="px-6" :src="imgPath + 'combination_components-7x1.png'"></v-img>
            </v-col>
            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-img class="px-6" :src="imgPath + 'combination_components-5x5.png'"></v-img>
            </v-col>
          </v-row>
      </PaperSection>
      <PaperSection title="Results">
        <PaperSubSection title="Selection of test combinations">
            <p>To test the suitability of PRISM for pooled cell line combination screening, we selected three test combinations: temozolomide+O6-benzylguanine, A-1331852+AZD5991, and ML210+ferrostatin-1.</p>
            <v-list>
                <v-list-item>
                  <v-list-item-title>temozolomide + O6-benzylguanine</v-list-item-title>
                  <v-list-item-subtitle>
                    MGMT (O-6-methylguanine-DNA methyltransferase) is an experimentally- and clinically-validated biomarker of resistance to temozolomide: MGMT reverses the action of temozolomide as the MGMT protein directly repairs temozolomide-induced alkylation11. Inhibition of MGMT by agents such as O6-benzylguanine has been reported to enhance temozolomide activity in a subset of MGMT-expressing cell lines in vitro8. O6-benzylguanine does not have appreciable viability effects in PRISM at concentrations sufficient to inhibit MGMT and enhance temozolomide sensitivity8.
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>A-1331852 + AZD5991</v-list-item-title>
                  <v-list-item-subtitle>
                    MGMT (O-6-methylguanine-DNA methyltransferase) is an experimentally- and clinically-validated biomarker of resistance to temozolomide: MGMT reverses the action of temozolomide as the MGMT protein directly repairs temozolomide-induced alkylation11. As a single agent, we observe that resistance to temozolomide is strongly associated with MGMT expression across the large panel of cell lines in PRISM. Inhibition of MGMT by agents such as O6-benzylguanine has been reported to enhance temozolomide activity in a subset of MGMT-expressing cell lines in vitro8. O6-benzylguanine does not have appreciable viability effects in PRISM at concentrations sufficient to inhibit MGMT and enhance temozolomide sensitivity8.
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>ML210 + ferrostatin-1</v-list-item-title>
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
               
                <v-list>
                  <v-list-item>
                    <v-list-item-title><strong>temozolomide + O6-benzylguanine</strong></v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>temozolomide</v-list-item-title>
                    <v-list-item-subtitle>7 concentrations <br>top concentration: 100µM; threefold dilution</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>O6-benzylguanine</v-list-item-title>
                    <v-list-item-subtitle>1 concentration: 5 µM</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col xs="12" sm="12" md="4" lg="4">
                <v-list>
                  <v-list-item>
                    <v-list-item-title><strong>ML210 + ferrostatin-1</strong></v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>ML210</v-list-item-title>
                    <v-list-item-subtitle>7 concentrations <br>top concentration: 10µM; threefold dilution</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>ferrostatin-1</v-list-item-title>
                    <v-list-item-subtitle>1 concentration:  10 µM</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col xs="12" sm="12" md="4" lg="4">
                <v-list>
                  <v-list-item>
                    <v-list-item-title><strong>A-1331852 + AZD5991</strong></v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>A-1331852</v-list-item-title>
                    <v-list-item-subtitle>5 concentrations <br>top concentration: 0.041µM; threefold dilution</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>AZD5991</v-list-item-title>
                    <v-list-item-subtitle>5 concentrations <br>top concentration: 0.037µM; threefold dilution</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </PaperSubSection>
          <PaperSubSection>
            <h4>Synergy Scores</h4>
            <p>
              We calculated a synergy score for combination effects at each dose combination pair based on the Bliss model, where under the null hypothesis (no interaction between perturbations) viability effects are multiplicative (i.e., log-viability effects are additive). In particular, the synergy score was defined as LFCa+LFCb−LFCc, where LFCa and LFCb are the log(2)-fold change (relative to vehicle treatment) in each constituent single-agent compound and LFCc is the log(2)-fold change in the combination. Large positive values indicate synergy (LFCa+LFCb > LFCc) while large negative values (LFCa+LFCb &lt; LFCc) indicate antagonism. Significance (q values) for synergy scores were calculated based on the standard error of each cell line‡.
            </p>
            <v-row>
              <v-col cols="12" sm="12" md="4" lg="4" xl="4">
                <img style="width:100%" :src="imgPath + 'synergy-calculation.svg'">
              </v-col>
            </v-row>
          </PaperSubSection>
          <PaperSubSection>
            <h4>temozolomide + O6-benzylguanine</h4>
            <p>
              In the presence of O6-benzylguanine, cell lines that expressed MGMT were sensitized to temozolomide (i.e., synergy was observed) (figure 3). Intriguingly, while MGMT expression appeared necessary for sensitization to temozolomide, a subset of cell lines remained resistant to temozolomide even in the presence of O6-benzylguanine. Accordingly, we asked whether any baseline genomic features were associated with the calculated temozolomide+O6-benzylguanine synergy score in MGMT-high expressing cell lines (MGMT expression > 1.5, see figure X). We found that low expression of the MSH6 gene (and low protein levels of MSH6, or its heterodimeric partner protein MSH2) were associated with lack of synergy in MGMT-proficient cell lines. MSH2 and MSH6 are genes involved in DNA mismatch repair, and their loss has been previously suggested to be associated with resistance to temozolomide16,17.
            </p>
              <TemoSynergyByDosePlots 
                rootName="temo_benzyl_synergy_plots" 
              ></TemoSynergyByDosePlots>
          
          </PaperSubSection>
          <PaperSubSection>
            <h4>ML210 + ferrostatin-1</h4>
            <p>Universally across cell lines, we observed that ferrostatin-1 antagonized the effects of ML210. [analytical: confirm support for this statement] (figure 3)</p>
            <Ml210SynergyByDosePlots 
                rootName="ml210_ferro_synergy_plots" 
              ></Ml210SynergyByDosePlots>
          </PaperSubSection>
          <PaperSubSection>
            <h4>A-1331852 + AZD5991</h4>
            <SynergyByDosePlots 
                :data="azd_a133_data" 
                rootName="azd_a133_synergy_plots" 
                combinationName="azd_a133"
              ></SynergyByDosePlots>

          </PaperSubSection>
        </PaperSubSection>
      </PaperSection>
      <PaperSection title="Conclusion">
        <p>
          Combination screening is a challenging scientific, analytical, and logistical endeavor. As studies to date have suggested combination partner interactions are difficult to predict and highly context specific, a robust platform for high-throughput screening of combinations could provide substantial value to the scientific community. Multiplexing cell lines using PRISM enables data generation at an unprecedented scale: here, we demonstrate that PRISM can clearly identify synergistic and antagonistic combinations, as well as biomarkers relevant to combination interactions (e.g., MGMT expression in the context of temozolomide+O6-benzylguanine). 
          <br><br>
          Dose selection is one of the most important considerations for combination screening, ensuring combination effects can be reliably and efficiently measured across the largest number of cell lines. Differential single-agent activity across cell lines can be measured or estimated in a number of ways: by first running compounds as single agents at dose in PRISM, by leveraging existing public data (e.g., at depmap.org), or by measuring response in a panel of individual cell lines. 
          <br><br>
          [a paragraph about the analysis/analytics learnings would be useful]
          <br><br>
          Currently, combination screening is offered through PRISM using a variety of formats [link]. 7x1 combinations are useful where one component (the “anchor” agent) has limited differential viability effects, facilitating identification of a single concentration informative for screening. Where both agents have strong differential viability effects, we recommend matrixed designs such as 5x3 or 5x5. 
        </p>
      </PaperSection>
      <PaperSection title="References">
        <v-card elevation="0" class="py-0">
          <ol>
          <li>Eder, J. P. & Hafez, N. Principles of dose, schedule, and combination therapy. Holland-Frei Cancer Medicine 1–13 Preprint at https://doi.org/10.1002/9781119000822.hfcm055.pub3 (2022).</li>
            <li>Griner, L. A. M. et al. High-throughput combinatorial screening identifies drugs that cooperate with ibrutinib to kill activated B-cell–like diffuse large B-cell lymphoma cells. Proceedings of the National Academy of Sciences 111, 2349–2354 (2014).</li>
            <li>Jaaks, P. et al. Effective drug combinations in breast, colon and pancreatic cancer cells. Nature 603, 166–173 (2022).</li>
            <li>Menden, M. P. et al. Community assessment to advance computational prediction of cancer drug combinations in a pharmacogenomic screen. Nat. Commun. 10, 2674 (2019).</li>
            <li>Gao, H. et al. High-throughput screening using patient-derived tumor xenografts to predict clinical trial drug response. Nat. Med. 21, 1318–1325 (2015).</li>
            <li>Berenbaum, M. C. What is synergy? Pharmacol. Rev. 41, 93–141 (1989).</li>
            <li>Bliss, C. I. THE TOXICITY OF POISONS APPLIED JOINTLY1. Ann. Appl. Biol. 26, 585–615 (1939).</li>
            <li>Rees, M. G. et al. Systematic identification of biomarker-driven drug combinations to overcome resistance. Nat. Chem. Biol. 18, 615–624 (2022).</li>
            <li>Palmer, A. C. & Sorger, P. K. Combination Cancer Therapy Can Confer Benefit via Patient-to-Patient Variability without Drug Additivity or Synergy. Cell 171, 1678–1691.e13 (2017).</li>
            <li>Frei, E., 3rd & Freireich, E. J. Progress and perspectives in the chemotherapy of acute leukemia. Adv. Chemother. 2, 269–298 (1965).</li>
            <li>Hegi, M. E. et al. MGMT gene silencing and benefit from temozolomide in glioblastoma. N. Engl. J. Med. 352, 997–1003 (2005).</li>
            <li>Najm, F. J. et al. Orthologous CRISPR-Cas9 enzymes for combinatorial genetic screens. Nat. Biotechnol. 36, 179–189 (2018).</li>
            <li>Abdul Rahman, S. F. et al. Co-inhibition of BCL-XL and MCL-1 with selective BCL-2 family inhibitors enhances cytotoxicity of cervical cancer cell lines. Biochem Biophys Rep 22, 100756 (2020).</li>
            <li>Dixon, S. J. et al. Ferroptosis: an iron-dependent form of nonapoptotic cell death. Cell 149, 1060–1072 (2012).</li>
            <li>Yang, W. S. et al. Regulation of ferroptotic cancer cell death by GPX4. Cell 156, 317–331 (2014).</li>
            <li>Cahill, D. P. et al. Loss of the mismatch repair protein MSH6 in human glioblastomas is associated with tumor progression during temozolomide treatment. Clin. Cancer Res. 13, 2038–2045 (2007).</li>
            <li>McFaline-Figueroa, J. L. et al. Minor Changes in Expression of the Mismatch Repair Protein MSH2 Exert a Major Impact on Glioblastoma Response to Temozolomide. Cancer Res. 75, 3127–3138 (2015).</li>
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
import SynergyByDosePlots from './2024_04_cps/SynergyByDosePlots.vue';
import TemoSynergyByDosePlots from './2024_04_cps/Temo_SynergyByDosePlots.vue';
import Ml210SynergyByDosePlots from './2024_04_cps/Ml210_SynergyByDosePlots.vue';
import ImageCard from '@/components/ImageCard.vue'

export default {
  name: 'CpsWhitePaper',
  components: {
    PageContent,
    PaperHeader,
    PaperSection,
    PaperSubSection,
    SynergyByDosePlots,
    TemoSynergyByDosePlots,
    Ml210SynergyByDosePlots,
    ImageCard
},
  props: {

  },
  data: () => ({
    loading: true,
    temo_benzyl_data: null,
    ml210_ferro_data: null,
    azd_a133_data: null
  }),
  computed: {
    imgPath () {
          return import.meta.env.PROD ? import.meta.env.BASE_URL + "/graphics/2024_04_cps/" : "../../graphics/2024_04_cps/";
        }
  },

 async created() {
 await this.loadData()

  },
  mounted(){

  },
  methods: {
    async loadData(){

     this.loading = true;
      Promise.all([
            d3.csv(`${dataPath}2024_04_cps/temo_benzyl_data.csv`, function(d){
            return {
                ccle_name: d["ccle_name"],
                culture: d["culture"],
                pert1_name: d["pert1"],
                pert2_name: d["pert2"],
                pert1_dose: d["dose1"],
                pert2_dose: d["dose2"], 
                pert1_viability: +d["capped_library"],
                pert2_viability: +d["capped_anchor"],
                combination_viability: +d["capped_combination"],
                synergy: +d["S"],
                synergy_count: +d["synergy_count_across_doses"],
                EXP_MGMT: +d["EXP_MGMT"],
                EXP_MSH6: +d["EXP_MSH6"],
                RPPA_MSH2_MSH2: +d["RPPA_MSH2_MSH2"],
                RPPA_MSH6_Caution_MSH6: +d["RPPA_MSH6_Caution_MSH6"]

            }
          }),
          d3.csv(`${dataPath}2024_04_cps/ml210_ferro_data.csv`, function(d){
            return {
              ccle_name: d["ccle_name"],
                culture: d["culture"],
                pert1_name: d["pert1"],
                pert2_name: d["pert2"],
                pert1_dose: d["dose1"],
                pert2_dose: d["dose2"], 
                pert1_viability: +d["capped_library"],
                pert2_viability: +d["capped_anchor"],
                combination_viability: +d["capped_combination"],
                synergy: +d["S"],
                antagonism_count: +d["antagonism_count_across_doses"],
                XPR_GPX4: +d["XPR_GPX4"]

            }
          }),
          d3.csv(`${dataPath}2024_04_cps/azd_a133_data.csv`, function(d){
            return {
              ccle_name: d["ccle_name"],
              culture: d["culture"],
              pert1_name: d["pert1"],
              pert2_name: d["pert2"],
              pert1_dose: d["dose1"],
              pert2_dose: d["dose2"], 
              pert1_viability: +d["library.fitted"],
              pert2_viability: +d["anchor.fitted"],
              combination_viability: +d["combination.fitted"],
              synergy: +d["S"],
              xpr_mcl1: +d["XPR_MCL1"],
              xpr_bclxl: +d["XPR_BCLXL"],
              xpr_bcl2: +d["XPR_BCL2"],
              xpr_bclw: +d["XPR_BCLW"]

            }
          })
        ]).then(response=>{
          this.temo_benzyl_data = response[0];
          this.ml210_ferro_data = response[1];
          this.azd_a133_data = response[2];
          this.loading = false;
        //  return {temo_benzyl: temo_benzyl_data, ml210_ferro: ml210_ferro_data, azd_a133: azd_a133_data};
        })
      },
      // parseScatterplotData(temo_benzyl_data, ml210_ferro_data, azd_a133_data){

      //   let temo_benzyl_scatter = temo_benzyl_data.map(d=>{
      //       return {
      //         x: d.synergy,
      //         y: d.ge_mgmt,
      //         c: d.synergy_count,
      //         id: `${d.ccle_name}-${d.culture}`,
      //         r: 3,
      //         _info: d
      //       }
      //     })


      //     let ml210_ferro_scatter = ml210_ferro_data.map(d=>{
      //       return {
      //         x: d.synergy,
      //         y: d.xpr_gpx4,
      //         c: d.antagony_count,
      //         id: `${d.ccle_name}-${d.culture}`,
      //         r: 3,
      //         _info: d
      //       }
      //     })

      //     let azd_a133_scatter = azd_a133_data.map(d=>{
      //       return {
      //         x: d.pert1_viability,
      //         y: d.pert2_viability,
      //         c: d.combination_viability,
      //         id: `${d.ccle_name}-${d.culture}`,
      //         r: 3,
      //         _info: d
      //       }
      //     })

      //   return {
      //     temo_benzyl: temo_benzyl_scatter,
      //     ml210_ferro: ml210_ferro_scatter,
      //     azd_a133: azd_a133_scatter
      //   }

      // }



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
  color:black !important;
  font-weight:600 !important;
}
.combination_design-img{
    width: 100%;
  }
.full-width{
  width: 100%;
}

.rotate{
  -moz-transform: translateX(-50%) translateY(-50%) rotate(-90deg);
  -webkit-transform: translateX(-50%) translateY(-50%) rotate(-90deg);
  transform:  translateX(-50%) translateY(-50%) rotate(-90deg);
}
.tick > text{
  font-size: 9px !important;
  fill: #000;
}
.axis-title{
  font-size:11.5px !important;
  font-weight:500 !important;
  color:#454545;
  fill: #454545;
}
.plot-title{
  font-size:11.5px !important;
  font-weight:700 !important;

  /* text-overflow: clip; */
  white-space: nowrap;
}
.x-axis-title{
  position: absolute;
  bottom:0px;
  left:45%;
}
.y-axis-title{
  position: absolute;
  bottom:50%;
  left:-10px;
  line-height:0px;
  -moz-transform: translateX(-50%) translateY(-50%) rotate(-90deg);
  -webkit-transform: translateX(-50%) translateY(-50%) rotate(-90deg);
  transform:  translateX(-50%) translateY(-50%) rotate(-90deg);
}

@media screen and (min-width: 200px) and (max-width: 768px) {
  .combination_design-img{
    width: 100%;
  }

}

</style>
