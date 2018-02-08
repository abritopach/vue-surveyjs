import { GetterTree, ActionTree, MutationTree, Mutation } from 'vuex';
import { State, SurveyModel, SurveyResultsModel } from '../types';
import { surveyService } from '../services/survey.service';

const state: State = {
    activeSurveys: [],
    archiveSurveys: [],
    selectedSurvey: { AllowAccessResult: false,
        CreatedAt: "",
        CreatorId: "",
        Id: "",
        IsArchived: false,
        IsPublished: false,
        Name: "",
        PostId: "",
        PublishId: "",
        ResultId: "",
        StoreIPAddress: false,
        UseCookies: false,
        UserId: "",
        Image: ""
    },
    surveyResults: [],
    results: []
}

const getters: GetterTree<State, any> = {
    activeSurveys: state => state.activeSurveys,
    archiveSurveys: state => state.archiveSurveys,
    selectedSurvey: state => state.selectedSurvey,
    surveyResults: state => state.surveyResults,
    results: state => state.results
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
          }).catch(err => {
            self.hiddenProgress();
            console.log(err.message);
          });
    },
    CREATE_SURVEY: function({commit}, {self}) {
        surveyService.createSurvey("New Survey :)")
        .then((response) => {
            self.hiddenProgress();
            commit("CREATE_SURVEY_MUTATION", response.data);
        })
        .catch((error => {
            self.hiddenProgress();
            console.log(error.statusText)
        }))
    },
    SELECTED_SURVEY: function({commit}, {survey}) {
        //console.log("SELECTED_SURVEY", survey);
        commit("SELECTED_SURVEY_MUTATION", {survey: survey});
    },
    ARCHIVE_SURVEY: function({commit}, {survey, self}) {
        surveyService.archiveSurvey(survey.Id)
        .then((response) => {
            self.hiddenProgress();
            commit("ARCHIVE_SURVEY_MUTATION", {response: response, survey: survey});
        })
        .catch((error => {
            self.hiddenProgress();
            console.log(error.statusText)
        }))
    },
    RESTORE_SURVEY: function({commit}, {survey, self}) {
        surveyService.restoreSurvey(survey.Id)
        .then((response) => {
            self.hiddenProgress();
            commit("RESTORE_SURVEY_MUTATION", {response: response, survey: survey});
        })
        .catch((error => {
            self.hiddenProgress();
            console.log(error.statusText)
        }))
    },
    DELETE_SURVEY: function({commit}, {survey, self}) {
        surveyService.deleteSurvey(survey.Id)
        .then((response) => {
            self.hiddenProgress();
            commit("DELETE_SURVEY_MUTATION", {response: response, survey: survey});
        })
        .catch((error => {
            self.hiddenProgress();
            console.log(error.statusText)
        }))
    },
    CHANGE_SURVEY_NAME: function({commit}, {survey, newName, self}) {
        surveyService.changeSurveyName(survey.Id, newName)
        .then((response) => {
            self.hiddenProgress();
            commit("CHANGE_SURVEY_NAME_MUTATION", {response: response, survey: survey, newName: newName});
        })
        .catch((error => {
            self.hiddenProgress();
            console.log(error.statusText)
        }))
    },
    FETCH_SURVEY_RESULTS: function({ commit }, {idSurvey, self}) {
        surveyService.getSurveyResults(idSurvey)
        .then((response) => {
            self.hiddenProgress();
            commit("FETCH_SURVEY_RESULTS_MUTATION", response.data);
        })
        .catch((error => {
            self.hiddenProgress();
            console.log(error.statusText)
        }))
    },
    MAKE_SURVEY_RESULTS_PUBLIC: function({ commit }, {survey, self}) {
        //console.log(survey);
        surveyService.makeSurveyResultsPublic(survey.Id, !survey.AllowAccessResult)
        .then((response) => {
            self.hiddenProgress();
            commit("MAKE_SURVEY_RESULTS_PUBLIC_MUTATION", response);
        })
        .catch((error => {
            self.hiddenProgress();
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
        state.activeSurveys = SurveyModel.fromJSONArray(surveys[0].data);
        state.archiveSurveys = SurveyModel.fromJSONArray(surveys[1].data);
    },
    SELECTED_SURVEY_MUTATION(state, payload) {
        //console.log("SELECTED_SURVEY_MUTATION", payload.survey);
        //state.selectedSurvey = Object.assign({}, payload.survey);
        state.selectedSurvey = {... payload.survey}
        //console.log(state.selectedSurvey);
    },
    CREATE_SURVEY_MUTATION(state, survey) {
        survey.Image = "http://www.redcresearch.ie/wp-content/uploads/2015/12/14.png";
        state.activeSurveys.unshift(survey);
    },
    ARCHIVE_SURVEY_MUTATION(state, payload) {
        if (payload.response.statusText = "OK") {
            state.archiveSurveys.unshift(payload.survey);
            state.activeSurveys = state.activeSurveys.filter(e => e.Id !== payload.survey.Id);
        }
    },
    RESTORE_SURVEY_MUTATION(state, payload) {
        if (payload.response.statusText = "OK") {
            state.activeSurveys.unshift(payload.survey);
            state.archiveSurveys = state.archiveSurveys.filter(e => e.Id !== payload.survey.Id);
        }
    },
    DELETE_SURVEY_MUTATION(state, payload) {
        if (payload.response.statusText = "OK") {
            state.activeSurveys = state.activeSurveys.filter(e => e.Id !== payload.survey.Id);
            state.archiveSurveys = state.archiveSurveys.filter(e => e.Id !== payload.survey.Id);
        }
    },
    CHANGE_SURVEY_NAME_MUTATION(state, payload) {
        //console.log(payload);
        if (payload.response.statusText = "OK") {
            payload.survey.Name = payload.newName;
        }
    },
    FETCH_SURVEY_RESULTS_MUTATION(state, results) {
        state.results = results.Data;
        state.surveyResults = SurveyResultsModel.fromJSONArray(results.Data);
    },
    MAKE_SURVEY_RESULTS_PUBLIC_MUTATION(state, response) {
        //console.log(response);  
        if (response.statusText = "OK") {
            state.selectedSurvey.AllowAccessResult = !state.selectedSurvey.AllowAccessResult;
            //console.log('MAKE_SURVEY_RESULTS_PUBLIC_MUTATION', state.selectedSurvey);
        }  
    }
}

export const surveys = {
    state,
    getters,
    actions, 
    mutations
} 

