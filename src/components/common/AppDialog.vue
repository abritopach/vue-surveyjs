<template>
    <v-dialog v-model="flagDialog" max-width="300px">
      <v-progress-circular indeterminate color="primary" v-if="showProgress"></v-progress-circular>
      <v-card>
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
  </v-dialog>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'
import EventBus from '../../event.bus'
import { Action } from 'vuex-class';

@Component
export default class AppDialog extends Vue {
    flagDialog: boolean = false;
    @Action('CREATE_SURVEY') actionCreateSurvey: any;
    @Action('ARCHIVE_SURVEY') actionArchiveSurvey: any;
    @Action('RESTORE_SURVEY') actionRestoreSurvey: any;
    @Action('DELETE_SURVEY') actionDeleteSurvey: any;
    @Action('CHANGE_SURVEY_NAME') actionChangeSurveyName: any;
    dialog: any = {};
    showProgress: boolean = false;
    newName: string = '';

    constructor() {
        super();

        EventBus.$on('SHOW_DIALOG', (dialog: any) => {
            //console.log('dialog', dialog);
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
        }
        this.flagDialog = false;
    }

    hiddenProgress() {
      this.showProgress = false;
    }

};
</script>
<style>
</style>