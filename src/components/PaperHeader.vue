<template>
  <div class="wrapper">
    <h4 class="sup-title">{{ supTitle }}</h4>
    <h1 class="title">{{  title  }}</h1>    
    <h4 class="date">{{  date }} </h4>    
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
h1, h4{
  margin:16px 0px;
}
.sup-title{
  font-weight:600;
  color:#8e62c2;
  text-transform:uppercase;
}
 .date{
  font-weight:400;
}


</style>
