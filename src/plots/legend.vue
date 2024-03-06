<template>

</template>



<script>

import legend from './legend.js';
import * as d3 from "d3";
import * as helpers from '@/js/utils/helpers.js';
import {Legend} from "@/plots/d3-legend.js";

export default {
  name: 'Legend',
  components: {

  },
  data: function () {
    return {

    }
  },
  props: {
    rootId: String,
    scale: Object,
    click: Array
  },
  computed: {

  },
  mounted(){
    this.launch();
  },
  methods: {
    launch(){
    // Legend({
    //     color: d3.scaleSequential([0, 100], d3.interpolateViridis),
    //     rootId: "my-legend",
    //     title: "Temperature (°F)"
    //     })
    }
  },
  watch:{
  
  }
}
</script>
<style scoped>


</style>
