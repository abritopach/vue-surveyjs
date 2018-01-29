import axios from 'axios';

class SurveyService {

    private readonly api = 'https://dxsurvey.com/api/MySurveys/';
    private readonly ownerId: string = encodeURI("ownerId");
    private readonly accessKey: string = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

    constructor() {
        console.log("Hello SurveyService");
    }

    // Returns the list of active surveys.
    getActiveSurveys() {
        return axios.get(this.api + 'getActive?ownerId=' + this.ownerId + '&accessKey=' + this.accessKey);
    }

    // Returns the list of archive surveys.
    getArchiveSurveys() {
        return axios.get(this.api + 'getArchive?ownerId=' + this.ownerId + '&accessKey=' + this.accessKey);
    }

    // Create a new survey.
    createSurvey(name: string) {
        return axios.get(this.api + 'create?ownerId=' + this.ownerId + '&accessKey=' + this.accessKey + '&name=' + encodeURI(name));
    }

    // Returns survey results.
    getSurveyResults(idSurvey: any) {
        return axios.get(this.api + 'getSurveyResults/' + idSurvey + '?accessKey=' + this.accessKey);
    }
}

// Export a singleton instance in the global namespace.
export const surveyService = new SurveyService();

