<template>
  <survey-component surveyID="surveyID"></survey-component>
</template>

<script lang="ts" >

import Vue from 'vue'
import Component from 'vue-class-component'
import SurveyComponent from './SurveyComponent.vue'

@Component({
  components: {
    // Add a reference to the component in the components property.
    SurveyComponent
  }
})
export default class SurveyDetails extends Vue {

  constructor() {
    super();
    this.getSurveyId();
  }

  getSurveyId() {
    console.log(this.$route.params.surveyId);
  }

};
</script>
<style>
</style>