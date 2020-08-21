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
    disabled=true
    constructor(private QuizService: QuizService, private router: Router, private _snackBar: MatSnackBar) {
        localStorage.clear()
        var quizid1 = this.router.url;
        var valufin = quizid1.replace('/', '');
        var currentdate=new Date();
        console.log(currentdate);
        this.quizid = valufin;
        localStorage.setItem("quizid",valufin);

        var jsonobj = [
            {
                "id": valufin,
                "ispublished": 1,
                
                "startdate":{$lt:currentdate}
            }];
        this.QuizService.getquizbyid(JSON.stringify(jsonobj))
            .subscribe(data => this.status = (JSON.parse(JSON.stringify(data))['status']));


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
                console.log('The snack-bar action was triggered!');
            });
        }
        else {
            var encryptedval = CryptoJS.AES.encrypt(obj.trim(), 'q').toString();
            localStorage.setItem("sid",encryptedval)
            localStorage.setItem("studname",this.Studentname)
            var quizid = this.router.url;
            var valufin = quizid.split('/')[1];
        var jsonobj = [
            {
                "id": valufin,
                "ispublished": 1
            }];
        this.QuizService.getquizretdatabyid(JSON.stringify(jsonobj))
            .subscribe(data => {localStorage.setItem("editjson",JSON.stringify(data))});
                var encryptedval = CryptoJS.AES.encrypt(valufin.trim(), 'q').toString();
            setTimeout(() => {
                this.router.navigate([this.quizid + "/student"], { queryParams: { Qid: encryptedval } })
            }, 250);
        }


    }
}