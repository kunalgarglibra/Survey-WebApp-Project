import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SurveyQuestions, SurveyTitle } from '../models/survey';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
baseUrl = environment.baseUrl;

constructor(private http:HttpClient) { }


registerSurvey(survey:SurveyTitle){
  return this.http.post(this.baseUrl + '/surveyadmin/addsurvey',survey);
}

getSurveyTitle(){
  return this.http.get(this.baseUrl + '/surveyadmin/getsurveys');
}

deleteSurvey(id:any){
  return this.http.delete(this.baseUrl + '/surveyadmin/deletesurvey/'+id);
}

publishSurvey(id:any){
  return this.http.put(this.baseUrl +'/surveyadmin/publishSurvey/'+id,id);
}

getPublishedSurveys()
{
  return this.http.get(this.baseUrl + '/surveyadmin/getpublishedsurveys/');
}


addQuestions(surveyQues:SurveyQuestions,id){
  return this.http.post(this.baseUrl +'/surveyadmin/addquestion/'+id,surveyQues);
}

getSurveyQuestions(id:any){
  return this.http.get(this.baseUrl + '/surveyadmin/getquestions/'+id);
}

updateSurveyQuestion(id:any,data:any){
  return this.http.put<any>(this.baseUrl + '/surveyadmin/updateQuestion/'+id,data);
}

deleteSurveyQuestion(id:any){
  return this.http.delete(this.baseUrl + '/surveyadmin/deletequestion/'+id);
}

submitResponse(data:any){
  return this.http.post(this.baseUrl +'/user/submitsurvey/',data);
}

getSubmittedSurveyDetails(){
  return this.http.get(this.baseUrl +'/surveyadmin/getReport/submittedSurveys');
}

getSurveyReponse(submittedSurveyId:any){
  return this.http.get(this.baseUrl + '/surveyadmin/getReport/SubmittedResponses/'+submittedSurveyId);
}

getUserSubmittedStatus(userId:number){
  return this.http.get(this.baseUrl + '/surveyadmin/getUserSubmittedStatus/'+userId);
}

getUserCount(): Observable<number>{
  return this.http.get<number>(this.baseUrl + '/count/getusers/');
}

getTotalSurveyCount(): Observable<number>{
  return this.http.get<number>(this.baseUrl + '/count/getTotalSurveys/');
}

getPublishedSurveyCount(): Observable<number>{
  return this.http.get<number>(this.baseUrl + '/count/getPublishedSurveys');
}

getSubmittedSurveyCount(): Observable<number>{
  return this.http.get<number>(this.baseUrl + '/count/getSubmittedSurveys');
}

getuserid(name: string): Observable<number> {
  return this.http.get<number>(this.baseUrl + '/useradmin/matchuser/' + name);
}
}
