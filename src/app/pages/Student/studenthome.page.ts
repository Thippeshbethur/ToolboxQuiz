import { Component } from "@angular/core";
import { Router, UrlSerializer } from "@angular/router";
import { QuizService } from '../../../Service/Quizservice';

import {MatSnackBar} from '@angular/material/snack-bar';
import CryptoJS from 'crypto-js';

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
    Studentroute;
    disabled=true;
    curr;
    constructor(private QuizService: QuizService, private router: Router, private _snackBar: MatSnackBar) {
        sessionStorage.clear()
        var quizid1 = this.router.url;
        var valufin = quizid1.replace('/', '');
        this.quizid = valufin;
        sessionStorage.setItem("quizid",valufin);
        this.curr=new Date().toISOString();
        var jsonobj = [
            {
                "id": valufin,
                "ispublished": 1,
                "startdate":{$lte:this.curr},
                "enddate":{$gte:this.curr}
            }];
            setTimeout(() => {
                this.QuizService.getquizstatusbyid(JSON.stringify(jsonobj))
            .subscribe(data => this.status = (JSON.parse(JSON.stringify(data))['status']));
            }, 100);
        


    }
    routgen() {

        if (this.Studentname.trim() != '') {
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
            });
        }


    }
    routequiz(obj) {
        if (obj == "S002") {            
            var snackBarRef= this._snackBar.open("Please enter the different name because this name already exist", "ok", {
               
            });
            snackBarRef.onAction().subscribe(() => {
            });
        }
        else {
            var encryptedval = CryptoJS.AES.encrypt(obj.trim(), 'q').toString();
            sessionStorage.setItem("sid",encryptedval)
            sessionStorage.setItem("studname",this.Studentname)
            var quizid = this.router.url;
            var valufin = quizid.split('/')[1];
        var jsonobj = [
            {
                "id": valufin,
                "ispublished": 1
            }];
        this.QuizService.getquizretdatabyid(JSON.stringify(jsonobj))
            .subscribe(data => {sessionStorage.setItem("editjson",JSON.stringify(data))});
                var encryptedval = CryptoJS.AES.encrypt(valufin.trim(), 'q').toString();
            setTimeout(() => {
                this.router.navigate([this.quizid + "/student"], { queryParams: { Qid: encryptedval } })
            }, 250);
        }


    }
}