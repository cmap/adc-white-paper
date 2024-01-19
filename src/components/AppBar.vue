<template>
    <v-app-bar color="white" light>
        <router-link to="/" tag="span" style="cursor: pointer; border-bottom: none;">
        <img id="prism_logo_secondary" alt="PRISM Logo" width="130" src="../../public/images/logo-primary.svg"/>
      </router-link>


    </v-app-bar>
  </template>
  <script>
  // import Vue from 'vue';
  export default {
    name: "AppBar",
  data(){
    return {
    }
  },
    methods: {

    },
    computed: {

    }
  };
  </script>
  
  <style scoped>
  .v-app-bar{
    border-bottom:2px solid #4699FF !important;
    box-shadow: 0.5px 0.5px 15px 0px rgba(220, 220, 220, 0.5) !important;
    z-index:1000;
    padding-right: 16px !important;
    padding-left: 16px !important;
    
  }
  img {
    vertical-align: middle;
}

  
  </style>
  