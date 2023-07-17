<template>
  <div class="content-block">
    <slot></slot>
  </div>
</template>

<script>
export default {
    name: "PaperHeader",
    props: {
        title: {
        type: String,
        required: true
        }   
    }
}
</script>
<style scoped>
.content-block{
    font-size:1em;
  /* margin:32px 0px; */
  padding:32px;
  background-color:#fafafa;
  border-radius:4px;
}

</style>
