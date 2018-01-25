<template>
  <div id='surveyElement'>Survey Details</div>
</template>

<script lang="ts" >

import Vue from 'vue'
import Component from 'vue-class-component'
import * as SurveyVue from 'survey-vue'

@Component
export default class SurveyComponent extends Vue {

  constructor() {
    super();

      /*
      this.surveyId = surveyID;
      let surveyModel = new SurveyVue.ReactSurveyModel({ surveyId: this.surveyId });

      // Change language.
      surveyModel.locale = "es";

        // Progress Bar.
        surveyModel.showProgressBar = 'bottom';

        surveyModel.onComplete.add(this.sendDataToServer);
        Survey.SurveyNG.render('surveyElement', { model: surveyModel });
        */
  }

};
</script>
<style>
</style>