import { Component, ElementRef, ViewChild } from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable'
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
    quiztitle;
    quizdesc;
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

        this.quiztitle=JSON.parse(sessionStorage.getItem('ReviewOrgJson'))["pages"][0]['title'].trim();
        this.quizdesc=JSON.parse(sessionStorage.getItem('ReviewOrgJson'))["pages"][0]['description'].trim();

    }
    review(obj) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.width = '90%';
        dialogConfig.height = '80%';
        this.dialogRef = this.dialog.open(StudentresponsePage, dialogConfig);
        sessionStorage.setItem('ReviewOrgJson1', JSON.stringify(JSON.parse(obj)));
    }
    @ViewChild('reportContent') reportContent: ElementRef;

    downloadPdf() {
        document.getElementById("stdres").hidden = true;
        document.getElementById("stdres1").hidden = true;
        var filename = JSON.parse(sessionStorage.getItem('ReviewOrgJson'))["pages"][0]['title'].trim();
        var QuizDescription = JSON.parse(sessionStorage.getItem('ReviewOrgJson'))["pages"][0]['description'].trim();
        const doc = new jsPDF();
        doc.setFontSize(10);
        const specialElementHandlers = {
            '#editor': function (element, renderer) {
                return true;
            }
        };
        var res = doc.autoTableHtmlToJson(document.getElementById("my-table"));
        var header = function (data) {
            doc.setFontSize(14);
            doc.setTextColor(40);
            doc.setFontStyle('normal');
            //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
            doc.text("Quiz Tool", 89, 10);
            doc.setFontSize(12);
            doc.text("Quiz Title:" + filename + "\nQuiz Description:" + QuizDescription, 15, 20);
        };

        var options = {
            beforePageContent: header,
            margin: {
                top: 30
            },

            startY: doc.autoTableEndPosY() + 30
        };

        const content = this.reportContent.nativeElement;

        doc.autoTable(res.columns, res.data, options);

        doc.save(filename + '.pdf');
        document.getElementById("stdres").hidden = false;
        document.getElementById("stdres1").hidden = false;
    }
}