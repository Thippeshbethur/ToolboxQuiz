import { Component } from "@angular/core";

import json from "../../assets/survey.json";

@Component({
  selector: "survey-page",
  templateUrl: "./survey.page.html",
})
export class SurveyPage {
  json;

  constructor() {
    if(localStorage.getItem('jsondata')!=undefined){
      this.json=localStorage.getItem('jsondata');
    }else{
      this.json = json;
    }
  }

  sendData(result) {
    //TODO update with your own behavior
    console.log(result);
  }
}
