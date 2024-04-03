<template>
  <div v-if="loading==false">
   <LatticeGrid></LatticeGrid>
  </div>
</template>
<script>

import LatticeGrid from '@/components/LatticeGrid.vue';

export default {
  name: 'LatticeDemo',
  components: {
    LatticeGrid
  },
  props: {

  },
  data: () => ({
    loading: false,

  }),
  computed: {

  },
  watch: {

  }
}
</script>

<style>
  #lattice-id{
    width:1000;
    height:1000;
  }
</style>
