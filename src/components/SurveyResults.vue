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
                    <div v-if="selectedSurvey.AllowAccessResult" class="white--text">
                      URL pública resultados -> <a v-bind:href="publicSurveyURL" target="_blank">Acceder</a>
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
      <v-data-table :headers="headers" :items="surveyResults" :loading="showProgress" hide-actions class="elevation-1">
        <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
        <template slot="items" slot-scope="props">
          <td>
            <v-btn icon @click="onClickDeleteResult(props.item)">
              <v-icon color="pink">delete</v-icon>
            </v-btn>
          </td>
          <td class="text-xs-left" v-for="userAnswer in props.item.userAnswers" v-bind:key="userAnswer.idQuestion">{{ userAnswer.value }}</td>
          <td>{{ props.item.happendAt | formatDate}}</td>
        </template>
        <!--
        <template slot="no-data">
          <v-alert :value="true" color="error" icon="warning">
            Sorry, no data available.
          </v-alert>
        </template>
        -->
      </v-data-table>
      <!--<v-progress-circular indeterminate color="primary" v-if="showProgress"></v-progress-circular>-->
    </v-container>
</template>

<script lang="ts" >

import Vue from 'vue'
import Component from 'vue-class-component'
import { State, Action } from 'vuex-class';
import { SurveyModel, SurveyResultsModel } from '../types';


@Component
export default class SurveyResults extends Vue {

  headers: any = [];
  @State('surveyResults') surveyResults: SurveyResultsModel[];
  @State('selectedSurvey') selectedSurvey: SurveyModel;
  @Action('FETCH_SURVEY_RESULTS') actionFetchSurveyResults: any;
  showProgress: boolean = true;
  publicSurveyURL: string = 'https://surveyjs.io/Results/Survey/';

  constructor() {
    super();
    this.headers.push({text: 'Action', value: 'Action', align: 'left'});
    this.$store.watch((state) => state.surveyResults, (surveys) => {
      if (surveys.length > 0) {
          surveys[0].userAnswers.forEach((val: any, index: any) => { this.headers.push({text: 'P' + (index + 1), value: 'P' + (index + 1), align: 'left'})});
          this.headers.push({text: 'Datetime', value: 'Datetime', align: 'left'});
      }
    });

  }

  mounted() {
    this.publicSurveyURL += this.selectedSurvey.Id;
    this.getSurveyResults();
  }

  getSurveyResults() {
    // console.log('getSurveyResults: ', this.$route.params.surveyId);
    // console.log('getSurveyResults: ', this.selectedSurvey.Id);
    this.actionFetchSurveyResults({ idSurvey: this.selectedSurvey.Id, self: this });
  }

  onClickDeleteResult(item: any) {
    // console.log("onClickDeleteResult", item);
  }

  hiddenProgress() {
    this.showProgress = false;
  }

};
</script>
<style>
  .datatable thead th.column.sortable i {
    display: none;
  }
</style>