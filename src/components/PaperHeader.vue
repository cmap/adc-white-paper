<template>
  <div>
    <v-chip  v-if="badge" class="secondary-badge orange-light-badge" small>{{ badge }}</v-chip>
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
        badge: {
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
.date, .authors{
  margin:8px 0px;
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
