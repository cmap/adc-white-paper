<template>
      <div>
        <svg  class="plot" id="biomarker-shrna-plot-0"></svg>
        <svg  class="plot" id="biomarker-shrna-plot-1"></svg>
      </div>
</template>

<script>

  import * as d3 from "d3";
  import * as Vis from '../js/BiomarkerShrnaPlots.js';


  const dataPath = "../../data/";
  export default {
        name: 'BiomarkerShrnaPlots',
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
                d3.csv(`${dataPath}biomarker_shRNA_T-DM1.csv`, function(d){
                    return {
                      feature: d["feature"],
                      coef: +d["coef"],
                      qval: +d["log10(q.val)"]
                    }
                }),
                d3.csv(`${dataPath}biomarker_shRNA_T-MMAE.csv`, function(d){
                    return {
                      feature: d["feature"],
                      coef: +d["coef"],
                      qval: +d["log10(q.val)"]
                    }
                }),
              ]).then(response=>{

                let data = {
                  TDM1: response[0],
                  TMMAE: response[1]
                }

                Vis.launch(data)
            })
          }
        }
      }
</script>
<style scoped>

.plot{
  width:30%;
  display:inline-block;
  border:1px solid black
}



@media (max-width: 600px){
  .plot{
    width:98%;
    display:inline-block;
  }

}

@media (min-width: 600) {


}

</style>

