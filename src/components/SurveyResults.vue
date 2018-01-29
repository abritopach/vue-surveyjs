<template>
  <v-container fluid style="min-height: 0;" grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card color="cyan darken-2" class="white--text">
            <v-container fluid grid-list-lg>
              <v-layout row>
                <v-flex xs7>
                  <div>
                    <div class="headline">Leyenda</div>
                    <div v-if="surveyResults.length != 0">
                      <div v-for="(userAnswer, index) in surveyResults[0].userAnswers" v-bind:key="userAnswer.idQuestion">
                        P{{index + 1}}: {{ userAnswer.textQuestion }}
                      </div>
                    </div>
                  </div>
                </v-flex>
                <v-flex xs5>
                  <v-card-media src="http://www.redcresearch.ie/wp-content/uploads/2015/12/30.png" height="125px" contain></v-card-media>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
      <v-data-table :headers="headers" :items="surveyResults" hide-actions class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="text-xs-left" v-for="userAnswer in props.item.userAnswers" v-bind:key="userAnswer.idQuestion">{{ userAnswer.value }}</td>
          <td>{{ props.item.happendAt | formatDate}}</td>
        </template>
      </v-data-table>
      <v-progress-circular indeterminate color="primary" v-if="showProgress"></v-progress-circular>
    </v-container>
</template>

<script lang="ts" >

import Vue from 'vue'
import Component from 'vue-class-component'
import { State, Action } from 'vuex-class';
import { SurveyResultsModel } from '../types';

@Component
export default class SurveyResults extends Vue {

  headers: any = [];
  @State('surveyResults') surveyResults: SurveyResultsModel[];
  @Action('FETCH_SURVEY_RESULTS') actionFetchSurveyResults: any;
  showProgress: boolean = true;
  keys: any = [];

  constructor() {
    super();

    this.getSurveyResults();

    this.$store.watch((state) => state.surveyResults, (surveys) => {
      //console.log('surveyResults is changing');
      //console.log(surveys);
      if (surveys.length > 0) {
          this.keys = surveys[0].userAnswers.map((val: any, key: any) => {return val['textQuestion']});
          this.keys.forEach((val: any, index: any) => { this.headers.push({text: 'P' + (index + 1), value: 'P' + (index + 1), align: 'left'})});
          //console.log(this.headers);
      }
    })
  }

  getSurveyResults() {
    //console.log('getSurveyResults: ', this.$route.params.surveyId);
    this.actionFetchSurveyResults({ idSurvey: this.$route.params.surveyId, self: this });
  }

  hiddenProgress() {
    this.showProgress = false;
  }

};
</script>
<style>
</style>