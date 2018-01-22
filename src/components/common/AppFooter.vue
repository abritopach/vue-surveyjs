<template>
    <v-footer fixed class="teal accent-3">
    <div class="white--text">Adrián Brito Pacheco <a href="https://github.com/abritopach" target="_blank">GitHub</a></div>
    <v-spacer></v-spacer>
    <div class="white--text">© {{ new Date().getFullYear() }}</div>
  </v-footer>
</template>

<script lang="ts" >

import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class AppFooter extends Vue {
};
</script>
<style>
</style>