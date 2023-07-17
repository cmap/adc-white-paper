<template>
    <v-card elevation="0">
          <div class="card-title"> {{ title }}</div>
          <div class="card-p">{{  description }}</div>
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

.card-title{
  font-size:1.2em;
  line-height:1.1em;
  font-weight:900;
  color:#868686;
  margin:0px;
}
.card-p{
  font-size:1.2em;
  line-height:1.1em;
  font-weight:300;
  color:#868686;
  margin:0px;
}





</style>