<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-text>
          <p class="text-xs-center">Survey Results</p>
        </v-card-text>
        <v-progress-circular indeterminate color="primary" v-if="showProgress"></v-progress-circular>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts" >

import Vue from 'vue'
import Component from 'vue-class-component'
import { Action } from 'vuex-class';

@Component
export default class SurveyResults extends Vue {

   @Action('FETCH_SURVEY_RESULTS') actionFetchSurveyResults: any;
   showProgress: boolean = true;

  constructor() {
    super();
    this.getSurveyResults();
  }

  getSurveyResults() {
    console.log('getSurveyResults: ', this.$route.params.surveyId);
    this.actionFetchSurveyResults({ idSurvey: this.$route.params.surveyId, self: this });
  }

  hiddenProgress() {
    this.showProgress = false;
  }

};
</script>
<style>
</style>