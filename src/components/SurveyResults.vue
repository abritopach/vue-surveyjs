<template>
  <!--
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
  -->
  <v-data-table :headers="headers" :items="surveyResults" hide-actions class="elevation-1">
  <template slot="items" slot-scope="props">
    <td class="text-xs-left" v-for="userAnswer in props.item.userAnswers" v-bind:key="props.item.userAnswers.idQuestion">{{ userAnswer.value }}</td>
    <td>{{ props.item.happendAt | formatDate}}</td>
  </template>
  </v-data-table>
</template>

<script lang="ts" >

import Vue from 'vue'
import Component from 'vue-class-component'
import { State, Action } from 'vuex-class';
import { SurveyResultsModel } from '../types';

@Component
export default class SurveyResults extends Vue {

  headers: any;
  items: any;
  @State('surveyResults') surveyResults: SurveyResultsModel[];
  @Action('FETCH_SURVEY_RESULTS') actionFetchSurveyResults: any;
  showProgress: boolean = true;
  keys: any;

  constructor() {
    super();

    this.headers= [
          {
            text: 'P1',
            align: 'left',
            value: 'P1'
          },
          { text: 'P2', value: 'P2' },
          { text: 'P3', value: 'P3' },
          { text: 'P4', value: 'P4' },
          { text: 'P5', value: 'P5' }
        ];

    this.getSurveyResults();
  }

  getSurveyResults() {
    console.log('getSurveyResults: ', this.$route.params.surveyId);
    this.actionFetchSurveyResults({ idSurvey: this.$route.params.surveyId, self: this });

    /*
    if (this.surveyResults.length > 0) {
        this.keys = this.surveyResults[0].userAnswers.map((val, key) => {return val['textQuestion']});
        console.log(this.keys);
    }
    */
  }

  hiddenProgress() {
    this.showProgress = false;
  }

};
</script>
<style>
</style>