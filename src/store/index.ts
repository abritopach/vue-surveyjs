import Vue from 'vue';
import Vuex from 'vuex';
import { surveys } from './surveys';

Vue.use(Vuex);

export default new Vuex.Store(surveys);