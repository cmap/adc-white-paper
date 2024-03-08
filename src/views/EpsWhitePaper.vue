<template>
  <div v-if="!loading">
    <page-content> 
      <PaperHeader 
      title="PRISM Extended Day Assay" 
      badge="White paper"
      date="04/01/2024" 
      authors="... Authors"/>
      <PaperSection title="Introduction">

      <p></p>
      </PaperSection>
      <PaperSection title="The PRISM Assay">
        <PaperSubSection title="5-day Assay workflow">
          <p></p>
        </PaperSubSection>
        <PaperSubSection title="Extended Day Assay workflow">
          <p></p>
        </PaperSubSection>
      </PaperSection>
      <PaperSection title="Results">
        <p></p>
      </PaperSection>
      <PaperSection title="Conclusion">
        <p></p>
      </PaperSection>
      <PaperSection title="References">
        <v-card elevation="0" class="py-0">
          <ol>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
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
import * as d3 from 'd3';
import PageContent from '@/components/PageContent.vue';
import PaperHeader from '@/components/PaperHeader.vue';
import PaperSection from '@/components/PaperSection.vue';
import PaperSubSection from '@/components/PaperSubSection.vue';
import ImageCard from '@/components/ImageCard.vue'

export default {
  name: 'EpsWhitePaper',
  components: {
    PageContent,
    PaperHeader,
    PaperSection,
    PaperSubSection,
    ImageCard
},
  props: {

  },
  data: () => ({
    loading: false,
  }),
  computed: {
    imgPath () {
        return import.meta.env.PROD ? import.meta.env.BASE_URL + "/graphics/2024_04_eps/" : "../../graphics/2024_04_eps/";
    },
    dataPath() {
        return import.meta.env.PROD ? import.meta.env.BASE_URL + "/data/2024_04_eps/" : "../../data/2024_04_eps/";
    }
  },

 async created() {
   // await this.loadData()
  },
  mounted(){

  },
  methods: {
    // async loadData(){

    //  this.loading = true;
    //   Promise.all([
    //     ]).then(response=>{
         
    //     })
    //   }
  },
  watch: {

  }
}
</script>

<style scoped>

</style>
