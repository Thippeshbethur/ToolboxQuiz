import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginatorIntl } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent extends MatPaginatorIntl {

  title = "Quiz Tool";
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  itemsPerPageLabel = 'Quiz Per Page'
  Studentroute;
  username;
  teachername;
  _config;
  constructor(public router: Router, private idle: Idle, private keepalive: Keepalive, private _snackBar: MatSnackBar, private http: HttpClient) {
    super();
    // // sets an idle timeout of 5 seconds, for testing purposes.
    // idle.setIdle(5);
    // // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    // idle.setTimeout(5);
    // // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    // idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    // idle.onIdleEnd.subscribe(() => { 
    //   this.idleState = 'No longer idle.'
    //   console.log(this.idleState);
    //   this.reset();
    // });

    // idle.onTimeout.subscribe(() => {
    //   this.idleState = 'Timed out!';
    //   this.timedOut = true;
    //   var snackBarRef= this._snackBar.open("Session time out", "ok", {               
    //   });
    //   snackBarRef.onAction().subscribe(() => {
    //     console.log(this.idleState);
    //     localStorage.clear();
    //     this.router.navigate(['/']);
    //   });


    // });

    // idle.onIdleStart.subscribe(() => {
    //     this.idleState = 'You\'ve gone idle!'
    //     console.log(this.idleState);
    // });

    // idle.onTimeoutWarning.subscribe((countdown) => {
    //   this.idleState = 'You will time out in ' + countdown + ' seconds!'
    //   this._snackBar.open(this.idleState, "", {
    //     duration: 1000,
    // });
    //   console.log(this.idleState);
    // });

    // // sets the ping interval to 15 seconds
    // keepalive.interval(5);

    // keepalive.onPing.subscribe(() => this.lastPing = new Date());

    // this.reset();
    this.loaddata();
    console.log(this._config)
    console.log(this.getconfigkey('url'))
    this.username = localStorage.getItem('studname')
    this.teachername = localStorage.getItem('teachername');
    if (this.teachername == undefined && this.username == undefined) {
      this.logout();
    }
    setTimeout(() => {
      this.Studentroute = '/' + localStorage.getItem("quizid")
    }, 500);

  }
  logout() {
    this.router.navigate(["/"]);
    localStorage.clear();
  }
  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
  loaddata() {
    this._config=this.http.get('../../assets/env.json');
  }
  getconfigkey(obj){
    return this._config[obj];
  }
}

