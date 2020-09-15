import { ElementRef, Component, Input } from "@angular/core";
import { QuizService } from '../../Service/Quizservice';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
@Component({
    selector: "Publish-page",
    templateUrl: "./Publish.page.html",
    styleUrls: ["../app.component.css"],
})
export class Publishpage {
    startpicker1: any;
    endpicker1;
    Nostud;
    teachername;
    minDate;
    maxDate;
    date;
    PublishForm: FormGroup;
    isValidDate: any;
    example = {
        value: new Date(2010, 11, 28, 14, 57)
    };
    ngOnInit() {
        this.PublishForm = this.formBuilder.group({
            startpicker1: ['', Validators.required],
            endpicker1: ['', Validators.required],
            studentval: ['', Validators.required],
        });
    }
    constructor(private QuizService: QuizService, private _snackBar: MatSnackBar, public router: Router, private formBuilder: FormBuilder, private el: ElementRef) {
        this.teachername = sessionStorage.getItem('teachername');
        if (this.teachername == undefined) {
            this.logout();
        }
        const currentYear = new Date().getFullYear();
        this.date = new Date().toISOString().slice(0, 16);
        this.minDate = new Date(currentYear - 20, 0, 1).toLocaleString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });;
        this.maxDate = new Date(currentYear + 1, 11, 31).toLocaleString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });;

    }
    public checkError = (controlName: string, errorName: string) => {
        return this.PublishForm.controls[controlName].hasError(errorName);
    }
    logout() {
        this.router.navigate(["/"]);
        sessionStorage.clear();
    }
    validateDates(sDate: string, eDate: string) {
        this.isValidDate = true;
        // if ((sDate == null || eDate == null)) {
        //     this.error = { isError: true, errorMessage: 'Start date and end date are required.' };
        //     this.isValidDate = false;
        // }

        if ((sDate != null && eDate != null) && (eDate) < (sDate)) {
            this.checkError("endpicker1",'End date should be grater then start date.')
            // this.error = { isError: true, errorMessage: 'End date should be grater then start date.' };
            this.isValidDate = false;
        }
        return this.isValidDate;
    }
    publishdata() {
        if (!this.PublishForm.valid) {
            for (const key of Object.keys(this.PublishForm.controls)) {
                if (this.PublishForm.controls[key].invalid) {
                    const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
                    invalidControl.focus();
                    break;
                }
            }
            return;
        }
        var obj = sessionStorage.getItem("qid");
        var startdate = new Date((document.getElementById("startpicker1") as HTMLInputElement).value).toISOString();
        var enddate = new Date((document.getElementById("endpicker1") as HTMLInputElement).value).toISOString();

        
        
        if (startdate < enddate) {
            var jsonobj = [
                {
                    "id": obj,
                    "startdate": startdate,
                    "Enddate": enddate,
                    "totalstudent": this.Nostud
                }];
            this.QuizService.publishquiz(JSON.stringify(jsonobj))
                .subscribe(data => {
                    this.publishsuccess(JSON.parse(JSON.stringify(data))['status']);
                });
        }
        else {
            var snackBarRef = this._snackBar.open("Please select the valid date", '', {
                duration: 2000,
            });

        }
    }
    publishsuccess(obj) {
        if (obj == "S001") {
            var snackBarRef = this._snackBar.open("Successfully Published the Quiz", "ok", {
                duration: 5000,
            });
            snackBarRef.onAction().subscribe(() => {
                document.getElementById("canelbtn").click()
            });
        }
        else {
            var snackBarRef = this._snackBar.open("Publish UnSuccessful", "", {
                duration: 5000,
            });
        }

    }
}