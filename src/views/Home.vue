<template>
  <v-container class="fill-height">
    <v-responsive class="fill-height">
      <PageTitle/>
      <ImageCard/>
    </v-responsive>
  </v-container>
</template>

<script>
  import PageTitle from '@/components/PageTitle.vue'
  import ImageCard from '@/components/ImageCard.vue'
  import $ from "jquery";
  import * as d3 from "d3";

  export default {
        name: 'HomePage',
        components: {PageTitle, ImageCard},
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
                d3.csv("../../public/data/ERBB2 log2(TPM+1) Expression vs T-DM1 AUC.csv", function(d){
                    return {
                      test: d["DepMap ID"]
                    }
                })
              
              ]).then(response=>{
                console.log("response", response)
              })
          }
        }
      }
</script>
