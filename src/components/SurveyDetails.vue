<template>
  <div class="surveyContainer">
    
     <v-layout row>
      <v-flex xs12>
        <v-card color="blue-grey darken-2" class="white--text">
          <v-card-title primary-title>
            <div class="headline">Survey Details</div>
            <survey v-if="survey != null" :survey="survey"></survey>
          </v-card-title>
        </v-card>
      </v-flex>
     </v-layout>
  </div>
</template>

<script lang="ts" >

import Vue from 'vue'
import Component from 'vue-class-component';
import { State } from 'vuex-class';
import { SurveyModel } from '../types';
import * as SurveyVue from 'survey-vue';

@Component
export default class SurveyDetails extends Vue {

  survey: any = null;
  @State('selectedSurvey') selectedSurvey: SurveyModel;

  constructor() {
    super();
    // this.getSurveyId();
    this.showSurvey();
  }

  /*
  getSurveyId() {
    console.log(this.$route.params.surveyId);
  }
  */

  showSurvey() {

    this.setSurveyTheme();

    // https://vuejs.org/v2/guide/reactivity.html
    this.$nextTick(function () {
        let surveyJSON = {
          surveyId: this.selectedSurvey.Id,
          surveyPostId: this.selectedSurvey.PostId
        };

        this.survey = (window as any)['survey'] = new SurveyVue.SurveyModel(surveyJSON);
        // console.log(SurveyVue.surveyCss.getCss());
        this.survey.css = SurveyVue.surveyCss.getCss();
        // console.log(this.survey);

        // Save survey result when user click complete button.
        this.survey.onComplete.add(function (result: any) {
          console.log(JSON.stringify(result.data));
        });
    })
    
  }

  setSurveyTheme() {
    // Custom theme.
    let defaultThemeColors = SurveyVue.StylesManager.ThemeColors["default"];
    defaultThemeColors["$main-color"] = "#6ce5b9";
    defaultThemeColors["$main-hover-color"] = "#64b487";
    defaultThemeColors["$text-color"] = "#4a4a4a";
    defaultThemeColors["$header-color"] = "#6ce5b9";

    defaultThemeColors["$header-background-color"] = "#4a4a4a";
    defaultThemeColors["$body-container-background-color"] = "#f8f8f8";

    SurveyVue.StylesManager.applyTheme();

    // SurveyVue.StylesManager.applyTheme("default");
    SurveyVue.surveyLocalization.currentLocale = "es";
  }

};
</script>
<style>
  .sv_main.sv_default_css {
    width: 100%;
  }

  .sv_body {
    padding: 10px;
    text-align: left;
  }

  .sv_qstn, .sv_nav {
    padding-top: 10px;
  }

  .sv_q_radiogroup {
    display: block!important;
    line-height: 1.5em!important;
  }
</style>