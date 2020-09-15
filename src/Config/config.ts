import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
@Injectable()
 export class Config {
 private _config: Object
 private _env: Object
 constructor(private http: HttpClient) {
 }
 public loaddataval() {
  this.http.get('../../assets/env.json')
  .map(res => res)
   .subscribe((env_data) =>console.log(env_data))
   // json files will be loaded here
  //  return new Promise((resolve, reject) => {
  //   this.http.get('../../assets/env.json').map()
  //   .subscribe((env_data) => {
  //     this._env = env_data;
  //     this.http.get('../../assets/env.json')      
  //     .subscribe((data) => {
  //       console.log(data);
  //     });
  //   });
  // });
 }
 getEnv(key: any) {
   return this._env[key];
 }
 get(key: any) {
   return this._config[key];
 }
};