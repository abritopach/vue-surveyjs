<template>
    <v-dialog v-model="flagDialog" max-width="300px">
      <v-progress-circular indeterminate color="primary" v-if="showProgress"></v-progress-circular>
      <v-card>
        <v-card-title class="headline">
          {{ title }}
        </v-card-title>
        <v-card-text>
            {{ message }}
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
    title: string = '';
    message: string = '';
    action: string = '';
    survey: any;
    showProgress: boolean = false;

    constructor() {
        super();

        EventBus.$on('SHOW_DIALOG', (dialog: any) => {
            //console.log('dialog', dialog);
            this.showDialog(dialog);
        });
    }

    showDialog(dialog: any) {
      this.title = dialog.title;
      this.message = dialog.message;
      this.action = dialog.action;
      this.survey = dialog.survey;
      this.flagDialog = true;
    }

    onClickAccept() {
        //console.log("onClickAccept");
        //console.log("action", this.action);
        this.showProgress = true;
        switch (this.action)
        {
          case "create":
            this.actionCreateSurvey();
            break;
          case "archive":
            this.actionArchiveSurvey({ survey: this.survey, self: this });
            break;
          case "activate":
            this.actionRestoreSurvey({ survey: this.survey, self: this });
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