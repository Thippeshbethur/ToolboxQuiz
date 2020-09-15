import { Component, ElementRef, ViewChild } from "@angular/core";
import * as jsPDF from 'jspdf';
import 'jspdf-autotable'
import { Router, UrlSerializer } from "@angular/router";
import * as Survey from "survey-angular";
import * as SurveyPDF from "survey-pdf";

@Component({
    selector: "Studentresponse-page",
    templateUrl: "./Studentresponse.page.html",
    styleUrls: ["./Student.css"],
})
export class StudentresponsePage {
    json;
    teachername;
    jsonres;
    surveyPDF;
    ngOnInit() {
        this.json = sessionStorage.getItem("ReviewOrgJson");
        this.jsonres = sessionStorage.getItem("ReviewOrgJson1");
    }
    constructor(private router: Router) {
    }
    sendData(result) {
        //TODO update with your own behavior
        const surveyModel = new Survey.Model(this.json);
    }
    saveSurveyToPdf() {
        
        
        
    }

}