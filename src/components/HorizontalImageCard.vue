<template>

        <v-card elevation="1">
            <v-row>
                <v-col
                    cols="12"
                    sm="12"
                    md="3"
                >
                    <v-img class="card-image" :src="img"></v-img>
                </v-col>
                <v-col
                    cols="12"
                    sm="12"
                    md="9"
                >
                    <div class="card-content">
                        <slot></slot>
                        <v-card-title v-if="title"> {{ title }}</v-card-title>
                        <v-card-text v-if="description" v-text="description"></v-card-text>
                    </div>

                    </v-col>
            </v-row>

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



</style>