import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Options } from "highcharts";
import { Subject } from 'rxjs';
import { SurveyService } from '../services/survey.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  constructor(private surveyService: SurveyService) { }
    // Variables
    totalSurveyCount:any = 13;
    totalUserCount:any = 1;
    publishedSurveyCount:any = 8;
    submittedSurveyCount:any = 35;

  ngOnInit() {
    var chart = Highcharts.chart("container", this.chartOptions );
    this.submittedSurveyCount=this.getSubmittedSurveys();
    console.log(this.submittedSurveyCount);
    var subject = new Subject<number>();
    this.surveyService.getUserCount().subscribe(res =>{
      this.totalUserCount = res;
    })

    this.surveyService.getTotalSurveyCount().subscribe((res) =>{
      this.totalSurveyCount = res;
      console.log(this.totalSurveyCount);
      subject.next(this.totalSurveyCount);
      return subject.asObservable();
    })
    this.totalSurveyCount.subscribe((r)=>console.log(r))

    this.surveyService.getSubmittedSurveyCount().subscribe(res =>{
      this.submittedSurveyCount = res;
    })

    this.surveyService.getPublishedSurveyCount().subscribe(res =>{
      this.publishedSurveyCount = res;
    })
  }

  getSubmittedSurveys(){
    this.surveyService.getSubmittedSurveyCount().subscribe(res =>{
      this.submittedSurveyCount = res;
      return this.submittedSurveyCount;
    })
  }

  Highcharts: typeof Highcharts = Highcharts;
  count = [this.totalSurveyCount];

  chartOptions: Highcharts.Options = {
      chart: {
        type: 'column'
      },
    title: {
      align: 'left',
      text: 'Survey Analytics'
    },
    accessibility: {
      announceNewData: {
        enabled: true
      }
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      title: {
        text: 'Number of Surveys/Users'
      }

    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y:.1f}%'
        }
      }
    },

    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },

    series: [
      {
        name: "Browsers",
        colorByPoint: true,
        type: 'column',
        data: [
          {
            name: "Total Surveys",
            y: this.totalSurveyCount
          },
          {
            name: "Published Surveys",
            y: this.publishedSurveyCount
          },
          {
            name: "Submitted Surveys",
            y: this.submittedSurveyCount
          },
          {
            name: "Users",
            y: this.totalUserCount
          }
        ]
      }
    ]
  }
}
