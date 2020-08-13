import { Component, Input } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Quiz } from '../../DTO/Quiz';
import { QuizService } from '../../Service/Quizservice';
import { Router, UrlSerializer } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PdfExportPage } from '../pages/pdfexport.page'
import { Publishpage } from '../pages/publish.page'
import { Genrateurlpage } from "../pages/Generateurl.page";
import { DeleteQuizpage } from "../pages/DeleteQuiz.page";
import { SurveyPage } from '../pages/survey.page'
import {PageEvent} from '@angular/material/paginator';


import CryptoJS from 'crypto-js';
import { from } from 'rxjs';

@Component({
    selector: "QuizListing-page",
    templateUrl: "./QuizListing.page.html",
    styleUrls: ["../app.component.css"],
})
export class QuizListingpage {
    Debugger;
    @Input() quiz1: Quiz;
    dialogRef;
    length = 10;
    pageSize = 8;
    pageindex=1;
    teachername;
    teacherid
    pageSizeOptions: number[] = [8];
    constructor(private router: Router, private QuizService: QuizService, private serializer: UrlSerializer, public dialog: MatDialog) {
        this.teachername = localStorage.getItem('teachername');
        if (this.teachername == undefined) {
            this.logout();
        }
        else{
            this.teacherid=localStorage.getItem("Td");
            this.refreshdata()
        }
    }
    logout() {
        this.router.navigate(["/"]);
        localStorage.clear();
    }
    deletequiz(obj: any) {
        this.showloader();
        this.dialogRef = this.dialog.open(DeleteQuizpage, { 'width': '90%', 'height': '90%' });

        this.dialogRef.afterClosed().subscribe(result => {
            this.refreshdata();
            //this.animal = result;
        });
        localStorage.setItem("quizid1",CryptoJS.AES.encrypt(obj, 'q').toString());
        this.refreshdata();
    }
    // publishquiz(obj: any) {
    //     this.showloader();
        

    //     this.refreshdata();
    // }
    editquiz(obj: any) {
        console.log(new Date());
        var encryptedval = CryptoJS.AES.encrypt(obj.trim(), 'q').toString();
        var jsonobj = [
            {
                "id": obj,
                "Isedit": 1
            }];
        this.QuizService.getquizretdatabyid(JSON.stringify(jsonobj))
            .subscribe(data => {localStorage.setItem("editjson",JSON.stringify(data))});
        setTimeout(() => {
            this.router.navigate(["creator"], { queryParams: { qid: encryptedval } })
        }, 100);
    }
    generatequiz(obj: any) {

        localStorage.setItem('quizid', obj);
        this.dialogRef = this.dialog.open(Genrateurlpage, { 'width': '90%', 'height': '90%' });

        this.dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            //this.animal = result;
        });
    }
    Preview(obj:any){
        var jsonobj = [
            {
                "id": obj,
            }];
        this.QuizService.getquizretdatabyid(JSON.stringify(jsonobj))
            .subscribe(data => localStorage.setItem("jsondata",JSON.stringify(data)));
            setTimeout(()=>{
                this.dialogRef = this.dialog.open(SurveyPage, { 'width': '90%', 'height': '90%' });

                this.dialogRef.afterClosed().subscribe(result => {
                    console.log('The dialog was closed');
                    localStorage.setItem("jsondata","");
                    //this.animal = result;
                });
            },100)
    }
    refreshdata() {
        setTimeout(() => {
            this.QuizService.getquiz(this.pageindex,this.pageSize,this.teacherid).subscribe(res => {
                this.quiz1 = res;
                
                if(res.length>0){
                    this.length=(res[0]["totolrows"])
                }else{
                    this.length=0;
                }
                });

            this.hideloader();
        }, 100);
    }
    onNoClick(): void {
        this.dialogRef.close();
      }
    openDialog(obj): void {
        localStorage.setItem("qid",obj);
        this.dialogRef = this.dialog.open(Publishpage, { 'width': '90%', 'height': '90%' });

        this.dialogRef.afterClosed().subscribe(result => {
            this.refreshdata();
        });
    }
    hideloader() {

        // Setting display of spinner 
        // element to none 
        document.getElementById('loading')
            .style.display = 'none';
    }
    showloader() {

        // Setting display of spinner 
        // element to none 
        document.getElementById('loading')
            .style.display = 'block';
    }
    pageEvent: PageEvent;

    onPaginateChange(obj){
        this.pageindex=obj["pageIndex"]+1;
        this.QuizService.getquiz(obj["pageIndex"]+1,this.pageSize,this.teacherid).subscribe(res => {this.quiz1 = res;this.length=(res[0]["totolrows"])});
        
    }

}