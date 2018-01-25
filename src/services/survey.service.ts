import axios from 'axios';

class SurveyService {

    private readonly api = 'https://dxsurvey.com/api/MySurveys/';
    private readonly ownerId: string = encodeURI("adrbrpa1988@gmail.com");
    private readonly accessKey: string = "f47de3af88e344d6a27300a2f2e4a7c1";

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
}

// Export a singleton instance in the global namespace.
export const surveyService = new SurveyService();

