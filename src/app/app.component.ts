import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  token:Boolean;
  ngOnInit() {
    if(window.localStorage.getItem("authenticated")=="true"){
      this.token = true;
    }
  }
  logout(){
    window.localStorage.removeItem("authenticated");
    window.location.reload();
  }
}
