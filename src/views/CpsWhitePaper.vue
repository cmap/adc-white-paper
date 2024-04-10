<template>
  <div v-if="!loading">
    <page-content>
      <PaperHeader
      title="Multiplexed cancer cell line combination screening using PRISM"
      badge="White paper"
      date="04/05/2024"
      authors="Matthew G. Rees, Ashish Bino George, Mustafa Kocak, Shiker Nair, Lia Petronio, Ellen Nguyen, Alvin Kalathungal, Anthony Fazio, Cole Ponsi, Aydin Golabi, Melissa M. Ronan, Jennifer A. Roth"/>
      <PaperSection title="Introduction">

        <p>
          Combination therapies are routinely used in cancer care, and patient cure is almost never achieved by monotherapy<sup>1</sup>. However, which combinations will benefit specific cancer patients is largely unknown. While many studies have used cell culture and animal model systems to characterize combination effects, the sheer number of clinical, investigational, and tool anticancer agents, coupled with the diversity and heterogeneity of cancer, precludes comprehensive investigation<sup>2–5</sup>. Accordingly, most such studies are restricted to a small number of drugs or a restricted set of cancer contexts. Methods to address these limitations, such as those that enable measurement of candidate combinations in many cell lines simultaneously, would greatly increase the potential scale of combinations research, generating preclinical evidence that may help identify candidate combinations for clinical trials.
        </p>

          <v-row>
            <v-col cols="6" xs="6" sm="4" md="3" lg="3" xl="3">
              <ImageCard min-height="2em" title="900 cancer cell lines pooled and barcoded" :img="imgPath + 'PRISM-Combination-Assay_cell lines.svg'"/>
            </v-col>
            <v-col cols="6" xs="6" sm="4" md="3" lg="3" xl="3">
              <ImageCard min-height="2em" title="Treatment with single-agent and combination"  :img="imgPath + 'PRISM-Combination-Assay_treatment.svg'"/>
            </v-col>
            <v-col cols="6" xs="6" sm="4" md="3" lg="3" xl="3">
              <ImageCard min-height="2em" title="Viability profile across doses" :img="imgPath + 'PRISM-Combination-Assay_sensitivity.svg'"/>
            </v-col>
            <v-col cols="6" xs="6" sm="4" md="3" lg="3" xl="3">
              <ImageCard min-height="2em" title="Biomarker analysis and combination discovery" :img="imgPath + 'PRISM-Combination-Assay_discover.svg'"/>
            </v-col>
          </v-row>
          <div class="figure caption"><b>Fig.1. Schematic of the PRISM assay</b></div>

      </PaperSection>

      <PaperSection title="Analysis of combination data">
        <p>
          Experimental combinations are generally benchmarked by comparing the effects of two (or more) agents to the corresponding single-agent activities, using established metrics to describe the combined effects (e.g., independent action, additivity, synergy, antagonism)<sup>6</sup>. For example, the Bliss model assesses proportional cell killing, where under the null hypothesis (no interaction between two or more perturbations) viability effects are multiplicative<sup>7</sup>. The quantification and classification of combination effects may aid prioritization of combinations for additional investigation while also providing biological and mechanistic insights. For example, antagonistic combinations might be deprioritized from further study, while synergistic combinations may be useful in overcoming resistance<sup>8</sup>. Independent (or additive) combinations may be useful to combat inter- or intra-patient heterogeneity; this behavior is characteristic of many effective clinical combinations (and most curative combinations) described to date<sup>9, 10</sup>.
        </p>

          <v-row>
            <v-col cols="7" xs="6" sm="4" md="3" lg="3" xl="3">
                <ImageCard align-text="center" title="Independent Action" :img="imgPath + 'combo_effects-1.svg'"/>
            </v-col>
            <v-col cols="7" xs="6" sm="4" md="3" lg="3" xl="3">
              <ImageCard align-text="center" title="Antagonistic" :img="imgPath + 'combo_effects-2.svg'"/>
            </v-col>
            <v-col cols="7" xs="6" sm="4" md="3" lg="3" xl="3">
              <ImageCard align-text="center" title="Synergistic" :img="imgPath + 'combo_effects-3.svg'"/>
            </v-col>
          </v-row>
          <div class="figure caption"><b>Fig.2. Classifications of combination effects</b></div>

      </PaperSection>
      <PaperSection title="Considerations for dose selection">
        <p>
          The ideal dose range for the single-agent components in combination screening would span at least one concentration with no effect on cell line viability but evidence for cellular activity (e.g., target engagement) across all models to be tested, and one dose where the maximal effects attributable to on-mechanism activity are observed. To facilitate determining this dose range for test combinations, we routinely assess single agents over a range of concentrations in up to 900 cell lines using PRISM. An alternative approach would test single-agent concentration ranges in a number of individual cell lines, and/or, if available, leverage published cell biology or screening data (e.g., at depmap.org).
          <br><br>
          For combination components with minimal differential viability effects, testing a single dose may represent the most efficient combinatorial design. By contrast, strong differential viability effects of one combination partner across cell lines supports the use of multiple doses; this approach also facilitates aggregation of the viability readout across doses (e.g., through fitting of dose-response curves). Where it is not possible to span the entire range of response to a given compound, it is recommended to focus on the lower end of the ideal concentration range (i.e., less cell viability effects) to facilitate identification of increased cell killing (e.g., additivity or synergy)–unless the experimental goal is to identify and characterize antagonistic combinations (e.g., drug rescue screens).
        </p>

          <v-row>
            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-img class="px-6" :src="imgPath + 'PRISM-Dose-Selection-1.svg'"></v-img>
            </v-col>
            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-img class="px-6" :src="imgPath + 'PRISM-Dose-Selection-2.svg'"></v-img>
            </v-col>
          </v-row>
          <div class="figure caption"><b>Fig.3. Dosing schemes of combinations based on single agent viability results</b></div>
      </PaperSection>
      <PaperSection title="Results">
        <PaperSubSection title="Selection of test combinations">
            <p>
              To test the suitability of PRISM for pooled cell line combination screening, we selected three test combinations: temozolomide+O6-benzylguanine, A-1331852+AZD5991, and ML210+ferrostatin-1. Single-agent responses across PRISM cell lines are shown in figure 4, and we choose the combination screening format based on this data.
            </p>
            <v-list>
                <v-list-item>
                  <v-list-item-subtitle>
                    <b>temozolomide+O6-benzylguanine. </b>MGMT (O-6-methylguanine-DNA methyltransferase) is an experimentally- and clinically-validated biomarker of resistance to temozolomide: MGMT reverses the action of temozolomide as the MGMT protein directly repairs temozolomide-induced alkylation<sup>11</sup>. As a single agent, we observe that resistance to temozolomide is strongly associated with MGMT expression across the large panel of cell lines in PRISM (r = 0.63, q = 1.2 x 10<sup>-86</sup>, rank =1; <a href="https://theprismlab.org/portal/CPS009/CPS_WHITEPAPER/PCPS019/BRD-K32107296/correlation-analysis" target="_blank">PRISM Portal</a>). Inhibition of MGMT by agents such as O6-benzylguanine has been reported to enhance temozolomide activity in a subset of MGMT-expressing cell lines in vitro<sup>8</sup>. O6-benzylguanine does not have appreciable viability effects in PRISM at concentrations sufficient to inhibit MGMT and enhance temozolomide sensitivity<sup>8</sup>.

                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-subtitle>
                    <b>AZD5991+A-1331852.</b> Combined genetic or chemical inhibition of the apoptotic regulators MCL1 and BCL2L1 has been reported as strongly synergistic<sup>12,13</sup>.  AZD5991 is a selective MCL1 inhibitor; in PRISM, we observe that AZD5991 phenocopies MCL1 CRISPR dependency (r = 0.3, q = 5.3 x 10<sup>-11</sup>, rank =1; <a href="https://theprismlab.org/portal/CPS009/CPS_WHITEPAPER/PCPS019/BRD-K00005264/correlation-analysis" target="_blank">PRISM Portal</a>). In addition, we observe that resistance to AZD5991 is strongly associated with BCL2L1 expression (r = 0.27, q = 5.8 x 10<sup>-11</sup>, rank =1; <a href="https://theprismlab.org/portal/CPS009/CPS_WHITEPAPER/PCPS019/BRD-K00005264/correlation-analysis" target="_blank">PRISM Portal</a>). A-1331852 is a selective BCL2L1 (BCL-xL) inhibitor; in PRISM, we observe that A-1331852 phenocopies BCL2L1 CRISPR dependency (r = 0.47, q = 1.1 x 10<sup>-31</sup>, rank =1; <a href="https://theprismlab.org/portal/CPS009/CPS_WHITEPAPER/PCPS019/BRD-K50731585/correlation-analysis" target="_blank">PRISM Portal</a>) and resistance to A-1338152 is associated with MCL1 expression (<a href="https://theprismlab.org/portal/CPS009/CPS_WHITEPAPER/PCPS019/BRD-K50731585/correlation-analysis" target="_blank">PRISM Portal</a>) .

                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-subtitle>
                   <b> ML210+ferrostatin-1.</b> ML210 inhibits GPX4 (glutathione peroxidase 4) and kills cells via ferroptosis through generation of reactive lipid peroxide species; in PRISM, we observe that ML210 phenocopies GPX4 CRISPR dependency (r = 0.44, q = 1.2 x 10<sup>-27</sup>, rank =1; <a href="https://theprismlab.org/portal/CPS009/CPS_WHITEPAPER/PCPS019/BRD-K01877528/correlation-analysis" target="_blank">PRISM Portal</a>). Ferrostatin-1 is a radical-trapping antioxidant that protects cells from reactive species and therefore rescues cells from ferroptosis<sup>14,15</sup>. As ferrostatin-1 has been reported to have minimal viability effects across cell lines, we tested ferrostatin-1 at a single dose of 10µM, a concentration sufficient to fully inhibit ferroptosis; this concentration does not show appreciable viability effects in PRISM<sup>8,14,16</sup>.

                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>

        </PaperSubSection>
        <PaperSubSection title="Pooled combination screening results">
          <p>Because O6-benzylguanine and ferrostatin-1 demonstrated minimal effects on viability as single agents across a large panel of cell lines, we screened a single dose (5 µM and 10 µM, respectively) in combination with 7 concentrations of temozolomide (top concentration: 100µM; threefold dilution) and ML210 (top concentration: 10µM; threefold dilution), respectively. As both A-1331852 and AZD5991 had dose-dependent effects on cell viability, we screened a 5x5 matrix (threefold dilution) of these compounds (top concentrations: 0.041 and 0.37µM, respectively). Combinations and all component single agents at matching concentrations were plated using an HP D300e drug printer and screened in nearly 900 cancer cell lines using standard PRISM conditions and data processing [<a href="https://github.com/cmap/dockerized_mts" target="_blank">link</a>]. </p>
          <PaperSubSection>



            <v-row>
              <v-col xs="12" sm="12" md="4" lg="4">
                <v-list>
                  <v-list-item>
                    <v-list-item-title><b>Temozolomide + O6-Benzylguanine</b></v-list-item-title>
                    <v-list-item-subtitle>
                      <br>
                      <b>Temozolomide</b><br>7 concentrations <br>top concentration: 100µM; threefold dilution<br><br>
                      <b>O6-Benzylguanine</b><br>1 concentration: 5 µM<br><br>
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
                <Temo06_ViabilityHeatmaps rootName="temo-O6-viability-heatmap-plot"> </Temo06_ViabilityHeatmaps>
              </v-col>

              <v-col xs="12" sm="12" md="4" lg="4">
                <v-list>
                  <v-list-item>
                    <v-list-item-title><b>ML210 + Ferrostatin-1</b></v-list-item-title>
                    <v-list-item-subtitle>
                      <br>
                      <b>ML210</b><br>7 concentrations <br>top concentration: 10µM; threefold dilution<br><br>
                      <b>Ferrostatin-1</b><br>1 concentration:  10 µM <br><br>
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
                <ML210_Ferr_ViabilityHeatmaps rootName="ml210-ferr-viability-heatmap-plot"> </ML210_Ferr_ViabilityHeatmaps>
              </v-col>

              <v-col xs="12" sm="12" md="4" lg="4">
                <v-list>
                  <v-list-item>
                    <v-list-item-title><b>AZD5991 + A-1331852</b></v-list-item-title>
                    <v-list-item-subtitle>
                      <br>
                      <b>AZD5991</b><br>5 concentrations <br>top concentration: 0.037µM; threefold dilution<br><br>
                      <b>A-1331852</b><br>5 concentrations <br>top concentration: 0.041µM; threefold dilution
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
                <Adz_A13_ViabilityHeatmaps rootName="adz-a13-viability-heatmap-plot"> </Adz_A13_ViabilityHeatmaps>
              </v-col>
            </v-row>
            <div class="figure caption"><b>Fig.4. Combinations tested and their dosing schemes.</b> The dosing schemes of the three combinations tested were determined based on the described procedure. Thus, temozolomide + O6 Benzylguanine and ML210 + Ferrostatin were screened in the 7x1 format since one of the single agents was largely inert. Since both AZD5991 and A-1331852 demonstrated significant viability effects, we employed the 5x5 format for the AZD5991 + A-1331852 combination. A cell line was classified as “killed” if its viability (relative to vehicle control) was &lt; 0.3.</div>

            <p>
              We calculated a synergy score for combination effects at each dose combination using both the Highest Single Agent (HSA) and Bliss models to generate a null expectation for the viability at the combination dose (see figure 2 Eqs. 1,2). In the HSA model, the expected viability of the combination is the minimum of the two single agent viabilities. In the Bliss model,  viability effects are multiplicative (i.e., log-viability effects are additive)一based on the assumption of independent action of the two single agents. The synergy score is computed as the difference between the model expectation and the observed viability <sup>1</sup> — a positive value indicates synergy while a negative value indicates antagonism. For  robustness, we combine both model expectations into a single synergy score (Eq. 3),  which effectively considers the lower viability of the two model expectations when looking for synergy and the higher viability of the two model expectations when looking for antagonism<sup>2</sup>. Significance (q values) for synergy scores were calculated using an empirical null model of synergy scores generated using negative control data from the experiment that accounts for cell-line specific variability (see Appendix).
            </p>
            <v-row>
              <v-col cols="12" sm="12" md="6" lg="5" xl="5">

                <img style="width:100%" :src="imgPath + 'equation-1.svg'">
                <div class="figure caption"><b>Eq.1</b></div>
                <br><br>

                <img style="width:100%" :src="imgPath + 'equation-2.svg'">
                <div class="figure caption"><b>Eq.2</b></div>
                <br><br>

                <img style="width:100%" :src="imgPath + 'equation-3.svg'">
                <div class="figure caption"><b>Eq.3</b></div>
              </v-col>
            </v-row>
            <div class="figure caption">
              <ul class="no-bullets">
                <li><sup>1</sup> Note that the synergy score is measured in terms of viability rather than in terms of log2fold-change (LFC) as  used on the PRISM portal (<a href="https://theprismlab.org/portal/CPS009/CPS_WHITEPAPER/PCPS019/BRD-K32107296_BRD-K92041145/synergy-by-dose" target="_blank">PRISM Portal</a>). This is done to better align with literature.</li>
                <li><sup>2</sup> We cap viabilities at 1 before calculating null model expectations for synergy computation. For viabilities capped at 1, the Bliss expectation is always &lt;= HSA.</li>
              </ul>
            </div>

          </PaperSubSection>
          <PaperSubSection>
            <p>
              In the presence of O6-benzylguanine, cell lines that expressed MGMT were sensitized to temozolomide (i.e., synergy was observed) (figure 5). Intriguingly, while MGMT expression appeared necessary for sensitization to temozolomide, a subset of cell lines remained resistant to temozolomide even in the presence of O6-benzylguanine. Accordingly, we asked whether any baseline genomic features were associated with the calculated temozolomide+O6-benzylguanine synergy score in MGMT-expressing cell lines (MGMT expression > 1.5, see figure 8). We found that low expression of the MSH6 gene (and low protein levels of MSH6, or its heterodimeric partner protein MSH2) were associated with lack of synergy in MGMT-proficient cell lines. MSH2 and MSH6 are genes involved in DNA mismatch repair, and their loss has been previously suggested to be associated with resistance to temozolomide<sup>17, 18</sup>.
            </p>
            <TemoSynergyByDosePlots rootName="temo_benzyl_synergy_plots"></TemoSynergyByDosePlots>
            <div class="figure caption"><b>Fig.5. Synergy in temozolomide + O6-Benzylguanine combination.</b> Many cell lines with high MGMT expression levels were sensitized to temozolomide by the addition of O6-Benzylguanine, and thus exhibited strong synergy.  Each point, representing a cell line, is colored by the number of times the synergy score of the cell line was > 0 (with a q-value &lt; 0.1). Histograms of the synergy score at each dose and MGMT expression are also shown. Due to the bimodal nature of MGMT expression in the set of cell lines, we set a threshold of 1.5 (dashed line) to differentiate high MGMT expressing lines from low MGMT expressing lines. Statistical significance was evaluated by computing empirical p-values of the corresponding one-sided test followed by multiple hypothesis correction (see Appendix).</div>
          </PaperSubSection>

          <PaperSubSection>
            <p>
            As the dose of ML210 increased, we observed that ferrostatin-1 consistently antagonized the effects of ML210 across cell lines (figure 6). For example, the median viability across cell lines at 10µM ML210 was 58.0%, compared with 92.9% at 10µM ML210 + ferrostatin-1, resulting in a median synergy score of S = -0.30.
            </p>
            <Ml210SynergyByDosePlots rootName="ml210_ferro_synergy_plots"></Ml210SynergyByDosePlots>
            <div class="figure caption"><b>Fig.6. Antagonism in ML210 + Ferrostatin combination.</b> Many cell lines exhibited strong antagonism at higher dose values of ML210.  Each point, representing a cell line, is colored by the number of times the synergy score of the cell line was &lt; 0 (with a q-value &lt; 0.1). Histograms of the synergy score at each dose and the CRISPR Chronos dependency score of GPX4 are also shown. Note that, unlike MGMT expression, there is no apparent bimodality in the CRISPR score.  Statistical significance was evaluated by computing empirical p-values of the corresponding one-sided test followed by multiple hypothesis correction (see Appendix).</div>


          </PaperSubSection>
          <PaperSubSection>
            <h4>AZD5991 + A-1331852</h4>
            <p>
              Across doses and across cell lines, we observed that BCL-xL and MCL1 inhibition were synergistic: for example, the median synergy score at the highest tested doses (0.37µM AZD5991 + 0.041µM A-1331852) was S = 0.28 (figure 7).
            </p>
            <Azd_SynergyByDosePlots rootName="azd_a133_synergy_plots"></Azd_SynergyByDosePlots>

            <div class="figure caption"><b>Fig.7. Observed synergy in AZD5991 + A-1331852 combination.</b> Many cell lines exhibited strong synergy at higher doses of the combination.  Each point, representing a cell line, is colored by the number of times the synergy score of the cell line was significantly different from 0 (q-value &lt; 0.1). Statistical significance was evaluated by computing empirical p-values from a two-sided test followed by multiple hypothesis correction (see Appendix). The p-values were computed from an empirical null model of synergy values that accounted for cell-line specific variability—reflected in the range of q-values at a given synergy value. The gap at synergy=0 reflects the large number of cases where synergy is zero by our definition.</div>

          </PaperSubSection>
        </PaperSubSection>
      </PaperSection>
      <PaperSection title="Conclusion">
        <p>
          Combination screening is a challenging scientific, analytical, and logistical endeavor. As studies to date have suggested combination partner interactions are difficult to predict and highly context specific, a robust platform for high-throughput screening of combinations could provide substantial value to the scientific community. Multiplexing cell lines using PRISM enables data generation at an unprecedented scale: here, we demonstrate that PRISM can clearly identify synergistic and antagonistic combinations, as well as biomarkers relevant to combination interactions (e.g., MGMT expression in the context of temozolomide + O6-benzylguanine). Analysis of combination data using metrics such as log2(fold-change) (LFC) and area under the dose response curve (AUC) (<a href="https://theprismlab.org/portal/projects/CPS009/CPS_WHITEPAPER/compounds">PRISM Portal</a>) can be supplemented with analysis of combination-specific metrics like synergy (figure 8) to aim to identify biomarkers associated with combination treatment after accounting for the effects of the single agents. Such approaches can reveal biomarkers that uniquely underlie sensitivity or resistance to the combination (e.g., MSH6 for MGMT-expressing cell lines).
        </p>
        <TemoSynergyBiomarkerPlots rootName="temo_benzyl_synergy_biomarker-plots"></TemoSynergyBiomarkerPlots>
          <div class="figure caption"><b>Fig.8. Biomarkers associated with synergy in temozolomide + O6-Benzylguanine are related to DNA mismatch repair.</b> The correlation between the synergy score and multi-omic data can be used to investigate potential mechanisms underlying combination-specific effects. Here, we looked at the subset of high MGMT expressing cell lines (MGMT expression >1.5) to examine biomarkers that may determine whether a high MGMT expressing cell line exhibits synergy on O6-benzylguanine co-treatment. We found genes involved in DNA mismatch repair (MSH6 and MSH2) appeared as significant biomarkers in the proteomics and expression datasets. Such analyses can be used to generate hypotheses regarding the mechanisms underlying sensitivity to drug combinations.</div>

        <p>
          Dose selection is one of the most important considerations for combination screening, ensuring combination effects can be reliably and efficiently measured across the largest number of cell lines. Differential single-agent activity across cell lines can be measured or estimated in a number of ways: by first running compounds as single agents at dose in PRISM, by leveraging existing public data (e.g., at depmap.org), or by measuring response in a panel of individual cell lines.
          <br><br>
          Currently, combination screening is offered through PRISM using a standardized 7x1 design (<a href="https://www.theprismlab.org/knowledge-base/#drug-combination-screening" target="_blank">link</a>). 7x1 combinations are useful where one component (the “anchor” agent) has limited differential viability effects, facilitating identification of a single concentration informative for screening. Where both agents have strong differential viability effects, contact us to discuss alternative screening designs; we recommend a matrixed format such as 5x5.
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
            <li>Rees, M. G. et al. Correlating chemical sensitivity and basal gene expression reveals mechanism of action. Nat. Chem. Biol. 12, 109–116 (2016).</li>
            <li>Cahill, D. P. et al. Loss of the mismatch repair protein MSH6 in human glioblastomas is associated with tumor progression during temozolomide treatment. Clin. Cancer Res. 13, 2038–2045 (2007).</li>
            <li>McFaline-Figueroa, J. L. et al. Minor Changes in Expression of the Mismatch Repair Protein MSH2 Exert a Major Impact on Glioblastoma Response to Temozolomide. Cancer Res. 75, 3127–3138 (2015).</li>
          <li>Corsello, S. M. et al. Discovering the anticancer potential of non-oncology drugs by systematic viability profiling. Nature Cancer 1, 235–248 (2020).</li>
          <li>Ghandi, M. et al. Next-generation characterization of the Cancer Cell Line Encyclopedia. Nature 569, 503–508 (2019).</li>
          </ol>
        </v-card>
      </PaperSection>
      <PaperSection title="Appendix">
        <p>For each cell line, we generate median viability values (replicates) for a mock treatment condition using the median viability from 3 randomly selected vehicle-control (DMSO) replicates. This process is repeated to generate 10,000 viability values each for mock single agent and combination treatments. From these viabilities, we generate an empirical null distribution of synergy scores which we use to compute empirical p-values (with Laplace smoothing to avoid zeros). These p-values are used to compute a q-value that corrects for multiple hypothesis testing using the Benjamini-Hochberg procedure. Importantly, each cell line has a separate null distribution to account for cell-line specific variability.
        <br><br>
        There exist a few cell lines which are cultured in two separate pools (one in each cell set: PR500 and PR300) and pass QC in both pools. For these cell lines, we use data from PR500 for analysis in this whitepaper. The PRISM portal provides data on these cell lines in both pools.
        <br><br>
        For all analyses in the whitepaper, such as computing the synergy score and associated biomarkers, we capped the measured viability at 1.
        <br><br>
        For biomarker analysis, we used cell line characterizations from the DepMap Portal (depmap.org). In particular, we used files from 23Q2 release (https://doi.org/10.6084/m9.figshare.22765112.v2) along with PRISM Repurposing<sup>19</sup> and legacy CCLE<sup>20</sup> data.
        </p>
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

import TemoSynergyByDosePlots from './2024_04_cps/Temo_SynergyByDosePlots.vue';
import Ml210SynergyByDosePlots from './2024_04_cps/Ml210_SynergyByDosePlots.vue';
import Azd_SynergyByDosePlots from './2024_04_cps/Azd_SynergyByDosePlots.vue';
import Adz_A13_ViabilityHeatmaps from './2024_04_cps/Adz_A13_ViabilityHeatmaps.vue';
import Temo06_ViabilityHeatmaps from './2024_04_cps/Temo06_ViabilityHeatmaps.vue';
import ML210_Ferr_ViabilityHeatmaps from './2024_04_cps/ML210_Ferr_ViabilityHeatmaps.vue';
import TemoSynergyBiomarkerPlots from './2024_04_cps/Temo_SynergyBiomarkerPlots.vue';
import ImageCard from '@/components/ImageCard.vue'

export default {
  name: 'CpsWhitePaper',
  components: {
    PageContent,
    PaperHeader,
    PaperSection,
    PaperSubSection,
    TemoSynergyByDosePlots,
    Ml210SynergyByDosePlots,
    Azd_SynergyByDosePlots,
    Adz_A13_ViabilityHeatmaps,
    Temo06_ViabilityHeatmaps,
    ML210_Ferr_ViabilityHeatmaps,
    TemoSynergyBiomarkerPlots,
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
 this.loading = false;
  },
  mounted(){

  },
  methods: {

  },
  watch: {

  }
}
</script>
<style scoped>

.figure.caption{
    color: rgba(0, 0, 0, 0.87);
    opacity:0.6;
    padding: 0;
    font-size: 0.875rem;
    font-weight: 400 !important;
    letter-spacing: 0.0178571429em;
    line-height: 1.4em;
}
.v-list-item{
  padding-top:8px;
  padding-bottom:8px;
}


@media screen and (min-width: 200px) and (max-width: 768px) {


}

</style>

<style>
.cps-legend{
  width:100%;
  height:80px !important;
  margin:auto;
}


.single-agent-heatmap > * > * > .y.axis > .tick > line{
    opacity: 0;
  }


</style>
