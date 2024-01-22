<template>
  <div v-if="loading==false">
    <page-content> 
      <PaperHeader 
      title="title" 
      badge="white paper"
      date="date" 
      authors="author list"/>
      <PaperSection title="Section Title">
        <p>Text content.....</p>
        <PaperSubSection title="Sub-section Tile">
        </PaperSubSection>
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
