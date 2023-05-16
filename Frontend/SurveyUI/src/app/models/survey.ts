export interface SurveyTitle {
  title?:string;
  description?:string;
  published?:string;
  id?:number;

}

export interface SurveyQuestions {

  quest?:string;
  id?:number;
  surveyid?:number;
  option1?:string;
  option2?:string;
  option3?:string;
  option4?:string;


}

export interface ResponseSubmit{
  question?:string;
  answer?:string;

}

export interface SurveySubmit{

  surveyId?:number;
  userId?:number;
}





