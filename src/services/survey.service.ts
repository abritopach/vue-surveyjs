import axios from 'axios';

class SurveyService {

    private instance: any;
    private readonly baseURL = 'https://dxsurvey.com/api/MySurveys/';
    private readonly ownerId: string = encodeURI("adrbrpa1988@gmail.com");
    private readonly accessKey: string = "9e68b59e90e1425c9b58d64a352b0d00";

    constructor() {
        console.log("Hello SurveyService");
        this.instance = axios.create({
            baseURL: this.baseURL,
            timeout: 5000,
            params: {
                accessKey: this.accessKey
              }
          });
    }

    // Returns the list of active surveys.
    getActiveSurveys() {
        return this.instance.get('getActive?ownerId=' + this.ownerId).catch((error: any) => {
            this.handlerError(error);
        });
    }

    // Returns the list of archive surveys.
    getArchiveSurveys() {
        return this.instance.get('getArchive?ownerId=' + this.ownerId).catch((error: any) => {
            this.handlerError(error);
        });
    }

    // Create a new survey.
    createSurvey(name: string) {
        return this.instance.get('create?ownerId=' + this.ownerId + '&name=' + encodeURI(name)).catch((error: any) => {
            this.handlerError(error);
        });
    }

    // Returns survey results.
    getSurveyResults(idSurvey: any) {
        return this.instance.get('getSurveyResults/' + idSurvey).catch((error: any) => {
            this.handlerError(error);
        });
    }

    // Archive the survey by it's id. All survey results will be still accessible. You have to delete a survey to remove the access to it's results.
    archiveSurvey(idSurvey: any) {
        return this.instance.get('archive/' + idSurvey).catch((error: any) => {
            this.handlerError(error);
        });
    }

    // Restore an archive survey by it's id.
    restoreSurvey(idSurvey: any) {
        return this.instance.get('restore/' + idSurvey).catch((error: any) => {
            this.handlerError(error);
        });
    }

    // Delete a survey by it's id. You will not be able to restore this survey. The survey results become inaccessible.
    deleteSurvey(idSurvey: any) {
        return this.instance.get('delete/' + idSurvey).catch((error: any) => {
            this.handlerError(error);
        });
    }

    // Change the survey name.
    changeSurveyName(idSurvey: any, newName: any) {
        return this.instance.get('changeName/' + idSurvey + '?name=' + encodeURI(newName)).catch((error: any) => {
            this.handlerError(error);
        });
    }

    // Enable or disable the ability to view survey results by non autorized user via direct link.
    makeSurveyResultsPublic(idSurvey: string, makeResultPublic: boolean) {
        return this.instance.get('makeResultPublic/' + idSurvey + '?makeResultPublic=' + makeResultPublic).catch((error: any) => {
            this.handlerError(error);
        });
    }

    handlerError(error: any) {
        if (error.response) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx.
            console.log({title: 'Error'}, error.response.data, error.response.status, error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the
            // browser and an instance of http.ClientRequest in node.js.
            console.log({title: 'Error', }, error.request);
            // console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error.
            console.log('Error', error.message);
        }
        // console.log(error.config);
    }
    
}

// Export a singleton instance in the global namespace.
export const surveyService = new SurveyService();

