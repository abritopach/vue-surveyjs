<template>
    <v-toolbar class="teal accent-3">
        <!--
        <v-btn v-if="backArrow || false" icon class="hidden-xs-only">
            <v-icon>arrow_back</v-icon>
        </v-btn>
        -->
        <v-toolbar-title class="white--text">Vue.js & Survey.js</v-toolbar-title>
        <v-btn fab small color="red darken-1" bottom right absolute @click.native.stop="onClickCreateSurvey()">
            <v-icon class="white--text">add</v-icon>
        </v-btn>
        <app-dialog title="Create Survey" message="¿Are you sure to create new survey?"></app-dialog>
    </v-toolbar>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'
import AppDialog from './AppDialog.vue'
import EventBus from '../../event.bus'

@Component({
  components: {
    // Add a reference to the component in the components property.
    AppDialog
  }
})
export default class Toolbar extends Vue {

    onClickCreateSurvey() {
        console.log('onClickCreateSurvey');
        EventBus.$emit('SHOW_DIALOG', true);
    }
};
</script>
<style>
</style>