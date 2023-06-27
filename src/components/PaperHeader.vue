<template>
  <div class="wrapper">
    <h4 class="sup-title">{{ supTitle }}</h4>
    <h1 class="title">{{  title  }}</h1>    
    <h4 class="sub-title">{{  date }} {{  subTitle  }} </h4>    
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
        subTitle: {
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
.wrapper{
  margin:32px 0px;
}
h1, h4{
  margin:8px 0px;
}
.sub-title, .date{
  font-weight:300;
}


</style>
