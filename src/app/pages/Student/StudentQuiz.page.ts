import { Component } from "@angular/core";
import { Router, UrlSerializer } from "@angular/router";
import { QuizService } from '../../../Service/Quizservice';
import json from "../../../assets/survey.json";
import {Directive, Input, Output, EventEmitter} from '@angular/core';
import { SurveyModel } from 'survey-angular';
import * as Survey from "survey-angular";
import CryptoJS from 'crypto-js';
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
  studentid;

  @Output('ngInit') initEvent: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.username=sessionStorage.getItem('studname') ;
    this.studentid=sessionStorage.getItem("sid")
    document.getElementById("btnGroupDrop1").innerText=this.username;
  }
  constructor(private QuizService: QuizService,private router: Router) {    
    this.json = JSON.parse(sessionStorage.getItem("editjson")); 
  
    if(sessionStorage.getItem("studname")==undefined){
      this.router.navigate(['/'+this.router.url.split('/')[1]])
    }
    setTimeout(()=>{
      sessionStorage.setItem("routeurl",router.url)  
    },500);    
  }
  sendData(result) {
    //TODO update with your own behavior
    const surveyModel = new Survey.Model(this.json);    
  }
  
  logout(){
    sessionStorage.clear();
  }
}