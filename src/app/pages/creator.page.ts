import { Component,OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import json from "../../assets/survey.json";

import { QuizService } from '../../Service/Quizservice';
import { ActivatedRoute ,Router, UrlSerializer } from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';
import CryptoJS from 'crypto-js';

@Component({
  selector: "creator-page",
  templateUrl: "./creator.page.html",
  styleUrls: ["../app.component.css"],
})
export class CreatorPage {
  json ;
  quizid;
 
  constructor(private http: HttpClient,private router: Router,private route:ActivatedRoute , private QuizService: QuizService,private _snackBar: MatSnackBar) {
    this.route.queryParams.subscribe(params => {
      this.quizid=(params["qid"]); 
    });   
    if(this.quizid==undefined){
      this.json= {"pages":[{"name":"Page1","title":"Quiz Name","description":"Quiz Description"}]};
    }
    else{
      
        this.json = JSON.parse(localStorage.getItem("editjson"));
      
    }
  }
  onSurveySaved(survey) {
    this.json = survey;
    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');
    if(this.quizid==undefined){
      this.QuizService.addjsondata(JSON.stringify(this.json))
      .subscribe(data => {
        this.Navigateedit(JSON.parse(JSON.stringify(data))['status']) 
      });
    }
    else{
      var updatejson={
        quizid:CryptoJS.AES.decrypt(this.quizid.trim(), 'q').toString(CryptoJS.enc.Utf8),
        json:this.json
      }
      var sts=this.QuizService.updatejsondata(JSON.stringify(updatejson))
      .subscribe(data => this.Navigateedit(JSON.parse(JSON.stringify(data))['status']));
      console.log(sts=>console.log(sts));
    }
    
  }
  Navigateedit(obj){
    console.log(obj)
    if(obj=="S001"){
      var snackBarRef;
      if(this.quizid==undefined){
        snackBarRef= this._snackBar.open("Quiz Added Successfully", "ok", {               
        });
      }      
      else{
        snackBarRef= this._snackBar.open("Update Successful", "ok", {               
        });
      }
      this.json= {"pages":[{"name":"Page1","title":"Quiz Name","description":"Quiz Description"}]};
      snackBarRef.onAction().subscribe(() => {
          this.router.navigate(['/quizlist'])
      });
      
    }

  }
}
