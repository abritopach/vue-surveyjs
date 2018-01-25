import { GetterTree, ActionTree, MutationTree, Mutation } from 'vuex';
import { State } from '../types';
import { surveyService } from '../services/survey.service';

const state: State = {
    activeSurveys: [
        /*
        {AllowAccessResult: false, CreatedAt:"2017-12-20T10:20:27.3230704", CreatorId: "00000000-0000-0000-0000-000000000000", Id: "0d7bb1d7-fb89-4e5c-835d-fd98081a0a73", 
        IsArchived: false, IsPublished: false, Name: "New Survey 2", PostId: "dce9c452-f6a9-4359-a610-652af6afd2c2", PublishId: "",
        ResultId: "e49e3372-8719-40c9-9141-918523e7376d", StoreIPAddress: false, UseCookies: false, UserId: "9ba6421d-feb1-4aa6-8ff9-beaf51b5b6a8", Image: ""}
        */
    ],
    archiveSurveys: []
}

const getters: GetterTree<State, any> = {
    activeSurveys: state => state.activeSurveys,
    archiveSurveys: state => state.archiveSurveys
}

const actions: ActionTree<State, any> = {
    /*
    FETCH_ACTIVE_SURVEYS: function({ commit }) {
        surveyService.getActiveSurveys()
        .then((response) => {
            commit("FETCH_ACTIVE_SURVEYS_MUTATION", response.data);
        })
        .catch((error => {
            console.log(error.statusText)
        }))
    },
    FETCH_ARCHIVE_SURVEYS: function({ commit }) {
        surveyService.getArchiveSurveys()
        .then((response) => {
            commit("FETCH_ARCHIVE_SURVEYS_MUTATION", response.data);
        })
        .catch((error => {
            console.log(error.statusText)
        }))
    },
    */
    FETCH_SURVEYS: function({commit}, {self}) {
        Promise.all([
            surveyService.getActiveSurveys(),
            surveyService.getArchiveSurveys()
          ]).then(response => {
            //console.log(response);
            self.hiddenProgress();
            commit("FETCH_SURVEYS_MUTATION", response);
          });
    },
    CREATE_SURVEY: function({commit}) {
        surveyService.createSurvey("New Survey :)")
        .then((response) => {
            commit("CREATE_SURVEY_MUTATION", response.data);
        })
        .catch((error => {
            console.log(error.statusText)
        }))
    }
}

const mutations: MutationTree<State> = {
    /*
    FETCH_ACTIVE_SURVEYS_MUTATION(state, activeSurveys) {
        state.activeSurveys = activeSurveys
    },
    FETCH_ARCHIVE_SURVEYS_MUTATION(state, archiveSurveys) {
        state.archiveSurveys = archiveSurveys
    },
    */
    FETCH_SURVEYS_MUTATION(state, surveys) {
        state.activeSurveys = surveys[0].data,
        state.archiveSurveys = surveys[1].data
    },
    CREATE_SURVEY_MUTATION(state, survey) {
        state.activeSurveys.unshift(survey);
    }
}

export const surveys = {
    state,
    getters,
    actions, 
    mutations
} 

