<template>
  <section>
    <h3>{{  title  }}</h3>    
    <slot></slot>
  </section>
</template>

<script>
export default {
    name: "PaperSubSection",
    props: {
        title: {
        type: String,
        required: false
        }
    }
}
</script>
<style scoped>
section{
  margin:48px 0px;
}
</style>
