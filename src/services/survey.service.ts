import axios from 'axios';

class SurveyService {

    private readonly api = 'https://dxsurvey.com/api/MySurveys/';
    private readonly ownerId: string = encodeURI("adrbrpa1988@gmail.com");
    private readonly accessKey: string = "9e68b59e90e1425c9b58d64a352b0d00";

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

    // Archive the survey by it's id. All survey results will be still accessible. You have to delete a survey to remove the access to it's results.
    archiveSurvey(idSurvey: any) {
        return axios.get(this.api + 'archive/' + idSurvey + '?accessKey=' + this.accessKey);
    }

    // Restore an archive survey by it's id.
    restoreSurvey(idSurvey: any) {
        return axios.get(this.api + 'restore/' + idSurvey + '?accessKey=' + this.accessKey);
    }

    // Delete a survey by it's id. You will not be able to restore this survey. The survey results become inaccessible.
    deleteSurvey(idSurvey: any) {
        return axios.get(this.api + 'delete/' + idSurvey + '?accessKey=' + this.accessKey);
    }

    // Change the survey name.
    changeSurveyName(idSurvey: any, newName: any) {
        return axios.get(this.api + 'changeName/' + idSurvey + '?accessKey=' + this.accessKey + '&name=' + encodeURI(newName));
    }

    // Enable or disable the ability to view survey results by non autorized user via direct link.
    makeSurveyResultsPublic(idSurvey: string, makeResultPublic: boolean) {
        return axios.get(this.api + 'makeResultPublic/' + idSurvey + '?accessKey=' + this.accessKey + '&makeResultPublic=' + makeResultPublic);
    }
}

// Export a singleton instance in the global namespace.
export const surveyService = new SurveyService();

