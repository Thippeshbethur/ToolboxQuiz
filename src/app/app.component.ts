import { Component } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "ToolBox Quiz";

  Studentroute;
  username;
  teachername;
  constructor(public router: Router) {
    this.username = localStorage.getItem('studname')
    this.teachername=localStorage.getItem('teachername');
    if(this.teachername==undefined &&  this.username==undefined)
    {
      this.logout();
    }
    setTimeout(() => {
      this.Studentroute = '/' + localStorage.getItem("quizid")
    }, 500)
  }
  logout() {
    this.router.navigate(["/"]);
    localStorage.clear();
  }
}
