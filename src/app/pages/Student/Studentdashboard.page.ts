import { Component } from "@angular/core";
import { QuizService } from '../../../Service/Quizservice';
import {MatSnackBar} from '@angular/material/snack-bar';
import CryptoJS from 'crypto-js';
import {Router } from "@angular/router";
import { config } from 'process';
@Component({
    selector: "Studentdashboard-page",
    templateUrl: "./Studentdashboard.page.html",
    styleUrls: ["./Student.css"],
})
export class StudentdashboardPage {
    QuizCode;
    constructor(private QuizService: QuizService,private _snackBar: MatSnackBar,private router: Router){        
        
    }
    validatequiz(){
        if(this.QuizCode==undefined){
            this._snackBar.open("Please enter Quiz Code  ",'', {
                duration: 2000,
            });
        }
        else{
            var currentdate=new Date();
            var jsonobj = [
                {
                    "id": this.QuizCode,
                    "ispublished": 1,                    
                    "startdate":{$lt:currentdate}
                }];
                this.QuizService.getquizstatusbyid(JSON.stringify(jsonobj))
                .subscribe(data => {
                    console.log(JSON.parse(JSON.stringify(data))['status'])
                    if(JSON.parse(JSON.stringify(data))['status']=='S001'){  
                        this.router.navigate([this.QuizCode]);                      
                    }
                    else{
                        this._snackBar.open("Please Check with the Quiz Code", "", {
                            duration: 2000,
                        });
                    }
                }                    
                );
        }
    
    
    }
}
