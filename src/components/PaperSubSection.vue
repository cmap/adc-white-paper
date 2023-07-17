<template>
  <section>
    <h3 class="title">{{  title  }}</h3>    
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
  margin:56px 0px;
}
</style>
