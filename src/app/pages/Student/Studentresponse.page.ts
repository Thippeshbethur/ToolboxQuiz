import { Component } from "@angular/core";
import * as Survey from "survey-angular";

@Component({
    selector: "Studentresponse-page",
    templateUrl: "./Studentresponse.page.html",
    styleUrls: ["./Student.css"],
})
export class StudentresponsePage {
    json;
    ngOnInit() {
        this.json = localStorage.getItem("ReviewOrgJson");
    }

}