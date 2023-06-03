import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../services/survey.service';

@Component({
  selector: 'app-view-survey-results',
  templateUrl: './view-survey-results.component.html',
  styleUrls: ['./view-survey-results.component.css']
})
export class ViewSurveyResultsComponent implements OnInit {


  surveyTitles!:any;
  constructor(private surveyService: SurveyService) { }

  ngOnInit() {
    this.getResults();
  }

  getResults(){
    this.surveyService.getSubmittedSurveyDetails().subscribe(res=>{
      this.surveyTitles = res;
      console.log(this.surveyTitles)
    });
  }
}
