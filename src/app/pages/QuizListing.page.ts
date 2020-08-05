import { Component, Input } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Quiz } from '../../DTO/Quiz';
import { QuizService } from '../../Service/Quizservice';
import { Router, UrlSerializer } from "@angular/router";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PdfExportPage} from '../pages/pdfexport.page'
import {Publishpage} from '../pages/publish.page'

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
    
  length = 10;
  pageSize = 15;
  
  pageSizeOptions: number[] = [5, 10,15, 30, 100];
    constructor(private router: Router, private QuizService: QuizService, private serializer: UrlSerializer,public dialog: MatDialog) {
        this.showloader();
        
        this.refreshdata();
    }
    deletequiz(obj: any) {
        this.showloader();
        var jsonobj = [
            {
                "id": obj
            }];

        var status = this.QuizService.deletequiz(JSON.stringify(jsonobj));
        console.log(status)
        this.refreshdata();
    }
    publishquiz(obj: any) {
        this.showloader();
        var jsonobj = [
            {
                "id": obj
            }];
        this.QuizService.publishquiz(JSON.stringify(jsonobj))
        .subscribe(data => {
          console.log(JSON.parse(JSON.stringify(data))['status']);
        });;
        
        this.refreshdata();
    }
    editquiz(obj:any){
        var encryptedval=CryptoJS.AES.encrypt(obj.trim(), 'q').toString();
        var jsonobj = [
            {
                "id": obj,
                "ispublished":0
            }];
            this.QuizService.getquizdatabyid(JSON.stringify(jsonobj))
              .subscribe(data =>data);
              setTimeout(() => {
                this.router.navigate(["creator"], { queryParams: { qid: encryptedval } })
              }, 250);
    }
    generatequiz(obj: any) {
        this.showloader();
        this.router.navigate(["" + obj]);
        this.refreshdata();
    }
    refreshdata() {
        setTimeout (() => {
        this.QuizService.getquiz().subscribe(res => this.quiz1 = res);
        
        this.hideloader();
    }, 1000);
    }
    openDialog(): void {
        const dialogRef = this.dialog.open(Publishpage,{'width':'70%','height':'90%'});
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          //this.animal = result;
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

}