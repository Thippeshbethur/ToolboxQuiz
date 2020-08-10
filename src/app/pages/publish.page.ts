import { Component, Input } from "@angular/core";


@Component({
    selector: "Publish-page",
    templateUrl: "./Publish.page.html",
    styleUrls: ["../app.component.css"],
})
export class Publishpage {
    startpicker1:any;
    endpicker1;
    Nostud;
    constructor(){
        
    }
    publishdata(){
        console.log(this.startpicker1+","+this.endpicker1+","+this.Nostud)
    }
    copyInputMessage(inputElement){
        inputElement.select();
        document.execCommand('copy');
        inputElement.setSelectionRange(0, 0);
      }
}