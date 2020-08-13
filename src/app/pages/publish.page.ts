import { Component, Input } from "@angular/core";
import { QuizService } from '../../Service/Quizservice';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


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
        var startdate = new Date(this.startpicker1);
        var enddate = new Date(this.endpicker1);
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