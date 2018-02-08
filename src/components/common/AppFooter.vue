<template>
    <v-footer fixed class="teal accent-3">
    <div class="white--text">© {{ new Date().getFullYear() }}Adrián Brito Pacheco</div>
    <v-spacer></v-spacer>
    <div class="white--text">
      <a class="github-button" href="https://github.com/abritopach/angular-wishlist-mst" data-icon="octicon-star" aria-label="Star abritopach/angular-wishlist-mst on GitHub">Star</a>
      <a class="github-button" href="https://github.com/abritopach" aria-label="Follow @abritopach on GitHub">GitHub</a>
    </div>
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