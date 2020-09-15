import { Component, Input, EventEmitter, Output, OnInit } from "@angular/core";
import * as Survey from "survey-angular";
import * as widgets from "surveyjs-widgets";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import CryptoJS from 'crypto-js';
import { QuizService } from '../../Service/Quizservice';
import { init as initCustomWidget } from "./customwidget";
import { Router, UrlSerializer } from "@angular/router";
import * as SurveyPDF from "survey-pdf";


widgets.icheck(Survey);
widgets.select2(Survey);
widgets.inputmask(Survey);
widgets.jquerybarrating(Survey);
widgets.jqueryuidatepicker(Survey);
widgets.nouislider(Survey);
widgets.select2tagbox(Survey);
widgets.sortablejs(Survey);
widgets.ckeditor(Survey);
widgets.autocomplete(Survey);
widgets.bootstrapslider(Survey);
widgets.prettycheckbox(Survey);
initCustomWidget(Survey);

Survey.JsonObject.metaData.addProperty("questionbase", "popupdescription:text");
Survey.JsonObject.metaData.addProperty("page", "popupdescription:text");
Survey
  .JsonObject
  .metaData
  .addProperty("question", { name: "score1:number" });

Survey.JsonObject.metaData.addProperty("itemvalue", { name: "score1:number" });

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
  count1: any = 0;
  studentid;
  totquizscore = 0;
  studentscoretotal = 0;

  public marks1 = [];

  constructor(private QuizService: QuizService, private router: Router, private http: HttpClient) {
    this.studentid = sessionStorage.getItem("sid");

  }
  ngOnInit() {

    const surveyModel = new Survey.Model(this.json);
    const surveyModel1 = new Survey.Model(this.json);


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
      this.submitSurvey.emit(result.data);
      var marksdata = this.calculatemarks(this.json, options, result.data, surveyModel);
      var totalScore = 0;
      var data = result.data;
      console.log(marksdata)
      Object.keys(data).forEach(function (qName) {
        var question = surveyModel.getQuestionByName(qName);
        var qValue = data[qName];
        var questionno = qName.split("question")[1];
        var questionmarks = marksdata[(parseInt(questionno) - 1)]["marks"];
        if (JSON.stringify(question.correctAnswer) == JSON.stringify(data[qName])) {
          totalScore += +questionmarks;
        }
      });
      var updatejson = {
        quizid: CryptoJS.AES.decrypt(this.studentid.trim(), 'q').toString(CryptoJS.enc.Utf8),
        submittedans: JSON.stringify(result.data, null, 3),
        Percentage: (totalScore / this.totquizscore) * 100,
        Score:totalScore+'/'+this.totquizscore,
        Submitteddate:new Date().toLocaleString()
      }
      this.QuizService.updatestudentsubmitteddata(JSON.stringify(updatejson))
        .subscribe(data => (JSON.parse(JSON.stringify(data))['status']));
      surveyModel1.data = result.data;
    });
    surveyModel.onCompleting.add((survey, options) => {
      surveyModel1.mode = 'display';
      var marksdata1 = this.calculatemarks(this.json, options, surveyModel1.data, surveyModel1)
      var node = document.createElement("span");
      var totmarks = 0;
      var studmarks = 0;
      node.style.cssFloat = "right";
      node.style.fontWeight = "600";
      surveyModel1
        .onAfterRenderQuestion
        .add(function (survey, options) {
          setTimeout(function () {
            var qnoval = options.question.name.split("question")[1];
            var span = document.createElement("span");


            var isCorrect = options
              .question
              .isAnswerCorrect();
            span.innerHTML = isCorrect
              ? "(Correct) &nbsp; &nbsp;" + marksdata1[parseInt(qnoval) - 1]["marks"] + " Out Of " + marksdata1[parseInt(qnoval) - 1]["marks"] + "&nbsp; &nbsp;"
              : "(Incorrect) &nbsp; &nbsp;" + 0 + " Out Of " + marksdata1[parseInt(qnoval) - 1]["marks"];
            span.style.color = isCorrect
              ? "green"
              : "black";
            span.style.cssFloat = "right";
            span.style.padding = "2px";
            var header = options
              .htmlElement
              .querySelector("h5");
            var jsonobj = JSON.parse(sessionStorage.getItem('editjson'))["pages"][0]["elements"];
            header.style.padding = "10px";
            if (!isCorrect) {
              header.style.backgroundColor = "salmon";
              var radio = options
                .htmlElement
                .querySelector('input[value="' + options.question.correctAnswer + '"]');
              totmarks = totmarks + parseInt(marksdata1[parseInt(qnoval) - 1]["marks"]);
              if (!!radio) {
                radio.parentElement.style.color = "green";
                radio.parentElement.value = "green";
              }
            }
            else {
              var qnv = options.question.name.split("question")[1];
              if (JSON.stringify(survey.data[options.question.name]) == JSON.stringify(jsonobj[parseInt(qnv) - 1]["correctAnswer"])) {
                studmarks = studmarks + parseInt(marksdata1[parseInt(qnoval) - 1]["marks"]);
                totmarks = totmarks + parseInt(marksdata1[parseInt(qnoval) - 1]["marks"]);
                span.innerHTML = "(Correct) &nbsp; &nbsp;" + marksdata1[parseInt(qnoval) - 1]["marks"] + " Out Of " + marksdata1[parseInt(qnoval) - 1]["marks"] + "&nbsp; &nbsp;"
                header.style.backgroundColor = "greenyellow";
              }
              else {
                span.innerHTML = "(Incorrect) &nbsp; &nbsp;" + 0 + " Out Of " + marksdata1[parseInt(qnoval) - 1]["marks"];
                header.style.backgroundColor = "salmon";
                totmarks = totmarks + parseInt(marksdata1[parseInt(qnoval) - 1]["marks"]);
                span.style.color = "black"
              }

            }

            node.innerHTML = "Total Quiz Marks: " + studmarks + " Out Of " + totmarks;
            document.getElementById("descriptiondiv").appendChild(node);

            header.appendChild(span);
          }, 100)

        });
      Survey.SurveyNG.render("surveyResult", { model: surveyModel1 });

    })
    if (sessionStorage.getItem('ReviewOrgJson1') != undefined && this.router.url.indexOf('/std') == 0) {
      surveyModel.data = JSON.parse(sessionStorage.getItem('ReviewOrgJson1'));
      var marksdata1 = this.calculatemarks1(this.json, surveyModel.data)
      var node = document.createElement("span");
      var totmarks = 0;
      var studmarks = 0;
      node.style.cssFloat = "right";
      node.style.fontWeight = "600";
      surveyModel.mode = 'display';
      surveyModel
        .onAfterRenderQuestion
        .add(function (survey, options) {
          var qnoval = options.question.name.split("question")[1];
          var span = document.createElement("span");

          var isCorrect = options
            .question
            .isAnswerCorrect();
          span.innerHTML = isCorrect
            ? "(Correct) &nbsp; &nbsp;" + marksdata1[parseInt(qnoval) - 1]["marks"] + " Out Of " + marksdata1[parseInt(qnoval) - 1]["marks"] + "&nbsp; &nbsp;"
            : "(Incorrect) &nbsp; &nbsp;" + 0 + " Out Of " + marksdata1[parseInt(qnoval) - 1]["marks"];
          span.style.color = isCorrect
            ? "green"
            : "black";
          span.style.cssFloat = "right";
          span.style.padding = "2px";
          var header = options
            .htmlElement
            .querySelector("h5");
          var jsonobj = JSON.parse(sessionStorage.getItem('ReviewOrgJson'))["pages"][0]["elements"];
          header.style.padding = "10px";
          if (!isCorrect) {
            header.style.backgroundColor = "salmon";
            var radio = options
              .htmlElement
              .querySelector('input[value="' + options.question.correctAnswer + '"]');
            totmarks = totmarks + parseInt(marksdata1[parseInt(qnoval) - 1]["marks"]);
            if (!!radio) {
              radio.parentElement.style.color = "green";
              radio.parentElement.value = "green";
            }
          }
          else {
            var qnv = options.question.name.split("question")[1];
            if (JSON.stringify(survey.data[options.question.name]) == JSON.stringify(jsonobj[parseInt(qnv) - 1]["correctAnswer"])) {
              studmarks = studmarks + parseInt(marksdata1[parseInt(qnoval) - 1]["marks"]);
              totmarks = totmarks + parseInt(marksdata1[parseInt(qnoval) - 1]["marks"]);
              span.innerHTML = "(Correct) &nbsp; &nbsp;" + marksdata1[parseInt(qnoval) - 1]["marks"] + " Out Of " + marksdata1[parseInt(qnoval) - 1]["marks"] + "&nbsp; &nbsp;"
              header.style.backgroundColor = "greenyellow";
            }
            else {
              span.innerHTML = "(Incorrect) &nbsp; &nbsp;" + 0 + " Out Of " + marksdata1[parseInt(qnoval) - 1]["marks"];
              header.style.backgroundColor = "salmon";
              totmarks = totmarks + parseInt(marksdata1[parseInt(qnoval) - 1]["marks"]);
              span.style.color = "black"
            }

          }
          header.appendChild(span);
          node.innerHTML = "Total Quiz Marks: " + studmarks + " Out Of " + totmarks;
          document.getElementById("descriptiondiv").appendChild(node);
        });
    }
    else if (sessionStorage.getItem('Td') != undefined) {

      surveyModel.mode = 'display';
      var totscoreval = 0;
      var value = JSON.parse(sessionStorage.getItem('jsondata'));
      var json = value["pages"][0]["elements"];
      var totscoreval = 0;
      if (json != undefined) {
        for (var i = 0; i < json.length; i++) {
          if (json[i]["Marks"] != undefined) {
            totscoreval += parseInt(json[i]["Marks"]);
          }
          else {
            totscoreval += parseInt("1");
          }

        }
        setTimeout(function () {
          var node = document.createElement("span");
          node.style.cssFloat = "right";
          node.style.fontWeight = "600";
          node.innerHTML = "Total Quiz Marks: ____ Out Of " + totscoreval;
          document.getElementById("descriptiondiv").appendChild(node);
        }, 400);
      }
    }
    
function saveSurveyToPdf(filename, surveyModel, saveType) {
  var surveyPDF = new SurveyPDF.SurveyPDF(JSON.parse(sessionStorage.getItem('ReviewOrgJson')));
  surveyPDF.mode='display';
  surveyPDF.data = JSON.parse(sessionStorage.getItem('ReviewOrgJson1'));
  if (saveType === "saveAsFile") {
      surveyPDF.save(filename);
  } 
}
if (this.router.url.includes('std')){
  document
  .getElementById("saveAsFileBtn")
  .onclick = function () {
      saveSurveyToPdf("surveyAsFile.pdf", surveyModel, "saveAsFile");
  };
}



    Survey.SurveyNG.render("surveyElement", { model: surveyModel });

  }


  calculatemarks(json, options, result, SurveyModel) {

    for (var key in result) {
      if (JSON.parse(JSON.stringify(json))["pages"][0]["elements"][(parseInt(key.split("question")[1]) - 1)]["name"] == key) {
        var marks = [];
        marks["name"] = key;
        if (JSON.parse(JSON.stringify(json))["pages"][0]["elements"][(parseInt(key.split("question")[1]) - 1)]["Marks"] != undefined) {
          marks["marks"] = JSON.parse(JSON.stringify(json))["pages"][0]["elements"][(parseInt(key.split("question")[1]) - 1)]["Marks"];
          this.totquizscore = this.totquizscore + parseInt(JSON.parse(JSON.stringify(json))["pages"][0]["elements"][(parseInt(key.split("question")[1]) - 1)]["Marks"])
        }
        else {
          marks["marks"] = 1;
          this.totquizscore = this.totquizscore + 1;
        }
        this.marks1.push(marks);
      }
    };

    return this.marks1;
  }
  calculatemarks1(json, result) {
    for (var key in result) {
      if (JSON.parse(json)["pages"][0]["elements"][(parseInt(key.split("question")[1]) - 1)]["name"] == key) {
        var marks = [];
        marks["name"] = key;
        if (JSON.parse(json)["pages"][0]["elements"][(parseInt(key.split("question")[1]) - 1)]["Marks"] != undefined) {
          marks["marks"] = JSON.parse(json)["pages"][0]["elements"][(parseInt(key.split("question")[1]) - 1)]["Marks"];
          this.totquizscore = this.totquizscore + parseInt(JSON.parse(json)["pages"][0]["elements"][(parseInt(key.split("question")[1]) - 1)]["Marks"])
        }
        else {
          marks["marks"] = 1;
          this.totquizscore = this.totquizscore + 1;
        }
        this.marks1.push(marks);
      }
    };
    return this.marks1;
  }
  saveSurveyToPdf() {

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
    surveyPDF.mode = "display";
    surveyPDF.data = sessionStorage.getItem('ReviewOrgJson1');
    setTimeout(function () {
      this.surveyPDF.data = sessionStorage.getItem('ReviewOrgJson1');
      this.surveyPDF.save("filename");
    }, 200);

  }
}
