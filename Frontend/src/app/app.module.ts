import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { AdminLoginComponent } from './Admin-login/Admin-login.component';
import { AuthService } from './services/auth.service';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { SurveyPageComponent } from './survey-page/survey-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ViewSurveyComponent } from './view-survey/view-survey.component';
import { UserViewSurveyComponent } from './user-view-survey/user-view-survey.component';
import { PublishedSurveysComponent } from './published-surveys/published-surveys.component';
import { ViewSurveyResultsComponent } from './view-survey-results/view-survey-results.component';
import { ViewSurveyResponseComponent } from './view-survey-response/view-survey-response.component';
import { AnalyticsComponent } from './analytics/analytics.component';

const appRoutes: Routes = [
  { path: 'user/login', component: UserLoginComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/user/dashboard', component: UserDashboardComponent},
  { path: 'survey', component: SurveyPageComponent},
  { path: 'admin/home', component: AdminHomeComponent},
  { path: '', component: LandingPageComponent},
  { path: 'admin/home', component: AdminHomeComponent},
  { path: 'view/survey/questions/:id', component: ViewSurveyComponent},
  { path: 'user/dashboard', component: PublishedSurveysComponent},
  { path: 'user/survey/questions/:id', component: UserViewSurveyComponent},
  { path: 'admin/results', component: ViewSurveyResultsComponent},
  { path: 'admin/results/view/:id', component: ViewSurveyResponseComponent},
  { path: 'admin/analytics', component: AnalyticsComponent}


];

@NgModule({
  declarations: [
      AppComponent,
      NavBarComponent,
      UserLoginComponent,
      AdminLoginComponent,
      UserDashboardComponent,
      SurveyPageComponent,
      AdminHomeComponent,
      LandingPageComponent,
      AdminHomeComponent,
      ViewSurveyComponent,
      UserViewSurveyComponent,
      PublishedSurveysComponent,
      ViewSurveyResultsComponent,
      ViewSurveyResponseComponent,
      AnalyticsComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,


  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
