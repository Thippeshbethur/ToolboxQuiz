import { Component } from "@angular/core";
import { Router, UrlSerializer } from "@angular/router";
import { QuizService } from '../../../Service/Quizservice';

import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: "Studenthome-page",
    templateUrl: "./Studenthome.page.html",
    styleUrls: ["./Student.css"],
})
export class StudenthomePage {
    status: any;
    Studentstatus: any;
    quizid: any;
    Studentname: any = '';
    constructor(private QuizService: QuizService, private router: Router, private _snackBar: MatSnackBar) {

        var quizid = this.router.url;
        var valufin = quizid.replace('/', '');
        this.quizid = valufin;
        var jsonobj = [
            {
                "id": valufin,
                "ispublished": 1
            }];
        this.QuizService.getquizbyid(JSON.stringify(jsonobj))
            .subscribe(data => this.status = (JSON.parse(JSON.stringify(data))['status']));


    }
    routgen() {

        if (this.Studentname != '') {
            var jsonobj1 = [
                {
                    "Quizid": this.quizid,
                    "studentname": this.Studentname
                }];
            this.QuizService.addstudentdata(JSON.stringify(jsonobj1))
                .subscribe(data => this.routequiz(JSON.parse(JSON.stringify(data))['status']));

        }
        else {
            this._snackBar.open("Please enter the student name", "Ok", {
                duration: 2000,
                panelClass: ['blue-snackbar']
            });
        }


    }
    routequiz(obj) {
        if (obj == "S001") {
            var quizid = this.router.url;

            var valufin = quizid.split('/')[1];
            var jsonobj = [
                {
                    "id": valufin,
                    "ispublished": 1
                }];
            this.QuizService.getquizdatabyid(JSON.stringify(jsonobj))
                .subscribe(data => data);
            setTimeout(() => {
                this.router.navigate([this.quizid + "/student"], { queryParams: { page: 10 } })
            }, 250);

        }
        else {
            this._snackBar.open("Please enter the different name because this name already exist", "ok", {
                duration: 5000,
            });
        }


    }
}