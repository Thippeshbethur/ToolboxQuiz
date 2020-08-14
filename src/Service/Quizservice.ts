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
    public getquiz(pageno,pagesize,teacherid): Observable<Quiz> {
        return this.http.get<Quiz>("http://10.10.13.40:8081/getjsondata?pageNo="+pageno+"&size="+pagesize+"&teacherid="+teacherid, { responseType: 'json' }
        );
    }
    public addjsondata(obj){
        const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
        return this.http.post("http://10.10.13.40:8081/putjsondata", obj, {
            headers: headers
          });
    }
    public updatejsondata(obj){
        const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
        return this.http.post("http://10.10.13.40:8081/updatejsondata", obj, {
            headers: headers
          });
    }
    public deletequiz(obj) {
        const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
        return this.http.post("http://10.10.13.40:8081/deletejsondata", obj, {
            headers: headers
          })
    }
    public getquizbyid(obj) {
        const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
        return this.http.post("http://10.10.13.40:8081/getstatusbyid", obj, {
            headers: headers
          });
    }
    public getquizstatusbyid(obj) {
        const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
        return this.http.post("http://10.10.13.40:8081/getquizstatusbyid", obj, {
            headers: headers
          });
    }
    public getsubmittedstudentbyid(obj) {
        const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
        return this.http.post("http://10.10.13.40:8081/getsubmittedstudentbyid", obj, {
            headers: headers
          });
    }
    public getquizdatabyid(obj) {
        const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
        return this.http.post("http://10.10.13.40:8081/getjsondataby", obj, {
            headers: headers
          });
    }
    public getquizretdatabyid(obj) {
        const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
        return this.http.post("http://10.10.13.40:8081/getretjsondataby", obj, {
            headers: headers
          });
    }
    public publishquiz(obj) {
        const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
        return this.http.post("http://10.10.13.40:8081/publishquiz", obj, {
            headers: headers
          });
    }
    public addstudentdata(obj){
        const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
        return this.http.post("http://10.10.13.40:8081/putstudentdata", obj, {
            headers: headers
          });
    }
    public getloginstatus(obj){
        const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
        return this.http.post("http://10.10.13.40:8081/getloginstatus", obj, {
            headers: headers
          });
    }
    public registeruser(obj){
        
        const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
        return this.http.post("http://10.10.13.40:8081/registeruser", obj, {
            headers: headers
          });
    }
}
