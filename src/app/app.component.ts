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
  username=localStorage.getItem('studname')
  constructor(public router: Router) {
  console.log(router.url);
  setTimeout(()=>{
    this.Studentroute='/'+localStorage.getItem("quizid")
  },500)
  }
  logout(){
    this.router.navigate(["/"+localStorage.getItem("quizid")]); 
    localStorage.clear();
    
  }
}
