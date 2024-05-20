<script setup>
import GlobalDialog from './components/GlobalDialog.vue'
import Navigation from './components/Navigation.vue'

</script>

<template>
  <Navigation/>
  <GlobalDialog/>
  <router-view />
</template>

<style>
@import './assets/css/styles.css';
</style>
