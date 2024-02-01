<template>
  <div>

    <div v-for="row in matrix" style="margin:0px; padding:0px; height:20px">
      <div v-for="each in row" class="square" :style="{background: each.c}">
    
    </div>
  </div>
</div>
</template>
  
  <script>
  import * as d3 from 'd3';

  export default {
    name: 'ColorMatrix',
    components: {

    },
    props:{

    },
    data: () => ({
      loading: false,
      matrix:null
    }),

     mounted() {

      let x =  d3.schemeReds[5]
        let y = d3.schemeBlues[5]

        let matrix = [];
      for (let i = 0; i < x.length; i++) {
        let rows = []
        for (let j = 0; j < y.length; j++) {
          rows.push({x:i, y:j, c : d3.interpolateRgb(x[i], y[j])(0.5) })
        }
        matrix.push(rows)
      }
      this.matrix = matrix

    },
    methods: {

      }
  }
  </script>
  

  <style>
.square {
  width: 20px;
  height: 20px;
  display: inline-block;
  margin: 0;
  padding: 0;
}
</style>