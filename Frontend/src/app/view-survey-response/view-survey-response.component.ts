import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../services/survey.service';

@Component({
  selector: 'app-view-survey-response',
  templateUrl: './view-survey-response.component.html',
  styleUrls: ['./view-survey-response.component.css']
})
export class ViewSurveyResponseComponent implements OnInit {

  surveyTitles!:any;
  submittedSurveyId:number;
  constructor(private surveyService: SurveyService,  private route: ActivatedRoute) { }
  surveyResponseQuestions!:any;

  ngOnInit() {
    this.submittedSurveyId = +this.route.snapshot.params['id'];
    this.getResults();
  }

  getResults(){
    this.surveyService.getSurveyReponse(this.submittedSurveyId).subscribe(res=>{
      this.surveyResponseQuestions = res;
      console.log(this.surveyResponseQuestions)
    });
  }
}
