<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <!-- Active surveys. -->
        <v-list two-line subheader>
            <v-subheader inset>Active surveys</v-subheader>
            <v-list-group :key="item.Id" v-for="item in activeSurveys">
              <v-list-tile avatar slot="activator" @click.prevent>
                <v-list-tile-avatar>
                  <img v-bind:src="item.Image">
                </v-list-tile-avatar>
                <v-list-tile-content @click="selectedSurvey(item)">
                  <v-list-tile-title>{{item.Name}}</v-list-tile-title>
                  <v-list-tile-sub-title><v-icon>alarm</v-icon> {{item.CreatedAt | formatDate}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-for="action in actionsActiveSurveys" v-bind:key="action.title" @click.prevent>
                <v-list-tile-content>
                  <v-list-tile-title @click="onClickAction(action.action, item)">{{ action.title }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon>{{ action.icon }}</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </v-list-group>
        </v-list>
        <!-- Archive surveys. -->
        <v-list two-line subheader>
            <v-subheader inset>Archive surveys</v-subheader>
            <v-list-group v-bind:key="item.Id" v-for="item in archiveSurveys">
              <v-list-tile avatar slot="activator" @click.prevent>
                <v-list-tile-avatar>
                  <img v-bind:src="item.Image">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{item.Name}}</v-list-tile-title>
                  <v-list-tile-sub-title><v-icon>alarm</v-icon> {{item.CreatedAt | formatDate}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
               <v-list-tile v-for="action in actionsArchiveSurveys" v-bind:key="action.title" @click.prevent>
                <v-list-tile-content @click="onClickAction(action.action, item)">
                  <v-list-tile-title>{{ action.title }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon>{{ action.icon }}</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </v-list-group>
        </v-list>
        <v-progress-circular indeterminate color="primary" v-if="showProgress"></v-progress-circular>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts" >

import Vue from 'vue';
import Component from 'vue-class-component';
import { surveyService } from '../services/survey.service';
import { State, Getter, Action } from 'vuex-class';
import { SurveyModel } from '../types';
import EventBus from '../event.bus';

@Component
export default class Home extends Vue {
  showProgress: boolean = true;
  @State('activeSurveys') activeSurveys: any;
  @State('archiveSurveys') archiveSurveys: any;
  @Action('SELECTED_SURVEY') actionSelectedSurvey: any;
  @Action('FETCH_SURVEYS') actionFetchSurveys: any;
  actionsActiveSurveys: any = [];
  actionsArchiveSurveys: any = [];

  constructor() {
    super();
    this.actionFetchSurveys({ self: this });
    this.actionsActiveSurveys = [
          { action: 'archive', title: 'Archive', icon: 'lock_outline'},
          { action: 'edit', title: 'Edit', icon: 'mode_edit'},
          { action: 'delete', title: 'Delete', icon: 'delete'}
    ];
    this.actionsArchiveSurveys = [
          { action: 'activate', title: 'Activate', icon: 'lock_open'},
          { action: 'edit', title: 'Edit', icon: 'mode_edit'},
          { action: 'delete', title: 'Delete', icon: 'delete'}
    ];
  }

  hiddenProgress() {
    this.showProgress = false;
  }

  selectedSurvey(item: any) {
    this.actionSelectedSurvey({ survey: item });
    this.$router.push({ path: '/surveyDetails' })
    // this.$router.push({ path: '/surveyDetails/' + item.Id})
  }

  onClickAction(action: any, survey: any) {
    let dialogConfig = this.dialogConfig(action);
    dialogConfig.survey = survey;
    EventBus.$emit('SHOW_DIALOG', dialogConfig);
  }

  dialogConfig(action: any) {
    let options: any = {
      delete: {title: 'Delete Survey', message: '¿Are you sure to delete the survey?', action: "delete", simpleDialog: true},
      activate: {title: 'Activate Survey', message: '¿Are you sure to activate the survey?', action: "activate", simpleDialog: true},
      archive: {title: 'Archive Survey', message: '¿Are you sure to archive the survey?', action: "archive", simpleDialog: true},
      edit: {title: 'Edit Survey', message: 'Enter the new name for the survey', action: "edit", inputText: 'Name', simpleDialog: true}
    }
    return options[action];
    }

};
</script>
<style>
  ul {
    list-style-type: none;
    padding: 0;
  }
</style>