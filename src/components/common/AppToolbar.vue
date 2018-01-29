<template>
    <v-toolbar class="teal accent-3">
        <v-btn v-if="showBackButton()" icon @click.native.stop="onClickBackButton()">
            <v-icon class="white--text">arrow_back</v-icon>
        </v-btn>
        <v-toolbar-title class="white--text">Vue.js & Survey.js</v-toolbar-title>
        <v-btn v-if="showFabCreate()" fab small color="red darken-1" bottom right absolute @click.native.stop="onClickCreateSurvey()">
            <v-icon class="white--text">add</v-icon>
        </v-btn>
        <v-btn v-if="showFabResults()" fab small color="red darken-1" bottom right absolute @click.native.stop="onClickGetSurveyResults()">
            <v-icon class="white--text">description</v-icon>
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

    showBackButton() {
        return this.$route.meta.showBackButton;
    }

    showFabCreate() {
        return this.$route.meta.showFabCreate;
    }

    showFabResults() {
        return this.$route.meta.showFabResults;
    }

    onClickCreateSurvey() {
        //console.log('onClickCreateSurvey');
        EventBus.$emit('SHOW_DIALOG', true);
    }

    onClickGetSurveyResults() {
        //console.log("onClickGetSurveyResults");
        //console.log(this.$route.params.surveyId);
        this.$router.push({ path: `/surveyResults/${this.$route.params.surveyId}` });
    }

    onClickBackButton() {
        //console.log("onClickBackButton");
        this.$router.go(-1);
    }
};
</script>
<style>
</style>