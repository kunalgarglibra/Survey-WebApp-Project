import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormControl, FormGroup,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyQuestions } from '../models/survey';
import { SurveyService } from '../services/survey.service';
import * as alertyfy  from 'alertifyjs';


@Component({
  selector: 'app-view-survey',
  templateUrl: './view-survey.component.html',
  styleUrls: ['./view-survey.component.css']
})
export class ViewSurveyComponent implements OnInit {

  surveyId:number;
  surveyQuestions !: any;
  currentQuestionId:number;
  questionObj: SurveyQuestions;
  showAdd!:boolean;
  showUpdate!:boolean;
  editMode!:boolean;
  questionSubmitted:boolean;
  surveyEmpty:boolean;
  editQuestion!:FormGroup;

  constructor( private router :Router,
    private formBuilder:FormBuilder,
    private route: ActivatedRoute,
    private surveyService:SurveyService,) { }

  ngOnInit() {
    this.surveyId = +this.route.snapshot.params['id'];
    this.editQuestion= this.formBuilder.group({
      quest:['',[Validators.required,this.noWhitespaceValidator]],
      option1:['',[Validators.required,this.noWhitespaceValidator]],
      option2:['',[Validators.required,this.noWhitespaceValidator]],
      option3:[''],
      option4:['']

    })
    this.getSurvey(this.surveyId);
    //console.log(this.surveyId);
  }

  //boolean method for dynamic button changing
  clickAddQuestion(){
    this.editQuestion.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  //Display All Questions
  getSurvey(surveyId){
    this.surveyService.getSurveyQuestions(surveyId).subscribe(res=>{
      this.surveyQuestions = res;
      if(this.surveyQuestions.length === 0)
      {
        this.surveyEmpty = true;
      }
      return this.surveyQuestions

    });

  }
//Publish Survey
  publishSurvey(surveyId:number){
    console.log(surveyId);
    this.surveyService.publishSurvey(surveyId).subscribe(res=>{
      alertyfy.success("Survey Published Successfully");
      this.router.navigate(['/admin/home'])

    })
   }

  //Adding new question to the selected Survey
  addNextQues(){
    console.log(this.surveyId);
    this.questionSubmitted=true;
    if (this.editQuestion.valid) {
         this.surveyService.addQuestions(this.AddQuestions(),this.surveyId).subscribe( res =>{
              let ref=document.getElementById('Cancel');
              ref?.click();
              this.editQuestion.reset();
              alertyfy.success('Question  Added');
              this.getSurvey(this.surveyId);

      }),error =>{

        console.log(error);
        alertyfy.Fail("Question Not added");
      }
  }

  }

  AddQuestions():SurveyQuestions{

    return this.questionObj ={
      quest:this.quest.value,
      option1:this.option1.value,
      option2:this.option2.value,
      option3:this.option3.value,
      option4:this.option4.value,
    }

  }

  //Display Selected question edit form
  onEdit(row:any){
    this.showAdd =false;
    this.showUpdate=true;
    this.editMode=true;
     this.currentQuestionId =row.id;
     console.log(this.currentQuestionId);
     this.questionUpdateData(this.currentQuestionId);
    // //To get the values on the Update page
    this.editQuestion.controls['quest'].setValue(row.quest);
    this.editQuestion.controls['option1'].setValue(row.option1);
    this.editQuestion.controls['option2'].setValue(row.option2);
    this.editQuestion.controls['option3'].setValue(row.option3);
    this.editQuestion.controls['option4'].setValue(row.option4);
  }

  // getting values of selected question to edit form
  questionUpdateData(currentQuestionId:number):SurveyQuestions{
    return this.questionObj ={
      id:this.currentQuestionId,
      quest:this.quest.value,
      option1:this.option1.value,
      option2:this.option2.value,
      option3:this.option3.value,
      option4:this.option4.value,
  }
}

//Calling Update API to update the question
updateQuestion(){

  if(this.editQuestion.valid)
  {
    console.log(this.questionUpdateData(this.currentQuestionId));
    this.surveyService.updateSurveyQuestion(this.currentQuestionId,this.questionUpdateData(this.currentQuestionId)).subscribe(res=>{
      alertyfy.success("Question Updated Successfully");
      let ref=document.getElementById('Cancel');
      ref?.click();
      this.editQuestion.reset();
      this.getSurvey(this.surveyId);
    }),error =>{

      console.log(error);
      alertyfy.Fail("Question Not Updated");
    };
  }

}

//Delete the selected question from the survey

deleteQuestion(row:any){
  this.surveyService.deleteSurveyQuestion(row.id).subscribe(res =>{
    alertyfy.success("Question Deleted Successfully");
    this.getSurvey(this.surveyId);
  })
}

//Reset the form
onReset(){
  this.questionSubmitted = false;
  this.editQuestion.reset();
}


//getters methods
get quest(){
  return this.editQuestion.get('quest') as FormControl;
}
get option1(){
  return this.editQuestion.get('option1') as FormControl;
}
get option2(){
  return this.editQuestion.get('option2') as FormControl;
}
get option3(){
  return this.editQuestion.get('option3') as FormControl;
}
get option4(){
  return this.editQuestion.get('option4') as FormControl;
}

public noWhitespaceValidator(control: FormControl) {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { 'whitespace': true };
}
}
