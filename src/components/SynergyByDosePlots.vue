<template>
    <div>
    

    </div>
  </template>
  
  <script>
  
  import * as api from '@/js/utils/api.js';
  import {axiosGET, handleAxiosError} from '@/js/utils/api.js';

  let api_url = "https://dev-api.clue.io/api/";
  let email = "clue_demo@clue.io"
  let password = "clue_anonymous"

  export default {
    name: 'SynergyByDosePlots',
    components: {

    },
    props: {
      pert_id: String,
      pert_plate: String,
      project: String,
      screen: String
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
          console.log(responses[0].data)
        } catch (error) {
        //  handleAxiosError(error, self.$route.fullPath);
        } finally {
          self.loading = false;
        }
      },
  
  

    }
  }
  </script>
  
  <style scoped>
  
  
  
  </style>
  