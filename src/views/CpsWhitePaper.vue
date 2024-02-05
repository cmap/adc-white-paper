<template>
  <div v-if="loading==false">

    <page-content> 
      <PaperHeader 
      title="Multiplexed cancer cell line combination screening using PRISM" 
      badge="White paper"
      date="03/01/2024" 
      authors="... Matthew G. Rees, Jennifer A. Roth"/>
      <PaperSection title="Introduction">
        <p class="text-body-1">Combination therapies are routinely used in cancer care, and patient cure is almost never achieved by monotherapy<sup>1</sup>. However, which combinations will benefit specific cancer patients is largely unknown. While many studies have used cell culture and animal model systems to characterize combination effects, the sheer number of clinical, investigational, and tool anticancer agents, coupled with the diversity and heterogeneity of cancer, precludes comprehensive investigation<sup>2-5</sup>. Accordingly, most such studies are restricted to a small number of drugs or a restricted set of cancer contexts. Methods to address these limitations, such as those that enable measurement of candidate combinations in many cell lines simultaneously, would greatly increase the potential scale of combinations research, generating preclinical evidence that may help identify candidate combinations for clinical trials.
        </p>
      </PaperSection>
      <PaperSection title="Analysis of combination data">
        <p class="text-body-1">Paragraph</p>
      </PaperSection>
      <PaperSection title="Considerations for dose selection">
        <p class="text-body-1">Paragraph</p>
      </PaperSection>
      <PaperSection title="Results">
        <p class="text-body-1">Paragraph</p>
        <PaperSubSection title="Selection of test combinations">
        </PaperSubSection>
        <PaperSubSection title="Pooled combination screening results">
        <v-row>
          <v-col>
            <h4>temozolomide|O6-benzylguanine</h4>
            <SynergyByDosePlots 
            pert_id="BRD-K32107296_BRD-K92041145"
            pert_plate="PCPS020"
            project="CPS010_VALIDATION_COMPOUNDS"
            screen="CPS010"
            rootName="BRD-K32107296_BRD-K92041145"
            >
            </SynergyByDosePlots>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h4>A-1331852+AZD5991</h4>
            <SynergyByDosePlots 
                pert_id="BRD-K00005264_BRD-K50731585"
                pert_plate="PCPS020"
                project="CPS010_VALIDATION_COMPOUNDS_INTERNAL"
                screen="CPS010"
                rootName="BRD-K00005264_BRD-K50731585"
              >
              </SynergyByDosePlots>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h4>ML210+ferrostatin-1</h4>
            <SynergyByDosePlots 
              pert_id="BRD-K01877528_BRD-K97375133"
              pert_plate="PCPS020"
              project="CPS010_VALIDATION_COMPOUNDS_INTERNAL"
              screen="CPS010"
              rootName="BRD-K01877528_BRD-K97375133"
            >
            </SynergyByDosePlots>
          </v-col>
          </v-row>
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

import PageContent from '@/components/PageContent.vue';
import PaperHeader from '@/components/PaperHeader.vue';
import PaperSection from '@/components/PaperSection.vue';
import PaperSubSection from '@/components/PaperSubSection.vue';
import SynergyByDosePlots from './cps_2024/SynergyByDosePlots.vue';
import ViabilityMatrixPlots from './cps_2024/ViabilityMatrixPlots.vue';
import ColorMatrix from '@/components/ColorMatrix.vue';

export default {
  name: 'CpsWhitePaper',
  components: {
    PageContent,
    PaperHeader,
    PaperSection,
    PaperSubSection,
   SynergyByDosePlots,
    ViabilityMatrixPlots
  },
  props: {

  },
  data: () => ({
    loading: false
  }),
  computed: {

  },

 async created() {

  },
  mounted(){

  },
  methods: {



  },
  watch: {

  }
}
</script>

<style>

</style>
