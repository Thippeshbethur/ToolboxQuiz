import { Component, Input } from "@angular/core";
import CryptoJS from 'crypto-js';
import { QuizService } from '../../Service/Quizservice';
import { QuizListingpage } from './QuizListing.page';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
    selector: "DeleteQuiz-page",
    templateUrl: "./DeleteQuiz.page.html",
    styleUrls: ["../app.component.css"],
})
export class DeleteQuizpage {
    obj;
    constructor(private QuizService: QuizService, private _snackBar: MatSnackBar){
        console.log(localStorage.getItem("quizid1"))
        //this.obj=CryptoJS.AES.decrypt(sessionStorage.getItem("quizid1"), 'q').toString(CryptoJS.enc.Utf8);
    }
    deletequiz() {   
            
        var jsonobj = [
            {
                "id": CryptoJS.AES.decrypt(localStorage.getItem("quizid1").trim(), 'q').toString(CryptoJS.enc.Utf8)
            }];

        this.QuizService.deletequiz(JSON.stringify(jsonobj)).subscribe(data=>this.deletedquiz(JSON.parse(JSON.stringify(data))['status']=='S001'));
        
        console.log(this.obj)
    }
    deletedquiz(obj){
        var snackBarRef=this._snackBar.open("Deleted successfully", "ok", {
        });
        snackBarRef.onAction().subscribe(() => {
            document.getElementById("cancelbtn").click();
        });
    }

}