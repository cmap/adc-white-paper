<template>
    <v-card elevation="0">
        <div class="card-title"> {{ title }}</div>
        <div class="card-description">{{  description }}</div>
        <v-img  class="card-image" :src="img"></v-img>
   </v-card>
</template>
<script>


export default {
name: "HImageCard",
props: {
   title: {
   type: String,
   required: true
   },
   description: {
   type: String,
   required: false
   },
   img: {
   type: String,
   required: false
   }

}
}
</script>

<style scoped>
.v-card{
  padding:0px !important;
}
.card-title{
  font-size:1.2em;
  line-height:1.1em;
  font-weight:900;
  color:#868686;
}
.card-description{
  font-size:1.2em;
  line-height:1.1em;
  font-weight:300;
  color:#868686;
}
@media (max-width: 600px){
  .v-card{
    margin:0px !important;
    padding:0px !important;
  }
  .card-image{
    max-width:90%;
  }

}



</style>