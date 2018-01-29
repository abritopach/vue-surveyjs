// Store
export interface State {
    activeSurveys: Surveys[],
    archiveSurveys: Surveys[],
    surveyResults: any[]
}

// Models
export interface Surveys {
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
}