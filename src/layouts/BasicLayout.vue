<template>
    <v-app>
      <app-bar />
      <v-main>
      <router-view />
    </v-main>
    </v-app>
  </template>
  
  <script setup>
    import AppBar from '@/components/AppBar.vue';
  </script>
  