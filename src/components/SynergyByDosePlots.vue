<template>
    <div>
    <ColorMatrix :c1="colors.topLeft" :c2="colors.topRight" :c3="colors.bottomLeft" :c4="colors.bottomRight" :num=5 ></ColorMatrix>
    </div>
  </template>
  
  <script>
  import * as d3 from 'd3';
  import * as api from '@/js/utils/api.js';
  import {axiosGET, handleAxiosError} from '@/js/utils/api.js';
import ColorMatrix from './ColorMatrix.vue';


  let api_url = "https://dev-api.clue.io/api/";
  let email = "clue_demo@clue.io"
  let password = "clue_anonymous"



  export default {
    name: 'SynergyByDosePlots',
    components: {
    ColorMatrix
},
    props: {
      pert_id: String,
      pert_plate: String,
      project: String,
      screen: String
    },
    data: () => ({
      loading: false,
      colors: {
        topLeft: "rgb(0,0,0)", 
        topRight: "rgb(255,0,0)", 
        bottomLeft: "rgb(255,255,0)", 
        bottomRight: "rgb(0,255,0)"
      }
    }),
    computed: {
    },
    async created() {
      const self = this;
      const apikey = await api.login(self.$API_URL, self.$ANONYMOUS_EMAIL?.toLowerCase(), self.$ANONYMOUS_PWD);
        if (!apikey) {
          throw "No API Key";
        }
        self.$USER_KEY = apikey;
      await this.getData();
    },
    methods: {
      async getData() {
        const self = this;
        self.params = {
          pert_id: self.pert_id,
          pert_plate: self.pert_plate,
          project: self.project,
          screen: self.screen
        }
        
        try {
          const responses = await axiosGET([`${api_url}prism-portal/synergy_table?filter=${JSON.stringify(self.params)}`],  `${self.$USER_KEY}`);
        } catch (error) {
        //  handleAxiosError(error, self.$route.fullPath);
        } finally {
          self.loading = false;
        }
      }
    }
  }
  </script>
  
  <style scoped>
  
  .legend-wrapper{
    width:500px;
    height:500px;
    border: 1px solid black;
    margin:100px;
    position: relative;
  }
  
  </style>
  