import { Component, Input } from "@angular/core";
import { QuizService } from '../../Service/Quizservice';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {formatDate } from '@angular/common';

@Component({
    selector: "Publish-page",
    templateUrl: "./Publish.page.html",
    styleUrls: ["../app.component.css"],
})
export class Publishpage {
    startpicker1: any;
    endpicker1;
    Nostud;
    teachername;
    constructor(private QuizService: QuizService, private _snackBar: MatSnackBar, public router: Router) {
        this.teachername = localStorage.getItem('teachername');
        if (this.teachername == undefined) {
            this.logout();
        }
    }
    logout() {
        this.router.navigate(["/"]);
        localStorage.clear();
    }
    publishdata() {
        var obj = localStorage.getItem("qid");
        var startdate = formatDate(document.getElementById("startpicker1").value, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
        var enddate = formatDate(document.getElementById("endpicker1").value, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
        console.log(startdate)
        if (startdate < enddate) {
            var jsonobj = [
                {
                    "id": obj,
                    "startdate": startdate,
                    "Enddate": enddate,
                    "totalstudent": this.Nostud
                }];
            this.QuizService.publishquiz(JSON.stringify(jsonobj))
                .subscribe(data => {
                    this.publishsuccess(JSON.parse(JSON.stringify(data))['status']);
                });
        }
        else {
            var snackBarRef = this._snackBar.open("Please select the valid date", '', {
                duration: 2000,
            });

        }
    }
    publishsuccess(obj) {
        if (obj == "S001") {
            var snackBarRef = this._snackBar.open("Successfully Published the Quiz", "ok", {
                duration: 5000,
            });
            snackBarRef.onAction().subscribe(() => {
                document.getElementById("canelbtn").click()
            });
        }
        else {
            var snackBarRef = this._snackBar.open("Publish UnSuccessful", "", {
                duration: 5000,
            });
        }

    }
}