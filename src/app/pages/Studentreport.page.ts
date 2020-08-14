import { Component } from "@angular/core";
import { Router ,ActivatedRoute} from '@angular/router';
import CryptoJS from 'crypto-js';
import { QuizService } from '../../Service/Quizservice';
@Component({
  selector: "Studentreport-page",
  templateUrl: "./Studentreport.page.html",styleUrls: ["../app.component.css"]
})
export class StudentreportPage {
    quizid;
    studentdata;
    constructor(private router: Router, private QuizService: QuizService,private route:ActivatedRoute) {
        
        this.route.queryParams.subscribe(params => {
            this.quizid=CryptoJS.AES.decrypt((params["qid"]).trim(), 'q').toString(CryptoJS.enc.Utf8); 
        });   
        var jsonobj = [
            {
                "Quizid": this.quizid,
            }];
        this.QuizService.getsubmittedstudentbyid(JSON.stringify(jsonobj))
            .subscribe(data => this.studentdata=(JSON.parse(JSON.stringify(data))));
    }

}