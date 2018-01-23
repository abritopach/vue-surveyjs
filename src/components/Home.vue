<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <!-- Active surveys. -->
        <v-list two-line subheader>
            <v-subheader inset>Active surveys</v-subheader>
            <v-list-tile avatar v-bind:key="item.Name" v-for="item in items" @click="selectedSurvey(item)">
              <v-list-tile-avatar>
                <img v-bind:src="avatarIcon">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{item.Name}}</v-list-tile-title>
                <v-list-tile-sub-title><v-icon>alarm</v-icon> {{item.CreatedAt | formatDate}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
        </v-list>
        <!-- Archive surveys. -->
        <v-list two-line subheader>
            <v-subheader inset>Archive surveys</v-subheader>
            <v-list-tile avatar v-bind:key="item.Name" v-for="item in archiveSurveys">
              <v-list-tile-avatar>
                <img v-bind:src="avatarIcon">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{item.Name}}</v-list-tile-title>
                <v-list-tile-sub-title><v-icon>alarm</v-icon> {{item.CreatedAt | formatDate}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts" >

import Vue from 'vue'
import Component from 'vue-class-component'
import { surveyService } from '../services/survey.service'

@Component
export default class Home extends Vue {
  items: any = [];
  archiveSurveys: any = [];
  avatarIcon: string = 'http://www.redcresearch.ie/wp-content/uploads/2015/12/30.png';

  constructor() {
    super();
    this.getActiveSurveys();
    this.getArchiveSurveys();
  }

  getActiveSurveys() {
    surveyService.getActiveSurveys().then(response => {
      //console.log(response.data);
      this.items = response.data;
    })
  }

  getArchiveSurveys() {
    surveyService.getArchiveSurveys().then(response => {
      //console.log(response.data);
      this.archiveSurveys = response.data;
    })
  }

  selectedSurvey(item: any) {
    console.log(item);
    this.$router.push({ path: '/surveyDetails/' + item.Id})
  }
};
</script>
<style>
</style>