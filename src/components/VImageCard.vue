<template>
    <v-card
      height="100%"
      width="100%"
    >
      <v-img
        :src='img'
      ></v-img>
  
      <v-card-title>
        {{ title }}
      </v-card-title>
  
    </v-card>
  </template>
  
<script>


export default {
    name: "VImageCard",
    props: {
      title: {
        type: String,
        required: true
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
  margin:16px 0px !important;
}
.v-card__title{
    font-size:1.2em;
    line-height:1.2em;
    font-weight:500;
    word-break:normal;
}
.v-sheet.v-card:not(.v-sheet--outlined) {
  color:black;
    /* box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%); */
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 10%), 0px 2px 2px 0px rgb(0 0 0 / 10%), 0px 1px 5px 0px rgb(0 0 0 / 10%);
}

</style>