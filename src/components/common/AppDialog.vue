<template>
   <v-dialog v-model="dialog" max-width="300px">
        <v-card>
          <v-card-title class="headline">
            {{ title }}
          </v-card-title>
          <v-card-text>
             {{ message }}
          </v-card-text>
        <v-card-actions>
          <v-btn class="teal accent-3" flat @click.stop="dialog=false">CANCEL</v-btn>
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

@Component({
  props: {
    title: String,
    message: String
  }
})
export default class AppDialog extends Vue {
    dialog: boolean = false;
      @Action('CREATE_SURVEY') actionCreateSurvey: any;

    constructor() {
        super();

        EventBus.$on('SHOW_DIALOG', (showDialog: boolean) => {
            //console.log('showDialog', showDialog);
            this.showDialog();
        });
    }

    showDialog() {
        this.dialog = true;
    }

    onClickAccept() {
        //console.log("onClickAccept");
        this.actionCreateSurvey();
        this.dialog = false;
    }

};
</script>
<style>
</style>