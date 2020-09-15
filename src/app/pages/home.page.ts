import { Component,ViewChild } from "@angular/core";
import { Router } from '@angular/router';
import { QuizService } from '../../Service/Quizservice';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from "Config/config";
import  'rxjs/add/operator/map';
import { Chart } from 'chart.js';

@Component({
  selector: "home-page",
  templateUrl: "./home.page.html", styleUrls: ["../app.component.css"]
})
export class HomePage {
  teachername;
  quizcount;
  Published;
  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart;
  constructor(public router: Router, private QuizService: QuizService, private http: HttpClient,private _config: Config) {
    // this._config.loaddataval();
  //   this.http.get('../../assets/env.json')
  //  .map(res => res)
  //   .subscribe((env_data) =>console.log(env_data))

  }
  ngOnInit() {
    this.teachername = sessionStorage.getItem('teachername');
    if (this.teachername == undefined) {
      this.logout();
    }
    var date = new Date();
    date.setDate(date.getDate() - 30);
    var jsonobj1 = [
      {
        "createdby": sessionStorage.getItem("Td"),
        "ispublished":1,
      }];
      this.QuizService.getQuizcount(jsonobj1).subscribe(data=>this.Published=data["Count"])
    var jsonobj = [
      {
        "createdby": sessionStorage.getItem("Td")
      }];
      this.QuizService.getQuizcount(jsonobj).subscribe(data=>this.quizcount=data["Count"])
    document.getElementById("btnGroupDrop1").innerText = this.teachername;
  }
  
  logout() {
    this.router.navigate(["/"]);
    sessionStorage.clear();
  }
  send() {
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
    return this.http.post("http://10.10.13.40:8081/upload", {
      headers: headers
    });
  }
  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement; 
    this.ctx = this.canvas.getContext('2d');

    let myChart = new Chart(this.ctx, {
      type: 'line',
      
      data: {
        datasets: [{
          label: 'Contour line',
          backgroundColor: "rgba(255, 99, 132,0.4)",
          borderColor: "rgb(255, 99, 132)",
          fill: true,
          data: [
            { x: 1, y: 2 },
            { x: 2500, y: 2.5 },
            { x: 3000, y: 5 },
            { x: 3400, y: 4.75 },
            { x: 3600, y: 4.75 },
            { x: 5200, y: 6 },
            { x: 6000, y: 9 },
            { x: 7100, y: 6 },
          ],
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Contour line'
        },
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom',
            ticks: {
              
            },
            scaleLabel: {
              labelString: 'Long',
              display: true,
            }
          }],
          yAxes: [{
            type: 'linear',
            ticks: {
             
            },
            scaleLabel: {
              labelString: 'height',
              display: true
            }
          }]
        }
      }
    });
  }
}
