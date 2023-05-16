import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../services/survey.service';
import * as alertyfy  from 'alertifyjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  surveyTitles!:any;
  publishedSurvey:boolean;
  constructor(private surveyService: SurveyService,
    private router:Router) { }

  ngOnInit() {

    this.getAllSurveys();
  }
  getAllSurveys(){
    this.surveyService.getSurveyTitle().subscribe(res=>{
      this.surveyTitles = res;

      console.log(this.surveyTitles);
      if(this.surveyTitles.published === 'yes')
      {
        this.publishedSurvey=true;
      }
    });
  }

  deleteSurvey(row:any){
    this.surveyService.deleteSurvey(row.id).subscribe(res=>{
      alertyfy.success("Survey Deleted Successfully");
      this.getAllSurveys();
    })
   }
   publishSurvey(row:any){
    console.log(row.id);
    this.surveyService.publishSurvey(row.id).subscribe(res=>{
      alertyfy.success("Survey Published Successfully");
      this.getAllSurveys();
    })
   }

   addQuestions(id:any){
    this.router.navigate(['questions/'])
   }


}
