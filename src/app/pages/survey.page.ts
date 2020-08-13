import { Component } from "@angular/core";
import { Router } from '@angular/router';
import json from "../../assets/survey.json";

@Component({
  selector: "survey-page",
  templateUrl: "./survey.page.html",
})
export class SurveyPage {
  json;
  teachername;
  constructor(public router: Router) {
    this.teachername=localStorage.getItem('teachername');
    if(this.teachername==undefined )
    {
      this.logout();
    }else{
      if(localStorage.getItem('jsondata')!=undefined){
        this.json=localStorage.getItem('jsondata');
      }else{
        this.json = json;
      }
    }    
  }
  logout() {
    this.router.navigate(["/"]);
    localStorage.clear();
  }
  sendData(result) {
    //TODO update with your own behavior
    
    console.log(result);
  }
}
