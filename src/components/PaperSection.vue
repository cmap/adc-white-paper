<template>
  <section>
    <h2 class="title">{{  title  }}</h2>    
    <slot></slot>
  </section>
</template>

<script>
export default {
    name: "PaperSection",
    props: {
        title: {
        type: String,
        required: true
        }
    }
}
</script>
<style scoped>
section{
  margin:56px 0px;
}
</style>
