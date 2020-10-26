import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../service/api.service";


@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.css']
})
export class PageOneComponent implements OnInit {
  userForm: FormGroup;
  invalidForm: boolean = false;  
  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    const userPayload = {
      name: this.userForm.controls.name.value,
      age: this.userForm.controls.age.value,
      dob: this.userForm.controls.dob.value
    }
    this.apiService.setUsers(userPayload).subscribe(data => {
        if(data!=null){
          alert("User data has beeen saved");
          window.location.reload();
      }else {
        this.invalidForm = true;
        alert("Username and Password combination is not valid");
      }
    });
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      age: ['', Validators.required],
      dob: ['', Validators.required]
    });
  }

  reset(){
    this.userForm.reset();
  }

}
