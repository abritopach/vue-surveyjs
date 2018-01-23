<template>
    <v-toolbar class="teal accent-3">
        <!--
        <v-btn v-if="backArrow || false" icon class="hidden-xs-only">
            <v-icon>arrow_back</v-icon>
        </v-btn>
        -->
        <v-toolbar-title class="white--text">Vue.js & Survey.js</v-toolbar-title>
        <v-btn fab small color="red darken-1" bottom right absolute @click.native.stop="dialog = !dialog">
            <v-icon class="white--text">add</v-icon>
        </v-btn>
    </v-toolbar>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Toolbar extends Vue {
};
</script>
<style>
</style>