<template>
        <v-card elevation="0" class="d-flex align-center">
            <v-img class="card-image" :src="img"></v-img>
            <div class="card-content">
                <slot></slot>
                <v-card-title v-if="title"> {{ title }}</v-card-title>
                <v-card-text v-if="description" v-text="description"></v-card-text>
            </div>
        </v-card>
</template>

<script>


export default {
    name: "HorizontalImageCard",
    props: {
        title: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        },
        img: {
            type: String,
            required: false
        }
    }
}
</script>

<style scoped>
.v-card{
    margin:32px 0px;
    border:1px solid #e1e1e1 !important;
}
.card-image{
    width:30%;
    max-width:250px;
    padding:1em;
}

</style>