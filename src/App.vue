<template>
  <div id="app">
    <v-app>
    <!-- Render the Toolbar component. -->
    <app-toolbar></app-toolbar>
    <v-card-text>
      <img src="./assets/logo.png" width="200" height="200" class="text-xs-center">
    </v-card-text>
    <h1>{{ msg }}</h1>
    <router-view></router-view>
    <br>
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

/*
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
*/
</style>
