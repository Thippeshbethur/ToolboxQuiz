import { Component,OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import json from "../../assets/survey.json";

import { QuizService } from '../../Service/Quizservice';
import { ActivatedRoute ,Router, UrlSerializer } from "@angular/router";
import CryptoJS from 'crypto-js';

@Component({
  selector: "creator-page",
  templateUrl: "./creator.page.html",
  styleUrls: ["../app.component.css"],
})
export class CreatorPage {
  json ;
  quizid;
 
  constructor(private http: HttpClient,private router: Router,private route:ActivatedRoute , private QuizService: QuizService) {
    this.route.queryParams.subscribe(params => {
      this.quizid=(params["qid"]); 

    });   
    if(this.quizid==undefined){
      this.json= {"pages":[{"name":"Page1","title":"Quiz Name","description":"Quiz Description"}]};
    }
    else{
      this.json=json
    }
  }
  onSurveySaved(survey) {
    
    this.json = survey;
    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');
    if(this.quizid==undefined){
      
      this.QuizService.addjsondata(JSON.stringify(this.json))
    }
    else{
      console.log("hello")
      var updatejson={
        quizid:CryptoJS.AES.decrypt(this.quizid.trim(), 'q').toString(CryptoJS.enc.Utf8),
        json:this.json
      }
      var sts=this.QuizService.updatejsondata(JSON.stringify(updatejson))
      .subscribe(data => data
      );
      console.log(sts);
    }
    
  }
}
