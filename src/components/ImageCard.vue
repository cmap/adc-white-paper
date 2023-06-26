<template>
    <v-card elevation="0">
          <v-card-title> {{ title }}</v-card-title>
          <v-card-text v-text="description"></v-card-text>
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
  word-break:normal;
}
.v-card-title{
  font-size:1.4em;
  font-weight:900;
  color:#868686;
  word-break:normal;
}
.v-card-text{
  font-size:1.2em;
  font-weight:300;
  color:#868686;
  word-break:normal;
}




</style>