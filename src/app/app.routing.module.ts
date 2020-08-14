import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePage } from "./pages/home.page";
import { SurveyPage } from "./pages/survey.page";
import { CreatorPage } from "./pages/creator.page";
import { AnalyticsPage } from "./pages/analytics.page";
import { PdfExportPage } from "./pages/pdfexport.page";
import { QuizListingpage } from "./pages/QuizListing.page";
import { LoginPage } from "./pages/login.page";
import { LoginNavPage } from "./pages/Loginnavigator.page";
import { StudentreportPage } from "./pages/Studentreport.page";
import { StudenthomePage } from "./pages/Student/studenthome.page";
import { StudentQuizPage } from "./pages/Student/StudentQuiz.page";
import { StudentdashboardPage } from "./pages/Student/Studentdashboard.page";

const routes: Routes = [
  { path: "", component: LoginNavPage },
  { path: "login", component: LoginPage },
  { path: "home", component: HomePage },
  { path: "survey", component: SurveyPage },
  { path: "creator", component: CreatorPage },
  { path: "analytics", component: AnalyticsPage },
  { path: "pdfexport", component: PdfExportPage },
  { path: "quizlist", component: QuizListingpage },
  { path: "std", component: StudentreportPage },
  { path: "StudentdashboardPage", component: StudentdashboardPage },
  { path: ":id", component: StudenthomePage },
  { path: ":id/student", component: StudentQuizPage }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
