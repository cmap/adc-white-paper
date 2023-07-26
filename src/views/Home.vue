<template>
  <v-container>
    <PaperSection>
      <PaperHeader title="PRISM high throughput screening of antibody-drug conjugates uncovers clinically relevant targets" sup-title="White Paper" date="07/27/2023" authors="Jillian N. Eskra, Ellen Nguyen, Aydin Golabi, Shiker Nair, Antonella Masciotti, Nashielli Diaz, Anthony Fazio, Lia Petronio, Mustafa Kocak, Melissa Ronan, Matthew G. Rees, Jennifer A. Roth"/>
    </PaperSection>

    <PaperSection title="Introduction">
      <p class="text-body-1">
        Antibody-drug conjugates (ADCs) are a rapidly growing class of cancer therapeutics, with approximately two dozen ADCs approved or in late-stage clinical trials through 2022<sup>1,2</sup>. ADCs combine the targeting specificity of monoclonal antibodies with the cytotoxicity of small molecules to provide highly targeted delivery of drug payloads; the ideal ADC would recognize a cancer-cell specific antigen but spare healthy tissue from indiscriminate chemotherapeutic damage<sup>3,4</sup>. Although ADCs have achieved significant success in the clinic, ADC development continues to be a challenging endeavor that is time consuming, expensive, and has a high failure rate<sup>5,6</sup>.
        <br><br>
        Much of the difficulty in ADC development arises from their multifaceted structural properties and diverse pharmacological activity<sup>7</sup>. They exhibit characteristics of both biologics and small molecule therapeutics, can exert activity through multiple mechanisms, and some are capable of killing not only target cells but also neighboring cancer cells that may not express the targeted antigen, a phenomenon known as the bystander effect. Due to this inherent complexity, cell-based functional screening plays a crucial role in the initial screening, characterization, and optimization of ADCs. However, such in vitro studies are often performed on a small number of cell lines and thus provide limited information on therapeutic potential, resulting in missed opportunities as an ADC progresses through the development pipeline<sup>8</sup>. There is a need for in vitro screening tools that can provide more comprehensive insights into ADC mechanisms, effectiveness, and potential limitations, informing decision-making in early stages of development and reducing the risk of later-stage failures.
        <br><br>
        To help facilitate the characterization of ADCs, we developed a screening assay that enables high throughput profiling of the viability effects of ADCs in hundreds of cell lines simultaneously.
      </p>

      <PaperSubSection title="The PRISM assay">
        <v-row>
          <v-col
            cols="12"
            xs="7"
            sm="3"
            md="3"
          >
            <ImageCard title="900+ cancer cell lines" description="pooled+barcoded" img="../../graphics/01_PRISM_assay.png"/>
          </v-col>
          <v-col
            cols="12"
            xs="7"
            sm="3"
            md="3"
          >
            <ImageCard title="Antibody-drug conjugate" description="test agents" img="../../graphics/02_PRISM_assay.png"/>
          </v-col>
          <v-col
            cols="12"
            xs="7"
            sm="3"
            md="3"
          >
            <ImageCard title="5-day viability assay" description="plated+treated" img="../../graphics/03_PRISM_assay.png"/>

          </v-col>
          <v-col
            cols="12"
            xs="7"
            sm="3"
            md="3"
          >
          <ImageCard title="Target validation + discovery" description="comprehensive data" img="../../graphics/04_PRISM_assay.png"/>
          </v-col>

        </v-row>
        <p class="text-body-1">
          Our multiplexed cell viability platform, PRISM (profiling relative inhibition simultaneously in mixtures), enables screening of potential cancer therapeutics at an unprecedented scale<sup>9,10</sup>. We routinely assess the effects of perturbations against hundreds of cancer cell lines concurrently using unique oligonucleotide barcodes stably transduced into individual lines. Following barcode transduction, individual cell lines are pooled together in groups of 20-25 based on growth rate similarity, then thawed into 384-well assay-ready plates and treated with test articles of interest. After 5 days of incubation, isolated mRNA is used to quantify transcribed barcode abundance of each individual cancer cell line to calculate relative viability. We leverage the baseline cellular features (e.g., gene expression, cell lineage, mutation, copy number, metabolomics, proteomics, genome-wide RNAi and CRISPR dependencies) of each cell line to interpret viability profiles, enabling identification of drivers of differential sensitivity and potential biomarkers of response. Visit our <a href="https://www.theprismlab.org/knowledge-base/#prism-assay" target="_blank">knowledge base</a> to learn more about the PRISM assay.
          <!-- <br><br>
          The full collection of PRISM cell lines contains over 900 barcoded cell lines representing more than 45 lineages. The collection is divided into two cell sets: (1) PR500 cell set of 488 solid tumor adherent cell lines, and (2) PR300+ cell set of 431 hematopoietic, solid tumor, and pediatric cell lines. Within each cell set, cell lines are pooled in groups of 20-25 based on their growth rates. See a full annotated list of our PRISM barcoded cell lines <a href="https://docs.google.com/spreadsheets/d/1PcxxZ0O6U20megXtVs6BL10Jr-qnIZPbKk_MXKwz_BI/edit#gid=802313244" target="_blank">here</a>. -->
        </p>
        <p class="text-body-1">
          The full collection of PRISM cell lines contains over 900 barcoded cell lines representing more than 45 lineages. The collection is divided into two cell sets:
        </p>
        <v-list>
          <v-list-item>
              <v-list-item-title>PR500 cell set</v-list-item-title>
              <v-list-item-subtitle>
                488 solid tumor adherent cell lines
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>PR300+ cell set</v-list-item-title>
              <v-list-item-subtitle>
                431 hematopoietic, solid tumor, and pediatric cell lines
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>

        <p class="text-body-1"> Within each cell set, cell lines are pooled in groups of 20-25 based on their growth rates. See a full annotated list of our PRISM barcoded cell lines <a href="https://docs.google.com/spreadsheets/d/1PcxxZ0O6U20megXtVs6BL10Jr-qnIZPbKk_MXKwz_BI/edit#gid=802313244" target="_blank">here</a>.
        </p>
      </PaperSubSection>

      <PaperSubSection title="Antibody-Drug Conjugates">
        <p class="text-body-1">
          ADCs are a class of therapeutics which exploit the properties of monoclonal antibodies to achieve targeted delivery of drug payloads to specific cell populations. Over the past decade, ADCs have seen expansive growth and success in the oncology field, and growing momentum for applications beyond oncology indications<sup>11</sup>.
          <br><br>

          ADCs are a structurally and biologically complex therapeutic modality<sup>12</sup>. They are composed of three main components: an antibody, a linker, and a payload, each of which can have unique characteristics and activity profiles that affect functional performance and stability of the ADC<sup>13</sup>. For example, whether an ADC is conjugated using a cleavable or non-cleavable linker will affect its stability and target-specific activity. Likewise, ADC efficacy is intrinsically related to the characteristics and mechanism of action of the cytotoxic payload. Following intracellular processing, membrane-permeable payloads can diffuse into neighboring cells and induce antigen-independent cytotoxicity, an activity of ADCs known as the bystander effect. Another factor impacting ADC efficacy is the number of cytotoxic molecules linked to each antibody, referred to as the drug to antibody ratio (DAR). 
        </p>
        <v-row class="py-6">
            <v-col cols="12" xs="12" sm="4" md="4" lg="3">
              <v-card elevation="1">
                <v-img src="../../public/graphics/05_adc_components.png"></v-img>
              </v-card>
            </v-col>
            <v-col cols="12" xs="12" sm="8" md="8" lg="8">
              <v-list>
                <v-list-item>
                  <v-list-item-title>Antibody</v-list-item-title>
                  <v-list-item-subtitle>
                    Targets a highly expressed antigen on the surface of cancer cells, acts as a targeted delivery system for cytotoxic agents.
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Linker</v-list-item-title>
                  <v-list-item-subtitle>
                    Can be cleavable or non-cleavable, determines ADC stability in circulation and the mechanism of payload release after an ADC is internalized by antigen-expressing target cells.
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Payload</v-list-item-title>
                  <v-list-item-subtitle>
                    A highly potent compound that drives the primary biological activity of the ADC. Current approved payloads fall into three classes: microtubule inhibitors, DNA-damaging agents, or topoisomerase inhibitors.
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
          </v-col>
        </v-row>
        <p  class="text-body-1">
          The primary mechanism of ADC-induced cytotoxicity occurs via their internalization into target antigen-expressing cancer cells. Upon reaching and binding the target antigen, ADCs are taken up by the cell through receptor-mediated endocytosis<sup>14</sup>. Drug payloads are subsequently released following lysosomal degradation into the cytosol, where they then induce death of the target cell via a pathway specific to the mechanism of action of the payload. In addition to target-specific cell killing, some ADC payloads can exert a bystander effect. If the free drug payload is cell permeable, it can kill not only antigen-expressing cells but also neighboring antigen-negative cells.
        </p>
        <v-row class="py-6">
          <v-col cols="12" sm="10" md="6">
            <v-card elevation="1">
              <v-img class="center-image" src="../../public/graphics/06_adc_killing_mechanism.png"></v-img>
            </v-card>
          </v-col>
        </v-row>
      </PaperSubSection>

      <PaperSubSection title="HER2 as a cancer target">
        <p  class="text-body-1">
          Human epidermal growth factor 2 (HER2) is a member of the EGFR family of receptor tyrosine kinases encoded by the ERBB2 gene and is a well-established therapeutic cancer target<sup>15</sup>. HER2 alterations, including overexpression, amplifications, and other mutations, have been detected in a wide range of solid tumors<sup>16</sup>. Targeting HER2 with small molecules, monoclonal antibodies, or antibody-drug conjugates has proven to be an effective strategy for treating HER2-positive cancer. To date, four HER2-targeting antibody-based therapeutics have received FDA approval (trastuzumab, pertuzumab, trastuzumab emtansine and trastuzumab deruxtecan) and several others are in late stages of clinical development<sup>17</sup>.
        </p>
      </PaperSubSection>

      <PaperSubSection title="Screening HER2-targeting ADCs in PRISM">
        <p  class="text-body-1">
          To validate suitability of the PRISM assay for ADC screening, we elected to focus on HER2 because it is a well-established ADC target and has a wide expression range across PRISM cell lines. We utilized two HER2-targeting ADCs: trastuzumab emtansine (T-DM1) and trastuzumab-monomethyl auristatin E (T-MMAE). T-DM1 and T-MMAE were both conjugated containing trastuzumab, a humanized anti-HER2 monoclonal antibody, but had unique linkers and payloads. Comparative profiling of these agents provides an opportunity to study ADCs that target the same antigen but differ in the bystander killing capabilities of their released payloads. Catabolism of T-MMAE releases a cell-permeable payload capable of inducing bystander activity, whereas the payload of T-DM1 is impermeable and therefore not cytotoxic to bystander cells. 
        </p>


            <v-list>
                <v-list-item>
                  <v-list-item-title>Trastuzumab</v-list-item-title>
                  <v-list-item-subtitle>
                    A therapeutic monoclonal antibody with clinical indications for HER2 overexpressing solid tumors. It is sold under the brand name Herceptin.
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Trastuzumab emtansine (T-DM1)</v-list-item-title>
                  <v-list-item-subtitle>
                    an ADC consisting of trastuzumab conjugated via a non-cleavable linker (MCC; maleimidomethyl cyclohexane-1-carboxylate) to mertansine (also called DM1), a cytotoxic microtubule inhibitor, with a DAR of 3.518. After T-DM1 is internalized into cells, the released payload (emtansine) is unable to cross the membrane of surrounding HER2-negative cells and is therefore not associated with a bystander killing effect. T-DM1 is FDA approved for the treatment of HER2-overexpressing breast cancer. It is sold under the brand name Kadcyla.
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Trastuzumab-monomethyl auristatin E (T-MMAE)</v-list-item-title>
                  <v-list-item-subtitle>
                    An ADC consisting of trastuzumab conjugated with a cleavable MC—VC—PAB (maleimidocaproyl— valine-citrulline— para-amino benzyl alcohol) linker to monomethyl auristatin E (MMAE), a microtubule inhibitor, at a DAR of 4. T-MMAE was specifically designed to release MMAE, a cell-permeable payload that therefore can exert bystander killing activity.
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>


        <!-- <v-row class="py-6">
            <v-col cols="12">
              <v-card color="#f5f5f5" elevation="0">
              <ul class="no-bullets">
                <li><b>Trastuzumab</b>: a therapeutic monoclonal antibody with clinical indications for HER2 overexpressing solid tumors. It is sold under the brand name Herceptin.</li>
                <v-divider></v-divider>
                <li><b>Trastuzumab emtansine (T-DM1)</b>: an ADC consisting of trastuzumab conjugated via a non-cleavable linker (MCC; maleimidomethyl cyclohexane-1-carboxylate) to mertansine (also called DM1), a cytotoxic microtubule inhibitor, with a DAR of 3.518. After T-DM1 is internalized into cells, the released payload (emtansine) is unable to cross the membrane of surrounding HER2-negative cells and is therefore not associated with a bystander killing effect. T-DM1 is FDA approved for the treatment of HER2-overexpressing breast cancer. It is sold under the brand name Kadcyla.</li>
                <v-divider></v-divider>
                <li><b>Trastuzumab-monomethyl auristatin E (T-MMAE)</b>: an ADC consisting of trastuzumab conjugated with a cleavable MC—VC—PAB (maleimidocaproyl— valine-citrulline— para-amino benzyl alcohol) linker to monomethyl auristatin E (MMAE), a microtubule inhibitor, at a DAR of 4. T-MMAE was specifically designed to release MMAE, a cell-permeable payload that therefore can exert bystander killing activity. </li>
              </ul>
            </v-card> 
          </v-col>
        </v-row>
          -->

       
        <p  class="text-body-1">ADCs were screened in triplicate at 8 dose points in the PR500 PRISM cell set of adherent cancer cell lines. Vehicle treatment alone and unconjugated trastuzumab antibody were included as controls. After 5 days of treatment, cells were lysed and the barcodes were amplified and detected using the PRISM Luminex workflow. Viability results were normalized to vehicle control, dose response curves were fit, and area under curve (AUC) values were computed for each curve.
        </p>
      </PaperSubSection>
  </PaperSection>

  <PaperSection title="Results">
    <PaperSubSection title="ADCs exhibit target specific cytotoxicity in PRISM">
      <p  class="text-body-1">
        The correlation between HER2 expression level and antitumor efficacy of trastuzumab ADCs has been well established19; therefore, we explored whether the selectivity of T-MMAE and T-DM1 was associated with ERBB2 (HER2) gene expression. We found a clear association between the cell line sensitivity profile and ERBB2 overexpression for both T-DM1 and T-MMAE. The strongest effects on viability were observed in a subset of cell lines that overexpress ERBB2. Importantly, the correlation of ERBB2 expression with treatment sensitivity was retained for T-MMAE, despite its ability to exert bystander killing effects, which could potentially confound target identification. As expected, trastuzumab alone was relatively inert across all PRISM cell lines. These results indicate that PRISM pooled cell line screening is capable of maintaining selectivity of the primary target for ADCs with different payload characteristics.
      </p>
      <AucExpressionPlots></AucExpressionPlots>
    </PaperSubSection>
    <PaperSubSection title="PRISM screening identifies relevant ADC biomarkers">
      <p  class="text-body-1">PRISM biomarker analysis enables identification of genomic features and genetic dependencies (gene expression, copy number, proteomics, CRISPR knockdown, shRNA knockdown, etc.) associated with sensitivity. These analyses can identify predictive markers for treatment response or inform potential hypotheses for mechanisms of action. We explored T-DM1 and T-MMAE biomarker results to evaluate whether PRISM screening recovers expected markers of sensitivity to ADCs.      
      </p>
      <BiomarkerGePlots></BiomarkerGePlots>
      <p  class="text-body-1">
        Univariate biomarker analysis identified ERBB2 gene expression and copy number as significantly correlated with sensitivity to both T-DM1 and T-MMAE. Additionally, when comparing PRISM profiles with shRNA dependency data, ERBB2 emerged as one of the top correlated dependencies for both T-DM1 and T-MMAE. These results demonstrate that PRISM screening is capable of identifying relevant targets of ADCs with permeable and non-permeable payloads in an unbiased fashion.
      </p>
      <BiomarkerShrnaPlots></BiomarkerShrnaPlots>
    </PaperSubSection>
    <PaperSubSection title="Validation of ADC bystander activity">
      <p  class="text-body-1">
        Next, we further explored bystander activities of T-DM1 and T-MMAE. Overall, we did not observe robust HER2-independent cytotoxicity by either T-DM1 or T-MMAE. These results are consistent with expected activity for T-DM1; however, T-MMAE releases a cell permeable payload that can kill neighboring cells. To account for our observations, we speculated that the relative abundance of HER2-positive target cells in PRISM pools could be too low to induce a substantial bystander killing effect. We evaluated the quantity and distribution of target cell lines based on ERBB2 gene expression status and identified ten HER2-positive cell lines in the PR500 cell set. Looking across PRISM pools, the number of HER2-positive cell lines ranges from 1-3 cell lines per pool, each of which consist of 20-25 total cell lines. 
      </p>
      <ExpressionAcrossPoolsPlots></ExpressionAcrossPoolsPlots>
      <p  class="text-body-1">
        Next, we developed a co-culture assay system consisting of fluorescently labeled HER2-positive NCIN87 cells and HER2-negative HCC1806 cells to confirm bystander killing capabilities of T-DM1 and T-MMAE. Co-cultures of GFP-NCIN87 cells and RFP-HCC1806 cells were seeded at 4 different ratios (1:1, 1:2, 1:5, and 1:20). In addition, each cell line was plated and treated individually. Cells were exposed to T-MMAE and T-DM1 at the same concentrations and treatment conditions as performed in the PRISM screen. Cell counts of each line were quantified by fluorescent imaging.

        Treatment of each cell line individually confirmed target-specific killing of T-DM1 and T-MMAE. Results showed some dose-related nonspecific cytotoxicity at the highest concentrations for both ADCs, but at lower doses both T-DM1 and T-MMAE were able to kill NCIN87 cells without affecting HCC1806 cells. In the co-culture system, both T-DM1 and T-MMAE efficiently killed the target NCIN87 cells.
        <br><br>
        Cytotoxicity of T-DM1 on HCC1806 was limited to the highest concentrations, consistent with the nonspecific high dose cytotoxicity observed in monoculture format. However, at low doses, HCC1806 cells were unaffected by T-DM1 and there was no shift in sensitivity across different ratios of NCIN87 cells, validating a lack of bystander killing activity by T-DM1.
      </p>
      <CoCulturePlots></CoCulturePlots>
      <p  class="text-body-1">
        Collectively, these results confirm that T-MMAE has bystander killing activity, the extent of which in vitro is dependent on the presence of a sufficient number of HER2-positive cells. Taking this into consideration, given the relatively low number of HER2-positive cell lines in the PRISM set, the minimal off-target cell killing by T-MMAE is not unexpected.
      </p>
    </PaperSubSection>
  </PaperSection>

  <PaperSection title="Key considerations for ADC screening in PRISM">
    <p  class="text-body-1">
      Due to their inherent complexity, multiple aspects of ADCs will affect their activity in vitro. Based on the characteristics of a particular ADC, we anticipate unique challenges may arise on a case-by-case basis. However, there are some universal considerations relevant to high throughput cell line screening using the PRISM technology. Below we highlight several guidelines for designing an ADC screening study using PRISM.
    </p>
    <PaperSubSection title="Target expression">
      <p  class="text-body-1">
        Because of the pooled format of the PRISM platform, special consideration should be given to target antigen expression across the PRISM cell set. The distribution of target antigen-expressing cells within and across cell pools is particularly relevant for ADCs with bystander activity. Prior to submitting ADCs for screening in PRISM, we recommend investigators review the <a href="https://docs.google.com/spreadsheets/d/1PcxxZ0O6U20megXtVs6BL10Jr-qnIZPbKk_MXKwz_BI/edit#gid=802313244" target="_blank">PRISM cell line inventory and pooling information</a> and cross reference the  <a href="https://depmap.org/portal/interactive/" target="_blank">DepMap Data Explorer</a> for relevant genetic features to estimate the number of target and non-target cell lines across PRISM pools. In addition, we strongly suggest using this information to carry out preliminary experiments to gain an understanding of potential ADC bystander activity. A recommended strategy is to perform a co-culture assay using an antigen-positive and an antigen-negative cell line plated together at ratios that simulate those of PRISM pools.
      </p>
    </PaperSubSection>
    <PaperSubSection title="ADC structure and stability">
      <p  class="text-body-1">
        In order to accurately interpret results from high throughput pooled cell line screens it is necessary to understand the structural composition of an ADC, its stability, heterogeneity, and the relevant analytes that can drive activity in vitro. As a best practice we advise carrying out analytical and functional studies prior to submitting an ADC for high throughput screening. Bioanalytical characterization should include measuring the amount of intact ADC, free payload and free antibody of the stock solution, as well as after exposure of the ADC to conditions that mimic the screening assay conditions. In addition, cell-based pilot experiments to evaluate ADC activity, as well as activity of the relevant components (i.e., free antibody, free payload, linker/payload) using antigen-positive and -negative cell lines are recommended. Results of these experiments can inform on stability, as well as on- and off-target mechanisms of ADC activity, to guide interpretation of PRISM results.
      </p>
    </PaperSubSection>
    <PaperSubSection title="Experimental controls">
      <p  class="text-body-1">
        Depending on the experimental goals of a particular ADC screening effort, additional controls are advised. A non-targeting control ADC constructed with an antibody that does not bind cell membrane antigens (e.g., recognizing a viral antigen) is a recommended negative control. Likewise, an ADC conjugated to a widely expressed cell membrane antigen (e.g., CD71) can serve as a positive control. In addition, it may be beneficial to screen each component of a test ADC (free antibody and free payload) individually in parallel with the ADC. These data will help distinguish between activity attributable to the ADC and the unconjugated components. 
      </p>
    </PaperSubSection>
  </PaperSection>

    <PaperSection title="Conclusions">
      <p  class="text-body-1">With the rapidly evolving landscape of ADCs, there is a growing need for better in vitro models to support ADC development platforms. PRISM combines an extensive and diverse cell line collection with comprehensive multi-omic datasets to create highly informative profiles of therapeutic agents. Our high-throughput, multiplexed approach has facilitated the rapid screening of thousands of oncology drug candidates to uncover novel mechanisms of action, identify unexpected off-target effects and toxicities, and validate potential patient populations. Here, we demonstrated how the PRISM technology can be leveraged for high-throughput ADC screening across hundreds of cell lines simultaneously. Our results highlight how PRISM can be utilized to analyze ADC activity and uncover clinically relevant targets.
      <br><br>
      Numerous factors can influence ADC efficacy including antibody specificity, target antigen expression, linker stability, payload release kinetics, payload potency and efflux susceptibility. As a consequence of their structural and biological complexity, studying the behavior of ADCs in vitro can be difficult. Successful ADC screening requires careful design of experiments, thoughtful selection of appropriate controls, and an understanding of ADC structural elements and their properties. Despite these challenges, cell-based functional screening is an essential preclinical step that serves various purposes in the development and characterization of these therapeutic agents. Such studies provide valuable insights into ADC behavior, mechanism of action, potency, and selectivity, and help guide subsequent in vivo investigations.
      </p>
      <PaperSubSection>
        <h3>
          Explore and interact with the data on the <a href="https://prism.clue.io/portal/projects/MRSN001/ADC_WHITEPAPER/compounds" target="_blank">PRISM Data Portal &rarr;
          </a>
        </h3>
    </PaperSubSection>
  </PaperSection>

 
</v-container>

<div class="backgroundGradient">
  <v-container>
    <PaperSection title="Interested in collaborating with us?">
    <v-btn target="_blank" href="https://www.theprismlab.org/contact-us/" size="x-large" color="primary">Contact us <v-icon class="pl-4">mdi-open-in-new</v-icon></v-btn>
  </PaperSection>
  </v-container>
</div>

<v-container>
  <PaperSection title="Citations">
    <v-card elevation="0" class="py-0">
      <ol>
        <li>Fu, Z., Li, S., Han, S., Shi, C. & Zhang, Y. Antibody drug conjugate: the ‘biological missile’ for targeted cancer therapy. Signal Transduct Target Ther 7, 93 (2022).
        </li>
        <li>Zinn, S. et al. Advances in antibody-based therapy in oncology. Nat Cancer 4, 165–180 (2023).
        </li>
        <li>Carter, P. J. & Rajpal, A. Designing antibodies as therapeutics. Cell 185, 2789–2805 (2022).
        </li>
        <li>Drago, J. Z., Modi, S. & Chandarlapaty, S. Unlocking the potential of antibody-drug conjugates for cancer therapy. Nat. Rev. Clin. Oncol. 18, 327–344 (2021).
        </li>
        <li>Joubert, N., Beck, A., Dumontet, C. & Denevault-Sabourin, C. Antibody-Drug Conjugates: The Last Decade. Pharmaceuticals  13, (2020).
        </li>
        <li>Nessler, I., Menezes, B. & Thurber, G. M. Key metrics to expanding the pipeline of successful antibody-drug conjugates. Trends Pharmacol. Sci. 42, 803–812 (2021).
        </li>
        <li>Colombo, R. & Rich, J. R. The therapeutic window of antibody drug conjugates: A dogma in need of revision. Cancer Cell 40, 1255–1263 (2022).
        </li>
        <li>Hinrichs, M. J. M. & Dixit, R. Antibody Drug Conjugates: Nonclinical Safety Considerations. AAPS J. 17, 1055–1064 (2015).
        </li>
        <li>Yu, C. et al. High-throughput identification of genotype-specific cancer vulnerabilities in mixtures of barcoded tumor cell lines. Nat. Biotechnol. 34, 419–423 (2016).</li>
        <li>Corsello, S. M. et al. Discovering the anti-cancer potential of non-oncology drugs by systematic viability profiling. Nat Cancer 1, 235–248 (2020).
        </li>
        <li>McPherson, M. J. & Hobson, A. D. Pushing the Envelope: Advancement of ADCs Outside of Oncology. Methods Mol. Biol. 2078, 23–36 (2020).
        </li>
        <li>Theocharopoulos, C., Lialios, P.-P., Samarkos, M., Gogas, H. & Ziogas, D. C. Antibody-Drug Conjugates: Functional Principles and Applications in Oncology and Beyond. Vaccines (Basel) 9, (2021).
        </li>
        <li>Drake, P. M. & Rabuka, D. Recent Developments in ADC Technology: Preclinical Studies Signal Future Clinical Trends. BioDrugs 31, 521–531 (2017).
        </li>
        <li>Chalouni, C. & Doll, S. Fate of Antibody-Drug Conjugates in Cancer Cells. J. Exp. Clin. Cancer Res. 37, 20 (2018).</li>
        <li>Yarden, Y. & Sliwkowski, M. X. Untangling the ErbB signalling network. Nat. Rev. Mol. Cell Biol. 2, 127–137 (2001).
        </li>
        <li>Oh, D.-Y. & Bang, Y.-J. HER2-targeted therapies - a role beyond breast cancer. Nat. Rev. Clin. Oncol. 17, 33–48 (2020).
        </li>
        <li>Dumontet, C., Reichert, J. M., Senter, P. D., Lambert, J. M. & Beck, A. Antibody-drug conjugates come of age in oncology. Nat. Rev. Drug Discov. (2023) doi:10.1038/s41573-023-00709-2.
        </li>
        <li>	Burris, H. A., 3rd, Tibbitts, J., Holden, S. N., Sliwkowski, M. X. & Lewis Phillips, G. D. Trastuzumab emtansine (T-DM1): a novel agent for targeting HER2+ breast cancer. Clin. Breast Cancer 11, 275–282 (2011).
        </li>
        <li>Rassy, E., Rached, L. & Pistilli, B. Antibody drug conjugates targeting HER2: Clinical development in metastatic breast cancer. Breast 66, 217–226 (2022).
        </li>
      </ol>
    </v-card>
  </PaperSection>
  </v-container>
</template>

<script>
  import PaperHeader from '@/components/PaperHeader.vue'
  import PaperSection from '@/components/PaperSection.vue'
  import PaperSubSection from '@/components/PaperSubSection.vue'
  import ImageCard from '@/components/ImageCard.vue'
  import AucExpressionPlots from '@/components/AucExpressionPlots.vue'
  import BiomarkerShrnaPlots from '@/components/BiomarkerShrnaPlots.vue'
  import BiomarkerGePlots from '@/components/BiomarkerGePlots.vue'
  import ExpressionAcrossPoolsPlots from '@/components/ExpressionAcrossPoolsPlots.vue'
  import CoCulturePlots from '@/components/CoCulturePlots.vue'
  import * as d3 from "d3";
  // import * as Vis from '../js/Vis.js';




  export default {
        name: 'Home',
        components: {PaperHeader, PaperSection, PaperSubSection, ImageCard, AucExpressionPlots, BiomarkerGePlots,
          BiomarkerShrnaPlots, ExpressionAcrossPoolsPlots, CoCulturePlots},
        data () {
          return {

          }
        },
        mounted(){

        },
        methods: {


        }
      }
</script>
<style scoped>



@media (max-width: 600px){


}

@media (min-width: 600) {


}

</style>

