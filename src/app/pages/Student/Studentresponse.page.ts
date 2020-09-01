import { Component } from "@angular/core";
import * as Survey from "survey-angular";

@Component({
    selector: "Studentresponse-page",
    templateUrl: "./Studentresponse.page.html",
    styleUrls: ["./Student.css"],
})
export class StudentresponsePage {
    json;
    teachername;
    ngOnInit() {
        this.json = localStorage.getItem("ReviewOrgJson");
    }
    sendData(result) {
        //TODO update with your own behavior
        const surveyModel = new Survey.Model(this.json);    
      }

}