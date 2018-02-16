<template>
    <v-dialog v-model="flagDialog" :fullscreen=dialog.fullscreen max-width="300px">
      <v-progress-circular indeterminate color="primary" v-if="showProgress"></v-progress-circular>
      <!-- Simple Dialog content. -->
      <v-card v-if="dialog.simpleDialog">
        <v-card-title class="headline">
          {{ dialog.title }}
        </v-card-title>
        <v-card-text>
            {{ dialog.message }}
            <v-flex xs12 v-if="dialog.inputText">
              <v-text-field label="Name" v-model="newName" required></v-text-field>
            </v-flex>
        </v-card-text>
      <v-card-actions>
        <v-btn class="teal accent-3" flat @click.stop="flagDialog=false">CANCEL</v-btn>
        <v-btn class="teal accent-3" flat @click.stop="onClickAccept()">ACCEPT</v-btn>
        </v-card-actions>
      </v-card>
      <!-- Charts Dialog content. -->
      <v-card v-if="dialog.chartsDialog">
        <v-toolbar class="teal accent-3">
            <v-btn icon @click.native="flagDialog=false" dark>
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title class="white--text">{{ dialog.title }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-card>
                <v-list>
                  <div v-for="(data, index) in chartData" v-bind:key="generateUniqueKey(data)">
                    <h5>Pregunta P{{index + 1}}</h5>
                    <p>{{keys[index]}}</p>
                    <chart-component :chartData=data></chart-component>
                    <br>
                  </div>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
  </v-dialog>
</template>

<script lang="ts">

import Vue from 'vue';
import Component from 'vue-class-component';
import EventBus from '../../event.bus';
import { State, Action } from 'vuex-class';
import ChartComponent from '../Chart.vue';
import { SurveyResultsModel } from '../../types';
import { Utils }  from '../../utils/utils';

@Component({
  components: {
    // Add a reference to the component in the components property.
    ChartComponent
  }
})
export default class AppDialog extends Vue {
    flagDialog: boolean = false;
    @Action('CREATE_SURVEY') actionCreateSurvey: any;
    @Action('ARCHIVE_SURVEY') actionArchiveSurvey: any;
    @Action('RESTORE_SURVEY') actionRestoreSurvey: any;
    @Action('DELETE_SURVEY') actionDeleteSurvey: any;
    @Action('CHANGE_SURVEY_NAME') actionChangeSurveyName: any;
    @Action('MAKE_SURVEY_RESULTS_PUBLIC') actionMakePublic: any;
    dialog: any = {};
    showProgress: boolean = false;
    newName: string = '';

    // Draw Chart.
    @State('surveyResults') surveyResults: SurveyResultsModel[];
    @State('results') results: any[];
    chartData: any = [];
    keys: any = [];
    utils: any;

    constructor() {
        super();
        this.utils = new Utils();
        EventBus.$on('SHOW_DIALOG', (dialog: any) => {
            //console.log('dialog', dialog);
            if (dialog.chartsDialog) {
              this.showChart();
            }

            this.showDialog(dialog);
        });
    }

    showDialog(dialog: any) {
      this.dialog = dialog;
      this.flagDialog = true;
    }

    onClickAccept() {
        //console.log("onClickAccept");
        //console.log("action", this.action);
        this.showProgress = true;
        switch (this.dialog.action)
        {
          case "create":
            this.actionCreateSurvey({ self: this });
            break;
          case "archive":
            this.actionArchiveSurvey({ survey: this.dialog.survey, self: this });
            break;
          case "activate":
            this.actionRestoreSurvey({ survey: this.dialog.survey, self: this });
            break;
          case "delete":
            this.actionDeleteSurvey({ survey: this.dialog.survey, self: this });
            break;
          case "edit":
            //console.log(this.newName);
            this.actionChangeSurveyName({survey: this.dialog.survey, newName: this.newName, self: this});
            break;
          case "makePublic":
            //console.log("makePublic", this.dialog.survey);
            this.actionMakePublic({survey: this.dialog.survey, self: this});
            break;
        }
        this.flagDialog = false;
    }

    hiddenProgress() {
      this.showProgress = false;
    }

    showChart() {
      let args = [this.results, this.surveyResults];
      this.chartData = this.utils.formatDataChart(...args);
    }

    generateUniqueKey(obj: any) {
      return obj.__ob__.dep.id;
    } 
 
};
</script>
<style>
</style>