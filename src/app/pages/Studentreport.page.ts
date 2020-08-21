import { Component } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import CryptoJS from 'crypto-js';
import { QuizService } from '../../Service/Quizservice';
import { StudentresponsePage } from "../pages/Student/Studentresponse.page";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
@Component({
    selector: "Studentreport-page",
    templateUrl: "./Studentreport.page.html", styleUrls: ["../app.component.css"]
})
export class StudentreportPage {
    quizid;
    studentdata;
    dialogRef;
    constructor(private router: Router, private QuizService: QuizService, private route: ActivatedRoute, public dialog: MatDialog) {
        
        this.route.queryParams.subscribe(params => {
            this.quizid = CryptoJS.AES.decrypt((params["qid"]).trim(), 'q').toString(CryptoJS.enc.Utf8);
        });
        var jsonobj = [
            {
                "Quizid": this.quizid,
            }];
        this.QuizService.getsubmittedstudentbyid(JSON.stringify(jsonobj))
            .subscribe(data => this.studentdata = (JSON.parse(JSON.stringify(data))));
            

    }
    review(obj) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.width = '90%';
        dialogConfig.height = '80%';
        this.dialogRef = this.dialog.open(StudentresponsePage, dialogConfig);
        localStorage.setItem('ReviewOrgJson1',JSON.stringify(JSON.parse(obj)));
    }

}