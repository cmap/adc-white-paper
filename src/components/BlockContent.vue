<template>
  <section>
    <slot></slot>
  </section>
</template>

<script>
export default {
    name: "BlockContent",
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
  margin:32px 0px;
}

</style>
