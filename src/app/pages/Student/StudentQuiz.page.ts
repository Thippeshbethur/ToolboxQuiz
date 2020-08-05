import { Component } from "@angular/core";
import { Router, UrlSerializer } from "@angular/router";
import { QuizService } from '../../../Service/Quizservice';
import json from "../../../assets/survey.json";

@Component({
  selector: "StudentQuiz-page",
  templateUrl: "./StudentQuiz.page.html",
})
export class StudentQuizPage{
  json;
  constructor(private QuizService: QuizService,private router: Router) {    
    this.json = json;        
  }
  sendData(result) {
    //TODO update with your own behavior
    console.log(result);
  }
}