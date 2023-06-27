<template>
    <div class="banner">
        <v-container>
            <v-row justify="center">
            <v-col cols="6">
                <slot></slot>
            </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
export default {
    name: "BannerFullWidth"
}
</script>

<!-- STYLE NOT SCOPED! -->
<style>


.banner {
  text-align: center;
  padding: 32px 0px;
  width: 100%;
  background-color: #DDEBF8;
}
</style>

