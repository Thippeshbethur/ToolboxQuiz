import { Component } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "home-page",
  templateUrl: "./home.page.html",styleUrls: ["../app.component.css"]
})
export class HomePage {
  teachername;
  constructor(public router: Router) {}
  ngOnInit() {
    this.teachername=localStorage.getItem('teachername');
    if(this.teachername==undefined )
    {
      this.logout();
    }
    document.getElementById("btnGroupDrop1").innerText=this.teachername;
  }
  logout() {
    this.router.navigate(["/"]);
    localStorage.clear();
  }
}
