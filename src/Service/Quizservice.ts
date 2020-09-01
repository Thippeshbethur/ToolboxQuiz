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
    url;
    dataval;
    constructor(
        private http: HttpClient) { 
            this.url=this.getconfigkey().subscribe(data=>this.url=data['url']);
        }
        public getconfigkey():any{            
            return this.http.get("../../assets/env.json");            
        }
    public getquiz(pageno, pagesize, teacherid): Observable<Quiz> {
        return this.http.get<Quiz>(this.url+"getjsondata?pageNo=" + pageno + "&size=" + pagesize + "&teacherid=" + teacherid, { responseType: 'json' }
        );
    }
    public addjsondata(obj) {
        const headers = new HttpHeaders()
            .set('Authorization', 'my-auth-token')
            .set('Content-Type', 'application/json');
        return this.http.post(this.url+"putjsondata", obj, {
            headers: headers
        });
    }
    public updatejsondata(obj) {
        const headers = new HttpHeaders()
            .set('Authorization', 'my-auth-token')
            .set('Content-Type', 'application/json');
        return this.http.post(this.url+"updatejsondata", obj, {
            headers: headers
        });
    }
    public getQuizcount(obj) {
        const headers = new HttpHeaders()
            .set('Authorization', 'my-auth-token')
            .set('Content-Type', 'application/json');
        return this.http.post(this.url+"getQuizcount", obj, {
            headers: headers
        });
    }
    public updatestudentsubmitteddata(obj) {
        const headers = new HttpHeaders()
            .set('Authorization', 'my-auth-token')
            .set('Content-Type', 'application/json');
        return this.http.post(this.url+"updatestudentsubmitteddata", obj, {
            headers: headers
        });
    }
    public deletequiz(obj) {
        const headers = new HttpHeaders()
            .set('Authorization', 'my-auth-token')
            .set('Content-Type', 'application/json');
        return this.http.post(this.url+"deletejsondata", obj, {
            headers: headers
        })
    }
    public getquizbyid(obj) {
        const headers = new HttpHeaders()
            .set('Authorization', 'my-auth-token')
            .set('Content-Type', 'application/json');
        return this.http.post(this.url+"getstatusbyid", obj, {
            headers: headers
        });
    }
    public getquizstatusbyid(obj) {
        const headers = new HttpHeaders()
            .set('Authorization', 'my-auth-token')
            .set('Content-Type', 'application/json');
        return this.http.post(this.url+"getquizstatusbyid", obj, {
            headers: headers
        });
    }
    public getsubmittedstudentbyid(obj) {
        const headers = new HttpHeaders()
            .set('Authorization', 'my-auth-token')
            .set('Content-Type', 'application/json');
        return this.http.post(this.url+"getsubmittedstudentbyid", obj, {
            headers: headers
        });
    }
    public getquizdatabyid(obj) {
        const headers = new HttpHeaders()
            .set('Authorization', 'my-auth-token')
            .set('Content-Type', 'application/json');
        return this.http.post(this.url+"getjsondataby", obj, {
            headers: headers
        });
    }
    public getquizretdatabyid(obj) {
        const headers = new HttpHeaders()
            .set('Authorization', 'my-auth-token')
            .set('Content-Type', 'application/json');
        return this.http.post(this.url+"getretjsondataby", obj, {
            headers: headers
        });
    }
    public publishquiz(obj) {
        const headers = new HttpHeaders()
            .set('Authorization', 'my-auth-token')
            .set('Content-Type', 'application/json');
        return this.http.post(this.url+"publishquiz", obj, {
            headers: headers
        });
    }
    public addstudentdata(obj) {
        const headers = new HttpHeaders()
            .set('Authorization', 'my-auth-token')
            .set('Content-Type', 'application/json');
        return this.http.post(this.url+"putstudentdata", obj, {
            headers: headers
        });
    }
    public getloginstatus(obj) {
        const headers = new HttpHeaders()
            .set('Authorization', 'my-auth-token')
            .set('Content-Type', 'application/json');
        return this.http.post(this.url+"getloginstatus", obj, {
            headers: headers
        });
    }
    public registeruser(obj) {

        const headers = new HttpHeaders()
            .set('Authorization', 'my-auth-token')
            .set('Content-Type', 'application/json');
        return this.http.post(this.url+"registeruser", obj, {
            headers: headers
        });
    }
}
