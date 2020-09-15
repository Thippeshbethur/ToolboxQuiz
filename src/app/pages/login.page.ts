import { ElementRef, Component } from "@angular/core";
import { QuizService } from '../../Service/Quizservice';
import { MatSnackBar } from '@angular/material/snack-bar';
import CryptoJS from 'crypto-js';
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'

@Component({
    selector: "login-page",
    templateUrl: "./login.page.html", styleUrls: ["../app.component.css"]
})
export class LoginPage {
    username: any;
    password: any;
    lusername: any;
    lpassword: any;
    Loginform: FormGroup;
    ngOnInit() {
        // this.Loginform = this.formBuilder.group({
        //     'username': ['', Validators.required,Validators.minLength(6)],
        //     'password': ['', Validators.required,Validators.minLength(6)],
        // });
        this.Loginform = new FormGroup({
            username: new FormControl('', [Validators.required, Validators.minLength(6)]),
            password: new FormControl('', [Validators.required, Validators.minLength(3)])
        });
    }
    // getError(el) {
    //     switch (el) {
    //       case 'username':
    //         if (this.Loginform.get('username').hasError('required')) {
    //           return 'Username required';
    //         }
    //         else if(!this.Loginform.get('username').hasError('required')) {
    //             return 'Minimum 6 digits';
    //         }
    //         break;
    //       case 'password':
    //         if (this.Loginform.get('password').hasError('required')) {
    //           return 'Password required';
    //         }
    //         else if(!this.Loginform.get('username').hasError('required')) {
    //             return 'Minimum 6 digits';
    //         }
    //         break;
    //       default:
    //         return '';
    //     }
    //   }
    constructor(private QuizService: QuizService, private _snackBar: MatSnackBar, private router: Router, private formBuilder: FormBuilder, private el: ElementRef) {
    }
    Registerpage(){
        document.getElementById("formregister").style.display="block";
        document.getElementById("formlogin").style.display="none";
    }
    loginpage(){
        document.getElementById("formregister").style.display="none";
        document.getElementById("formlogin").style.display="block";
    }
    // public checkError = (controlName: string, errorName: string) => {
    //     return this.PublishForm.controls[controlName].hasError(errorName);
    // }
    public checkError = (controlName: string, errorName: string) => {
        return this.Loginform.controls[controlName].hasError(errorName);
    }
    validatelogin() {
        if (!this.Loginform.valid) {
            return;
        }
        this.lpassword = this.Loginform.get("password").value;
        this.username = this.Loginform.get("username").value;
        var jsonobj = [
            {
                "Username": this.Loginform.get("username").value,
                "password": CryptoJS.AES.encrypt(this.lpassword.trim(), 'q').toString(),
            }];
        this.QuizService.getloginstatus(JSON.stringify(jsonobj))
            .subscribe(data => {
                console.log(data)
                if (data[0] != undefined) {
                    if (JSON.parse(JSON.stringify(data))[0]["password"] != undefined) {
                        this.validatepassword(data);
                    }
                }
                else {
                    this.validatepassword(JSON.parse(JSON.stringify(data))['status']);
                }
            }
            );
    }
    validateregister() {
        if (!this.Loginform.valid) {
            return;
        }
        this.lpassword = this.Loginform.get("password").value;
        this.username = this.Loginform.get("username").value;
        var jsonobj = [
            {
                "Username": this.username,
                "password": CryptoJS.AES.encrypt(this.lpassword.trim(), 'q').toString(),
            }];
        this.QuizService.registeruser(JSON.stringify(jsonobj))
            .subscribe(data => {
                if (JSON.parse(JSON.stringify(data))['status'] == "S001") {
                     var snackBarRef = this._snackBar.open("Successfully Registered the user", "ok", {
                        
                    });
                    snackBarRef.onAction().subscribe(() => {
                        this.loginpage();
                    });
                    
                }
                else {

                }
            });
    }
    validatepassword(obj) {

        if (obj == "S002") {
            this._snackBar.open("Invalid User", '', {
                duration: 2000,
            });
        }
        else if (this.lpassword == CryptoJS.AES.decrypt(JSON.parse(JSON.stringify(obj))[0]["password"].trim(), 'q').toString(CryptoJS.enc.Utf8)) {
            sessionStorage.setItem("teachername", this.username)
            sessionStorage.setItem("Td", JSON.parse(JSON.stringify(obj))[0]["teacherid"])
            this.router.navigate(['/home'])
        }

        else {
            this._snackBar.open("Invalid Password", '', {
                duration: 2000,
            });
        }
    }
}