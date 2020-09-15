import { Component, Input } from "@angular/core";
import { Router, UrlSerializer } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
    selector: "Generateurl-page",
    templateUrl: "./Generateurl.page.html",
    styleUrls: ["../app.component.css"],
})
export class Genrateurlpage {
    url: any;
    route;
    teachername;
    constructor(private router: Router, private _snackBar: MatSnackBar) {
        this.teachername = sessionStorage.getItem('teachername');
        if (this.teachername == undefined) {
            this.logout();
        } else {
            console.log(window.location.hostname+router.url)
            this.url = window.location.href.split("#")[0]+"#/"+sessionStorage.getItem('quizid');
            this.route = router.url;
        }
    }
    logout() {
        this.router.navigate(["/"]);
        sessionStorage.clear();
    }
    copyInputMessage(inputElement) {        
        var snackBarRef = this._snackBar.open("Successfully copied the link", "ok", {
            duration: 5000
        });
        snackBarRef.onAction().subscribe(() => {
            document.getElementById("closebtn").click()
        });

        inputElement.select();
        document.execCommand('copy');
        inputElement.setSelectionRange(0, 0);
    }
    closedialog() {
        document.getElementById("closebtn").click()
    }

}