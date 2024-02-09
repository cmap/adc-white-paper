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
        <v-row>
          <v-col>
            <h4>ML210+ferrostatin-1</h4>
            <ViabilityMatrixPlots 
              rootName="test"
            >
            </ViabilityMatrixPlots>
          </v-col>
          </v-row>
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
            :dict="Mgmt_Ge_Dict"
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
              :dict="Mgmt_Ge_Dict"
            >
            </SynergyByDosePlots>
          </v-col>
          </v-row>
          <v-row>
          <v-col cols="8">
            <h4>A-1331852+AZD5991</h4>
            <SynergyByDosePlots 
                pert_id="BRD-K00005264_BRD-K50731585"
                pert_plate="PCPS020"
                project="CPS010_VALIDATION_COMPOUNDS_INTERNAL"
                screen="CPS010"
                rootName="BRD-K00005264_BRD-K50731585"
                :dict="Mgmt_Ge_Dict"
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
const dataPath = import.meta.env.PROD ? import.meta.env.BASE_URL+"/data/" : "../../data/";
import * as d3 from 'd3';
import PageContent from '@/components/PageContent.vue';
import PaperHeader from '@/components/PaperHeader.vue';
import PaperSection from '@/components/PaperSection.vue';
import PaperSubSection from '@/components/PaperSubSection.vue';
import SynergyByDosePlots from './2024_04_cps/SynergyByDosePlots.vue';
import ViabilityMatrixPlots from './2024_04_cps/ViabilityMatrixPlots.vue';
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
    loading: false,
    Mgmt_Ge_Dict: {},
    ViabilityMeansPerComboDose:{

      "BRD-K00005264_BRD-K50731585": [
        {
          "dose1": 0.1372,
          "dose2": 5.0,
          "mean": 0.7
        },
        {
          "dose1": 0.4115,
          "dose2": 5.0,
          "mean": 0.6
        },
        {
          "dose1": 1.235,
          "dose2": 1,
          "mean": 0.5
        },
        {
          "dose1": 3.704,
          "dose2": 5.0,
          "mean": 0.4
        },
        {
          "dose1": 11.11,
          "dose2": 5.0,
          "mean": 0.3
        },
        {
          "dose1": 33.33,
          "dose2": 5.0,
          "mean": 0.2
        },
        {
          "dose1": 100,
          "dose2": 5.0,
          "mean": 0.1
        }

      ],
      "BRD-K32107296_BRD-K92041145": [
        {
          "dose1": 0.01372,
          "dose2": 10.0,
          "mean": 0.7
        },
        {
          "dose1": 0.04115,
          "dose2": 10.0,
          "mean": 0.6
        },
        {
          "dose1": 0.1235,
          "dose2": 1,
          "mean": 0.5
        },
        {
          "dose1": 0.3704,
          "dose2": 10.0,
          "mean": 0.4
        },
        {
          "dose1": 1.111,
          "dose2": 10.0,
          "mean": 0.3
        },
        {
          "dose1": 3.333,
          "dose2": 10.0,
          "mean": 0.2
        },
        {
          "dose1": 10.0,
          "dose2": 10.0,
          "mean": 0.1
        }

      ],
      "BRD-K01877528_BRD-K97375133": [
        {
          "dose1": 0.004568,
          "dose2": 0.041,
          "mean": 0.7
        },
        {
          "dose1": 0.0137,
          "dose2": 0.041,
          "mean": 0.7
        },
        {
          "dose1": 0.04111,
          "dose2": 0.041,
          "mean": 0.8
        },
        {
          "dose1": 0.1233,
          "dose2": 0.041,
          "mean": 0.9
        },
        {
          "dose1": 0.37,
          "dose2": 0.041,
          "mean": 0.8
        },
        {
          "dose1": 0.004568,
          "dose2": 0.01367,
          "mean": 0.7
        },
        {
          "dose1": 0.0137,
          "dose2": 0.01367,
          "mean": 0.6
        },

        {
          "dose1": 0.04111,
          "dose2": 0.01367,
          "mean": 0.7
        },
        {
          "dose1": 0.1233,
          "dose2": 0.01367,
          "mean": 0.5
        },
        {
          "dose1": 0.37,
          "dose2": 0.01367,
          "mean": 0.7
        },
        {
          "dose1": 0.004568,
          "dose2": 0.004556,
          "mean": 0.7
        },
        {
          "dose1": 0.0137,
          "dose2": 0.004556,
          "mean": 0.5
        },

        {
          "dose1": 0.04111,
          "dose2": 0.004556,
          "mean": 0.6
        },
        {
          "dose1": 0.1233,
          "dose2": 0.004556,
          "mean": 0.8
        },
        {
          "dose1": 0.37,
          "dose2": 0.004556,
          "mean": 0.7
        },
        {
          "dose1": 0.004568,
          "dose2": 0.001519,
          "mean": 0.6
        },
        {
          "dose1": 0.0137,
          "dose2": 0.001519,
          "mean": 0.6
        },

        {
          "dose1": 0.04111,
          "dose2": 0.001519,
          "mean": 0.7
        },
        {
          "dose1": 0.1233,
          "dose2": 0.001519,
          "mean": 0.8
        },
        {
          "dose1": 0.37,
          "dose2": 0.001519,
          "mean": 0.1
        },
        {
          "dose1": 0.004568,
          "dose2": 0.0005062,
          "mean": 0.2
        },
        {
          "dose1": 0.0137,
          "dose2": 0.0005062,
          "mean": 0.3
        },
        {
          "dose1": 0.04111,
          "dose2": 0.0005062,
          "mean": 0.4
        },
        {
          "dose1": 0.1233,
          "dose2": 0.0005062,
          "mean": 0.5
        },
        {
          "dose1": 0.37,
          "dose2": 0.0005062,
          "mean": 0.6
        }

      ],
    }

  }),
  computed: {

  },

 async created() {
  await this.getMGMTGeDict();
  },
  mounted(){

  },
  methods: {
    async getMGMTGeDict(){
    let dict = {};
      Promise.all([
                d3.csv(`${dataPath}2024_04_cps/temo_benzyl_data.csv`, function(d){
                  dict[d["ccle_name"]] = d["GE_MGMT"]
                })
              ]).then(response=>{
                this.Mgmt_Ge_Dict = dict;
            })
    }


  },
  watch: {

  }
}
</script>

<style>

</style>
