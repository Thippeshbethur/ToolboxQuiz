import { Component, Input } from "@angular/core";
import { Router, UrlSerializer } from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
    selector: "Generateurl-page",
    templateUrl: "./Generateurl.page.html",
})
export class Genrateurlpage {
    url:any;
    route;
    constructor(private router: Router, private _snackBar: MatSnackBar){
        console.log(window.document.location.href.split('/')[2])
        this.url=window.document.location.href.split('/')[2]+"/"+localStorage.getItem('quizid');
        this.route = router.url;
    }
    copyInputMessage(inputElement){
        var snackBarRef=this._snackBar.open("Successfully copied the link", "ok", {
            duration: 5000,
        });
        snackBarRef.onAction().subscribe(() => {
            document.getElementById("closebtn").click()
        });
        
        inputElement.select();
        document.execCommand('copy');
        inputElement.setSelectionRange(0, 0);
      }
      addinputmess(inputele){
        inputele.value
      }
}