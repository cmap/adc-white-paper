<template>
    <v-card elevation="0">
      <div :style="{'min-height': `${titleHeight}`, 'text-align': `${align} !important`, 'max-width': `${cardWidth}px`}">
        <div class="card-title"> {{ title }}</div>
        <div class="card-description">{{  description }}</div>
      </div>
        <v-img :style="`max-width: ${cardWidth}px`" class="card-image" :src="img"></v-img>
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
   },
   maxWidth: {
   type: String,
   required: false
   },
    alignText: {
     type: String,
      required: false
    },
    minHeight: {
      type: String,
      required: false
    }
},
computed: {
  cardWidth(){
    return this.maxWidth ? this.maxWidth : 400;
  },
  align(){
    let align =  this.alignText ? this.alignText : 'left';
    return this.alignText ? this.alignText : 'left';
  },
  titleHeight(){
    return this.minHeight ? this.minHeight : 'auto';
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