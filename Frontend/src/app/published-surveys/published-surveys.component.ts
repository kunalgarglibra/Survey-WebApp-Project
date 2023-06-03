import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SurveyService } from '../services/survey.service';

@Component({
  selector: 'app-published-surveys',
  templateUrl: './published-surveys.component.html',
  styleUrls: ['./published-surveys.component.css'],
})
export class PublishedSurveysComponent implements OnInit {
  surveyTitles: any[];
  publishedSurvey: string;
  SurveyList: boolean;
  userDetails!: any;
  userId: any;
  userName: string;
  constructor(
    private surveyService: SurveyService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userName = localStorage.getItem('Name');
    console.log(this.userName);
    this.userId = this.getUserId(this.userName);
    this.getPublishedSurvey();
  }

  getUserId(name: string) {
    this.authService.getuserid(name).subscribe((res) => {
      this.userId = res;
      console.log(this.userId);
      return this.userId;
    });
  }

  getPublishedSurvey() {
    this.authService.getuserid(this.userName).subscribe((userId) => {
      this.surveyService.getPublishedSurveys().subscribe((res: any[]) => {
        this.surveyTitles = res;
        if (this.surveyTitles.length === 0) {
          this.SurveyList = true;
        } else {
          this.surveyService
            .getUserSubmittedStatus(userId)
            .subscribe((submits: any[]) => {
              this.surveyTitles.forEach((survey) => {
                if (submits.find((submit) => submit.surveyid == survey.id)) {
                  survey.submitted = true;
                }
              });
              console.table(this.surveyTitles);
            });
        }
      });
    });
  }

  clicked = false;

  actionMethod() {
    console.log('actionMethod was called!');
  }
}
