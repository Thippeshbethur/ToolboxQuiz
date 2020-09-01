import { Component } from "@angular/core";
import { QuizService } from '../../Service/Quizservice';
import {MatSnackBar} from '@angular/material/snack-bar';
import CryptoJS from 'crypto-js';
import {Router } from "@angular/router";

@Component({
  selector: "login-page",
  templateUrl: "./login.page.html",styleUrls: ["../app.component.css"]
})
export class LoginPage {
    username:any;
    password:any;
    lusername:any;
    lpassword:any;
    constructor(private QuizService: QuizService,private _snackBar: MatSnackBar,private router: Router){        
    }
    Registerpage(){
        document.getElementById("Registerdiv").style.display="block";
        document.getElementById("Logindiv").style.display="none";
    }
    loginpage(){
        document.getElementById("Registerdiv").style.display="none";
        document.getElementById("Logindiv").style.display="block";
    }
    validatelogin(){
        
        if(this.lusername==undefined){
            this._snackBar.open("Please enter username  ",'', {
                duration: 2000,
            });
        }
        else if(this.lpassword==undefined){
            this._snackBar.open("Please enter password",'', {
                duration: 2000,
            });
        }
        else{
            
            var jsonobj = [
                {
                    "Username": this.lusername,
                    "password":CryptoJS.AES.encrypt(this.lpassword.trim(), 'q').toString(),
                }];
                this.QuizService.getloginstatus(JSON.stringify(jsonobj))
                .subscribe(data => {
                    if(JSON.parse(JSON.stringify(data))[0]["password"]!=undefined){                        
                        this.validatepassword(data);
                    }
                    else{
                        this.validatepassword(JSON.parse(JSON.stringify(data))['status']);
                    }
                }                    
                );
        }
    
    }
    validateregister(){
        if(this.username==undefined){
            this._snackBar.open("Please enter username  ",'', {
                duration: 2000,
            });
        }
        else if(this.password==undefined){
            this._snackBar.open("Please enter password",'', {
                duration: 2000,
            });
        }
        else{
            var jsonobj = [
                {
                    "Username": this.username,
                    "password":CryptoJS.AES.encrypt(this.password.trim(), 'q').toString(),
                }];
                this.QuizService.registeruser(JSON.stringify(jsonobj))
                .subscribe(data => {
                    if(JSON.parse(JSON.stringify(data))['status']=="S001"){
                        this.loginpage();
                    }
                    else{
                        
                    }
                });
        }
    }
    validatepassword(obj){
       
        if(this.lpassword==CryptoJS.AES.decrypt(JSON.parse(JSON.stringify(obj))[0]["password"].trim(), 'q').toString(CryptoJS.enc.Utf8)){
            localStorage.setItem("teachername",this.lusername)
            localStorage.setItem("Td",JSON.parse(JSON.stringify(obj))[0]["teacherid"])
            this.router.navigate(['/home'])
        }
        else if(obj=="S002"){
            this._snackBar.open("User Doesnot exist",'', {
                duration: 2000,
            });
        }
        else{
            this._snackBar.open("Please check your login details",'', {
                duration: 2000,
            });
        }
    }
}