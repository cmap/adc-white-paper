<template>

      <div>
        <div class="plot">
          <svg  class="co-culture-plot" id="co-culture-plot-tdm1-0"></svg>
          <svg  class="legend" id="co-culture-plot-tdm1-0-legend"></svg>
        </div>
       <div class="plot">
        <svg  class="co-culture-plot" id="co-culture-plot-tdm1-1"></svg>
        <svg  class="legend" id="co-culture-plot-tdm1-1-legend"></svg>
       </div>

      </div>
      <p>In contrast, we observed pronounced cytotoxicity by T-MMAE in HCC1806 that was both dependent on T-MMAE dose and the amount of NCIN87 cells present. Notably, at a ratio of 1:20, which is approximately similar to the expected abundance of HER2-positive and HER2-negative cells in PRISM pools, T-MMAE did not induce bystander killing of HCC1806 cells.</p>
      <div>
        <div class="plot">
          <svg  class="co-culture-plot" id="co-culture-plot-tmmae-0"></svg>
          <svg  class="legend" id="co-culture-plot-tmmae-0-legend"></svg>
        </div>
       <div class="plot">
        <svg  class="co-culture-plot" id="co-culture-plot-tmmae-1"></svg>
        <svg  class="legend" id="co-culture-plot-tmmae-1-legend"></svg>
       </div>

      </div>
</template>

<script>

  import * as d3 from "d3";
  import * as Vis from '../js/CoCulturePlots.js';


  const dataPath = "../../data/";
  export default {
        name: 'BiomarkerGePlots',
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
                d3.csv(`${dataPath}co-culture results_normalized_T-DM1.csv`, function(d){
                    return {
                      compound: "T-DM1",
                      viability: +d["Viability"],
                      cells: d["Cells"],
                      pert_dose: +d["pert_dose"],
                      pert_dose_units: d["pert_dose_units"],
                      sample: d["sample"],
                      ratio: d["ratio"],
                      culture_type: d["culture_type"]
                    }
                }),
                d3.csv(`${dataPath}co-culture results_normalized_T-MMAE.csv`, function(d){
                    return {
                      compound: "T-MMAE",
                      viability: +d["Viability"],
                      cells: d["Cells"],
                      pert_dose: +d["pert_dose"],
                      pert_dose_units: d["pert_dose_units"],
                      sample: d["sample"],
                      ratio: d["ratio"],
                      culture_type: d["culture_type"]
                    }
                }),
              ]).then(response=>{

                let data = {
                  [`T-DM1`]: response[0],
                  [`T-MMAE`]: response[1]
                }
                // this.items = [...new Set(response[0].concat(response[1]).map(d=>d.feature))].sort()

                 Vis.launch(response[0], "co-culture-plot-tdm1")
                 Vis.launch(response[1], "co-culture-plot-tmmae")
                // Vis.highlight(this.selected)
            })
          }
        },
        watch: {
        //   selected(){
        //     Vis.highlight(this.selected)
        //   }
        }
      }
</script>
<style scoped>

.plot{
  width:40%;
  display:inline-block;
  overflow: visible;
}
.co-culture-plot{
  width:100%;
}
.legend{
  width:100%;
  height:75px;
}


@media (max-width: 600px){
  .plot{
    width:98%;
  }

}

@media (min-width: 600) {


}

</style>

