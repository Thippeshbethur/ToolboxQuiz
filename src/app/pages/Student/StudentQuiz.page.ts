import { Component } from "@angular/core";
import { Router, UrlSerializer } from "@angular/router";
import { QuizService } from '../../../Service/Quizservice';
import json from "../../../assets/survey.json";

@Component({
  selector: "StudentQuiz-page",
  templateUrl: "./StudentQuiz.page.html",
})
export class StudentQuizPage{
  public username;
  json;
  Studentroute;
  
  constructor(private QuizService: QuizService,private router: Router) {    
    this.json = json;   
    this.username=localStorage.getItem('studname');
    
    if(localStorage.getItem("studname")==undefined){
      this.router.navigate(['/'+this.router.url.split('/')[1]])
    }
    setTimeout(()=>{
      localStorage.setItem("routeurl",router.url)  
    },500);    
  }
  sendData(result) {
    //TODO update with your own behavior
    console.log(result);
  }
  logout(){
    localStorage.clear();
  }
}