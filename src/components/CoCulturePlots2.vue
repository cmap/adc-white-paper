<template>

      <div>
        <svg  class="co-culture-plot plot" id="co-culture-plot-0"></svg>
        <svg  class="co-culture-plot plot" id="co-culture-plot-1"></svg>
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
                d3.csv(`${dataPath}co-culture results_T-DM1.csv`, function(d){
                    return {
                      viability: +d["Viability"],
                      cells: d["Cells"],
                      pert_dose: +d["pert_dose"],
                      pert_dose_units: d["pert_dose_units"],
                      sample: d["sample"],
                      ratio: d["ratio"],
                      culture_type: d["culture_type"]
                    }
                }),
                d3.csv(`${dataPath}co-culture results_T-MMAE.csv`, function(d){
                    return {
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

                 Vis.launch(data)
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
  width:30%;
  display:inline-block;
  overflow: visible;
}



@media (max-width: 600px){
  .plot{
    width:98%;
  }

}

@media (min-width: 600) {


}

</style>

