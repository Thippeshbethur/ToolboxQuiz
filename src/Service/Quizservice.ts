import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Quiz } from '../DTO/Quiz';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({ providedIn: 'root' })
export class QuizService {

    constructor(
        private http: HttpClient) { }
    public getquiz(pageno,pagesize): Observable<Quiz> {
        return this.http.get<Quiz>("http://localhost:8081/getjsondata?pageNo="+pageno+"&size="+pagesize, { responseType: 'json' }
        );
    }
    public addjsondata(obj){
        const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
        return this.http.post("http://localhost:8081/putjsondata", obj, {
            headers: headers
          });
    }
    public updatejsondata(obj){
        const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
        return this.http.post("http://localhost:8081/updatejsondata", obj, {
            headers: headers
          });
    }
    public deletequiz(obj) {
        const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
        return this.http.post("http://localhost:8081/deletejsondata", obj, {
            headers: headers
          })
    }
    public getquizbyid(obj) {
        const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
        return this.http.post("http://localhost:8081/getstatusbyid", obj, {
            headers: headers
          });
    }
    public getquizdatabyid(obj) {
        const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
        return this.http.post("http://localhost:8081/getjsondataby", obj, {
            headers: headers
          });
    }
    public getquizretdatabyid(obj) {
        const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
        return this.http.post("http://localhost:8081/getretjsondataby", obj, {
            headers: headers
          });
    }
    public publishquiz(obj) {
        const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
        return this.http.post("http://localhost:8081/publishquiz", obj, {
            headers: headers
          });
    }
    public addstudentdata(obj){
        const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
        return this.http.post("http://localhost:8081/putstudentdata", obj, {
            headers: headers
          });
    }
}
