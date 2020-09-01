import { Component } from "@angular/core";
import { QuizService } from '../../../Service/Quizservice';
import {MatSnackBar} from '@angular/material/snack-bar';
import CryptoJS from 'crypto-js';
import {Router } from "@angular/router";
import { config } from 'process';
import {formatDate } from '@angular/common';
@Component({
    selector: "Studentdashboard-page",
    templateUrl: "./Studentdashboard.page.html",
    styleUrls: ["./Student.css"],
})
export class StudentdashboardPage {
    QuizCode;
    curr;
    constructor(private QuizService: QuizService,private _snackBar: MatSnackBar,private router: Router){        
        var currentdate=new Date();
        var currtim=new Date().toLocaleString().toString();
             this.curr=new Date(currtim).toLocaleString();
    }
    validatequiz(){
        if(this.QuizCode==undefined){
            this._snackBar.open("Please enter Quiz Code  ",'', {
                duration: 2000,
            });
        }
        else{
            
            
            var jsonobj = [
                {
                    "id": this.QuizCode,
                    "ispublished": 1,                                      
                    "startdate":{$lte:this.curr},
                    "enddate":{$gte:this.curr}
                }];
                this.QuizService.getquizstatusbyid(JSON.stringify(jsonobj))
                .subscribe(data => {
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
