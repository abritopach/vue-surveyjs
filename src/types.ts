// Store
export interface State {
    activeSurveys: SurveyModel[],
    archiveSurveys: SurveyModel[],
    surveyResults: SurveyResultsModel[],
    results: any[]
}

// Models
export class SurveyModel {
    AllowAccessResult: boolean;
    CreatedAt: string;
    CreatorId: string;
    Id: string;
    IsArchived: boolean;
    IsPublished: boolean;
    Name: string;
    PostId: string;
    PublishId: string;
    ResultId: string;
    StoreIPAddress: boolean;
    UseCookies: boolean;
    UserId: string;
    Image: string;

    defaultImages = [
        "https://flexsurveys.com/wp-content/uploads/FlexSurveysEmployeeEngagementSurvey-Trans.png",
        "https://static.e-encuesta.com/wp-content/uploads/satisfaccion-cliente-v6.png",
        "http://www.redcresearch.ie/wp-content/uploads/2015/12/14.png",
        "http://www.redcresearch.ie/wp-content/uploads/2015/12/30.png"
    ];

     // Copy constructor.
     constructor(obj: SurveyModel) {
        this.AllowAccessResult = obj['AllowAccessResult'];
        this.CreatedAt = obj['CreatedAt'];
        this.CreatorId = obj['CreatorId'];
        this.Id = obj['Id'];
        this.IsArchived = obj['IsArchived'];
        this.IsPublished = obj['IsPublished'];
        this.Name = obj['Name'];
        this.PostId = obj['PostId'];
        this.PublishId = obj['PublishId'];
        this.ResultId = obj['ResultId'];
        this.StoreIPAddress = obj['StoreIPAddress'];
        this.UseCookies = obj['UseCookies'];
        this.UserId = obj['UserId'];
        this.Image = obj['Image'] || this.defaultImages[SurveyModel.getRandomNumber()];
    }

    // New static method.
    static fromJSONArray(array: Array<SurveyModel>): SurveyModel[] {
        return array.map(obj => new SurveyModel(obj)
    )}

    static getRandomNumber() {
        return Math.floor(Math.random() * 4);
    }
}

export class UserAnswerModel {
    idQuestion: string;
    textQuestion: string;
    value: string;

    constructor(idQuestion: any, textQuestion: any, value: any) {
        this.idQuestion = idQuestion;
        this.textQuestion = textQuestion;
        this.value = value;
    }
}

export class SurveyResultsModel {
    happendAt: string;
    iPAddress: string;
    userAnswers: UserAnswerModel[] = [];

    constructor(obj: any) {
        this.happendAt = obj["HappendAt"];
        this.iPAddress = obj["IPAddress"];
        this.userAnswers = SurveyResultsModel.setUsersAnswers(obj);
    }

    // New static method.
    static fromJSONArray(array: Array<any>): SurveyResultsModel[] {
        return array.map(obj =>
            new SurveyResultsModel(obj)
    )}

    static setUsersAnswers(obj: any): UserAnswerModel[] {
        let index = 1;
        let usersAnswers: UserAnswerModel[] = [];
        for(let key in obj) {
            let value = obj[key];
            //console.log("key: " + key + " value: " + value); 
            if ((key != "HappendAt") && (key != "IPAddress")) {
                let userAnswerModel = new UserAnswerModel('P' + index, key, value.toString());
                usersAnswers.push(userAnswerModel);
                index++;
            }
        }
        return usersAnswers;
    }

}