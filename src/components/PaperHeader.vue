<template>
  <div class="wrapper">
    <span class="sup-title">{{ supTitle }}</span>
    <h1 class="title">{{  title  }}</h1>    
    <span class="date">{{  date }} </span>    
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
        required: true
        },
        date: {
            type: String,
            required: false
        },      

    }
}
</script>
<style scoped>
.wrapper{
  margin:32px 0px;
}
h1{
  margin:8px 0px;
}

.sup-title{
  font-size: 0.8em;
  line-height:1em;
  margin:0px;
  font-weight:600;
  color:#8e62c2;
  text-transform:uppercase;
}
 .date{
  font-size: 0.8em;
  font-weight:400;
  line-height:1em;
  margin:0px;
}


</style>
