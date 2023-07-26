<template>
  <div>
    <span class="sup-title">{{ supTitle }}</span>  
    <h1>{{  title  }}</h1>    
    <div v-if="date" class="date">{{  date }} </div>  
    <div v-if="authors" class="authors">{{  authors }} </div>    

  </div>
</template>

<script>
export default {
    name: "PaperHeader",
    props: {
        title: {
        type: String,
        required: true
        },
        supTitle: {
        type: String,
        required: false
        },
        authors: {
          type: String,
          required: false
        },
        date: {
            type: String,
            required: false
        },      

    }
}
</script>
<style scoped>
h1{
  margin-top:4px;
}
.date, .sup-title, .authors{
  margin:8px 0px;
}

.sup-title{
  font-size: 0.8em;
  line-height:1.4em;
  font-weight:900;
  color:#8e62c2;
  text-transform:uppercase;
}
 .date{
  font-size: 0.8em;
  line-height:1.4em;
  font-weight:900;
  color:#868686;
}
.authors{
  font-size: 1em;
  font-weight:400;
  line-height:1.4em;
  color: #868686;
}


</style>
