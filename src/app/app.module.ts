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
import {  StudenthomePage } from "./pages/Student/studenthome.page";
import {  StudentQuizPage } from "./pages/Student/StudentQuiz.page";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule, MatButtonModule,MatTabsModule,MatInputModule} from '@angular/material'
import {ReactiveFormsModule} from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSnackBarModule } from "@angular/material";
import {MatDialogModule} from "@angular/material";
import {  MatDatepickerModule, MatNativeDateModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    SurveyComponent,
    SurveyPage,
    SurveyCreatorComponent,
    CreatorPage,
    SurveyAnalyticsComponent,
    AnalyticsPage,
    PdfExportPage,QuizListingpage,StudenthomePage,StudentQuizPage,Publishpage,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule,BrowserAnimationsModule,MatTabsModule, MatMenuModule,MatPaginatorModule, MatButtonModule,MatSnackBarModule,
    FormsModule,MatDialogModule,MatInputModule,MatDatepickerModule,MatNativeDateModule,
    ReactiveFormsModule],
    entryComponents:[Publishpage],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
