<template>
  <div id="app">
    <v-app>
      <!-- Render the Toolbar component. -->
      <app-toolbar></app-toolbar>
      <div class="main">
        <v-card-text>
          <img v-if="$vuetify.breakpoint.xsOnly" src="./assets/logo.png" width="100%" height="100%" class="text-xs-center">
          <img v-if="!$vuetify.breakpoint.xsOnly" src="./assets/logo.png" width="490" height="130" class="text-xs-center">
        </v-card-text>
        <h1>{{ msg }}</h1>
        <router-view></router-view>
      </div>
      <!-- Render the Footer component. -->
      <app-footer></app-footer>
    </v-app>
  </div>
</template>

<script lang="ts">
 
import Vue from 'vue' 
import Component from 'vue-class-component'
import AppToolbar from './components/common/AppToolbar.vue'  
import AppFooter from './components/common/AppFooter.vue'

@Component({
  name: 'app',
  components: {
    // Add a reference to the Toolbar component in the components property.
    AppToolbar,
    AppFooter
  }
})

export default class App extends Vue {

  msg: string;

  constructor() {
    super();
    this.msg = 'Welcome to Your Vue.js (Vuetify.js, Vuex) & Survey.js App';
  }

}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  //margin-top: 60px;
}

.main {
  margin-bottom: 48px;
}
</style>
