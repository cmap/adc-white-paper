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
import PaperHeader from '@/components/PaperHeader.vue'
import PaperSection from '@/components/PaperSection.vue'
import PaperSubSection from '@/components/PaperSubSection.vue'


export default {
  name: 'CpsWhitePaper',
  components: {
    PageContent,
    PaperHeader,
    PaperSection,
    PaperSubSection
    
  },
  props: {

  },
  data: () => ({
    loading: false
  }),
  computed: {

  },
  mounted(){

  },
 async created() {

  },
  methods: {

  },
  watch: {

  }
}
</script>

<style scoped>


</style>
