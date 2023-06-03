import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
import { SurveyTitle } from '../models/survey';
import { SurveyService } from '../services/survey.service';
import * as alertyfy  from 'alertifyjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-page',
  templateUrl: './survey-page.component.html',
  styleUrls: ['./survey-page.component.css']
})
export class SurveyPageComponent implements OnInit {

  surveyObj: SurveyTitle;
  surveySubmitted:boolean;

  surveyForm = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
  })

  constructor(private surveyService:SurveyService,
    private formBuilder:FormBuilder,
    private router:Router) { }

  ngOnInit() {
    this.surveyForm = this.formBuilder.group({
      title:['',[Validators.required,this.noWhitespaceValidator]],
      description:['',[Validators.required,this.noWhitespaceValidator]]
    });

  }

  onSubmit(){
    console.log(this.surveyForm.value);
    surveySubmitted:true;
    if (this.surveyForm.valid) {
      this.surveyService.registerSurvey(this.surveyData()).subscribe( res =>{
       let ref=document.getElementById('Cancel');
       ref?.click();
       this.surveyForm.reset();
       alertyfy.success("New Survey Created Successfully");
       this.router.navigate(['/']);
      }),error =>{

        console.log(error);
        alertyfy.Fail("Survey not created something went wrong");
      }
  }

  }

surveyData():SurveyTitle {

  return this.surveyObj ={
    title:this.title.value,
    description:this.description.value

  }
}

get title(){
  return this.surveyForm.get('title') as FormControl;
}
get description(){
  return this.surveyForm.get('description') as FormControl;
}
public noWhitespaceValidator(control: FormControl) {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { 'whitespace': true };
}
}
