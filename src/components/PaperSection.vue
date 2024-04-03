<template>
  <section>
    <h2>{{  title  }}</h2>    
    <slot></slot>
  </section>
</template>

<script>
export default {
    name: "PaperSection",
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
