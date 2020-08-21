import { Component, Input, EventEmitter, Output, OnInit } from "@angular/core";
import * as Survey from "survey-angular";
import * as widgets from "surveyjs-widgets";
import CryptoJS from 'crypto-js';
import { QuizService } from '../../Service/Quizservice';
import { init as initCustomWidget } from "./customwidget";

import { Router, UrlSerializer } from "@angular/router";


widgets.icheck(Survey);
widgets.select2(Survey);
widgets.inputmask(Survey);
widgets.jquerybarrating(Survey);
widgets.jqueryuidatepicker(Survey);
widgets.nouislider(Survey);
widgets.select2tagbox(Survey);
//widgets.signaturepad(Survey);
widgets.sortablejs(Survey);
widgets.ckeditor(Survey);
widgets.autocomplete(Survey);
widgets.bootstrapslider(Survey);
widgets.prettycheckbox(Survey);
//widgets.emotionsratings(Survey);
initCustomWidget(Survey);

Survey.JsonObject.metaData.addProperty("questionbase", "popupdescription:text");
Survey.JsonObject.metaData.addProperty("page", "popupdescription:text");

Survey.StylesManager.applyTheme("default");

@Component({
  // tslint:disable-next-line:component-selector
  selector: "survey",
  template: `<div class="survey-container contentcontainer codecontainer">
    <div id="surveyElement"></div>
  </div>`,
})
export class SurveyComponent implements OnInit {
  @Output() submitSurvey = new EventEmitter<any>();
  @Input()
  json: object;
  result: any;
  count1:any=0;
  studentid;
  constructor(private QuizService: QuizService,private router: Router){
    this.studentid=localStorage.getItem("sid");
  }
  ngOnInit() {
    const surveyModel = new Survey.Model(this.json);
    
    surveyModel.onAfterRenderQuestion.add((survey, options) => {
      if (!options.question.popupdescription) {
        return;
      }      
      // Add a button;
      const btn = document.createElement("button");
      btn.className = "btn btn-info btn-xs";
      btn.innerHTML = "More Info";
      btn.onclick = function () {
        // showDescription(question);
        alert(options.question.popupdescription);
      };      
      const header = options.htmlElement.querySelector("h5");
      const span = document.createElement("span");
      span.innerHTML = "  ";
      header.appendChild(span);
      header.appendChild(btn);
    });
    
    
    surveyModel.onComplete.add((result, options) => {  
          console.log("hello")
      this.submitSurvey.emit(result.data);
      this.result = result.data;

      var updatejson={
        quizid:CryptoJS.AES.decrypt(this.studentid.trim(), 'q').toString(CryptoJS.enc.Utf8),
        submittedans:JSON.stringify(result.data, null, 3)
      }
      this.QuizService.updatestudentsubmitteddata(JSON.stringify(updatejson))
        .subscribe(data => (JSON.parse(JSON.stringify(data))['status']));
    }); 
    if(localStorage.getItem('ReviewOrgJson1')!=undefined && this.router.url.indexOf('/std')==0){
      surveyModel.data= JSON.parse(localStorage.getItem('ReviewOrgJson1'));
      surveyModel.mode = 'display';
      surveyModel
    .onAfterRenderQuestion
    .add(function (survey, options) {
        var span = document.createElement("span");
        var isCorrect = options
            .question
            .isAnswerCorrect();
        span.innerHTML = isCorrect
            ? "Correct"
            : "Incorrect";
        span.style.color = isCorrect
            ? "green"
            : "black";
        var header = options
            .htmlElement
            .querySelector("h5");
        
        if (!isCorrect) {
            header.style.backgroundColor = "salmon";
            var radio = options
                .htmlElement
                .querySelector('input[value="' + options.question.correctAnswer + '"]');
            if (!!radio) {
                radio.parentElement.style.color = "green";
                radio.parentElement.value = "green";
            }
        }
        else{
          header.style.backgroundColor = "greenyellow";
        }
        header.appendChild(span);
    }); 
    }
    else if(localStorage.getItem('Td')!=undefined ){
      surveyModel.mode = 'display';
    }
    
      
    Survey.SurveyNG.render("surveyElement", { model: surveyModel });
  }
}
