import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SurveyService } from '../services/survey.service';
import {  ResponseSubmit, SurveySubmit } from '../models/survey';
import { FinalResponse } from '../models/finalResponse';
import * as alertyfy  from 'alertifyjs';

@Component({
  selector: 'app-user-view-survey',
  templateUrl: './user-view-survey.component.html',
  styleUrls: ['./user-view-survey.component.css']
})
export class UserViewSurveyComponent implements OnInit {
  surveyId:number;
  //surveyQuestions !: any;
  public surveyQuestions:any=[]

  submitSurvery !:FormGroup;

  userName:string;
  userId:any;
  responseObj:ResponseSubmit[]= [];
  surveyObj:SurveySubmit;
  finalResponseObj:FinalResponse;


  constructor( private surveyService:SurveyService,
    private route: ActivatedRoute,
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private router:Router) { }

    // submitSurvery =new FormGroup({
    //   answer : new  FormControl(''),
    //   quest:new FormControl('')
    // })

  ngOnInit() {

    this.surveyId = +this.route.snapshot.params['id'];
    console.log(this.surveyId);
    this.getSurveyQuestions(this.surveyId);
    this.userName = localStorage.getItem('Name');
    this.userId = this.getUserId(this.userName);
    console.log(this.userName);

    // this.surveyObj.surveyId=this.surveyId;
    // this.surveyObj.userId=28;


  }
  getUserId(userName:string){
    this.authService.getuserid(userName).subscribe(res=>{
        this.userId = res;
        this.surveyObj = {surveyId:this.surveyId,userId:this.userId};
        console.log(this.surveyObj);
        console.log(this.userId);
        return this.userId;

    })
  }

  getSurveyQuestions(surveyId){
    this.surveyService.getSurveyQuestions(surveyId).subscribe((res:any[]) => {
      const questionObj={};
      res.forEach((question, index) => {
        questionObj[question.quest,`answer${index}`] = [''];
       })
      this.submitSurvery = this.formBuilder.group(questionObj);
      this.surveyQuestions = res;
      return this.surveyQuestions;
    });
  }


  onSubmit(){
    //console.log(this.submitSurvery.value);

    this.surveyQuestions.forEach((question, index) =>
    {
      this.responseObj.push({question: question.quest, answer: this.submitSurvery.value[`answer${index}`]})

    //  console.log(question.quest,this.submitSurvery.value[`answer${index}`]);

    })


    this.finalResponseObj = {Survey:this.surveyObj, Response:this.responseObj};
    // this.finalResponseObj.surveyObj = this.surveyObj;

    this.surveyService.submitResponse(this.finalResponseObj).subscribe(res=>{
      alertyfy.success("Survey Submitted Successfully");
    })
    this.router.navigate(['/user/dashboard/']);
    console.log(this.finalResponseObj);



   // console.log(this.responseObj);




    // this.surveyService.submitResponse()


  }







}
