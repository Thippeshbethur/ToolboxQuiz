import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { QuizService } from '../../Service/Quizservice';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from "Config/config";
import  'rxjs/add/operator/map';
@Component({
  selector: "home-page",
  templateUrl: "./home.page.html", styleUrls: ["../app.component.css"]
})
export class HomePage {
  teachername;
  quizcount;
  Published;
  constructor(public router: Router, private QuizService: QuizService, private http: HttpClient,private _config: Config) {
    // this._config.loaddataval();
  //   this.http.get('../../assets/env.json')
  //  .map(res => res)
  //   .subscribe((env_data) =>console.log(env_data))

  }
  ngOnInit() {
    this.teachername = localStorage.getItem('teachername');
    if (this.teachername == undefined) {
      this.logout();
    }
    var date = new Date();
    date.setDate(date.getDate() - 30);
    var jsonobj1 = [
      {
        "createdby": localStorage.getItem("Td"),
        "ispublished":1,
      }];
      this.QuizService.getQuizcount(jsonobj1).subscribe(data=>this.Published=data["Count"])
    var jsonobj = [
      {
        "createdby": localStorage.getItem("Td")
      }];
      this.QuizService.getQuizcount(jsonobj).subscribe(data=>this.quizcount=data["Count"])
    document.getElementById("btnGroupDrop1").innerText = this.teachername;
  }
  logout() {
    this.router.navigate(["/"]);
    localStorage.clear();
  }
  send() {
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
    return this.http.post("http://10.10.13.40:8081/upload", {
      headers: headers
    });
  }
}
