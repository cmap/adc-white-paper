<template>
    <v-card elevation="0">
          <h3> {{ title }}</h3>
          <p>{{  description }}</p>
          <v-img width="80%" :src="img"></v-img>

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
  border:none;
  word-break:normal !important;
}

h3{
  font-weight:900;
  color:#868686;
  margin:0px;
}
p{
  color:#868686;
  line-height:1.1em;
  margin:0px;
}




</style>