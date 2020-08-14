import { Component } from "@angular/core";
import { Router } from '@angular/router';
import json from "../../assets/survey.json";

import * as SurveyPDF from "survey-pdf";

@Component({
  selector: "survey-page",
  templateUrl: "./survey.page.html",
  styleUrls: ["../app.component.css"],
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
    
    // console.log(result);
    var options = {
      fontSize: 14,
      margins: {
        left: 10,
        right: 10,
        top: 10,
        bot: 10,
      },
    };
    const surveyPDF = new SurveyPDF.SurveyPDF(this.json, options);
    console.log(result);
    surveyPDF.data = JSON.stringify(result);
    surveyPDF.save("survey PDF example");
  }
  savePDF() {
    
  }
}
