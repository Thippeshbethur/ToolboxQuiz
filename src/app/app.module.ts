import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app.routing.module";
import { AppComponent } from "./app.component";
import { SurveyComponent } from "./components/survey.component";
import { HomePage } from "./pages/home.page";
import { SurveyPage } from "./pages/survey.page";
import { SurveyCreatorComponent } from "./components/survey.creator.component";
import { CreatorPage } from "./pages/creator.page";
import { SurveyAnalyticsComponent } from "./components/survey.analytics.component";
import { AnalyticsPage } from "./pages/analytics.page";
import { PdfExportPage } from "./pages/pdfexport.page";
import {  QuizListingpage } from "./pages/QuizListing.page";
import { Publishpage  } from "./pages/publish.page";
import { Genrateurlpage  } from "./pages/Generateurl.page";
import { DeleteQuizpage  } from "./pages/DeleteQuiz.page";
import { LoginPage  } from "./pages/login.page";
import { LoginNavPage  } from "./pages/Loginnavigator.page";
import {  StudenthomePage } from "./pages/Student/studenthome.page";
import {  StudentQuizPage } from "./pages/Student/StudentQuiz.page";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { MomentModule } from 'angular2-moment';
import { StudentdashboardPage } from "./pages/Student/Studentdashboard.page";
import { StudentreportPage } from "./pages/Studentreport.page";
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatCommonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatLineModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatOptionModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatPseudoCheckboxModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,MatPaginatorIntl
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    SurveyComponent,
    SurveyPage,
    SurveyCreatorComponent,
    CreatorPage,
    SurveyAnalyticsComponent,
    AnalyticsPage,LoginNavPage,LoginPage,StudentdashboardPage,StudentreportPage,
    PdfExportPage,QuizListingpage,StudenthomePage,StudentQuizPage,Publishpage,Genrateurlpage,DeleteQuizpage
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule,BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatCommonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatLineModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatOptionModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatPseudoCheckboxModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule],
    entryComponents:[Publishpage,Genrateurlpage,DeleteQuizpage],
  providers: [{provide: MatPaginatorIntl, useClass: AppComponent }],
  bootstrap: [AppComponent],
})
export class AppModule {}
