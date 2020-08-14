import { Component } from "@angular/core";
import { Router, UrlSerializer } from "@angular/router";
import { QuizService } from '../../../Service/Quizservice';
import json from "../../../assets/survey.json";
import {Directive, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: "StudentQuiz-page",
  templateUrl: "./StudentQuiz.page.html",
  styleUrls: ["./Student.css"],
})
@Directive({
  selector: '[ngInit]'
})
export class StudentQuizPage{
  
  json;
  Studentroute;
  @Input() username;

  @Output('ngInit') initEvent: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.username=localStorage.getItem('studname') ;
    document.getElementById("btnGroupDrop1").innerText=this.username;
  }
  constructor(private QuizService: QuizService,private router: Router) {    
    this.json = JSON.parse(localStorage.getItem("editjson")); 
  
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