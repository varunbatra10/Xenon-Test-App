import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { Login } from '../model/login.model';
import {ApiService} from "../service/api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:String;
  password:String;
  loginForm: FormGroup;
  login:Login;
  invalidLogin: boolean = false;
  rememberMe: any;
  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const loginPayload = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    }
    
    this.rememberMe = this.loginForm.controls.rememberMe.value;
    this.apiService.login().subscribe(data => {
        if(data!=null){
          this.login = data[0];
          var x =this.login.username==loginPayload.username && this.login.password===loginPayload.password;
          if(x){
            if(this.rememberMe){
              window.localStorage.setItem("username",loginPayload.username);
              window.localStorage.setItem("password",loginPayload.password);
            }
            else{
              if(window.localStorage.getItem("username")){
                window.localStorage.removeItem("username");
                window.localStorage.removeItem("password");
              }
            }
            window.localStorage.setItem("authenticated", 'true');
            this.router.navigate(['home']);
            window.location.reload();
         }
       }else {
          this.invalidLogin = true;
          alert("Username and Password combination is not valid");
      }
    });
  }

  ngOnInit() {
    if(window.localStorage.getItem("username")){
      this.username = window.localStorage.getItem("username");
      this.password = window.localStorage.getItem("password");
    }
    if (window.localStorage.getItem("authenticated")=="true") {
      this.router.navigate(['home']);
        }
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required],
      rememberMe:['true']
    });
  }



}
