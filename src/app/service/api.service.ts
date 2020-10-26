import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../model/user.model";
import {Observable} from "rxjs/index";
import { Login} from "../model/login.model";

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:3000/';

  login() : Observable<Login> {
    return this.http.get<Login>(this.baseUrl + 'login');
  }

  setUsers(userPayload) : Observable<User> {
    return this.http.post<User>(this.baseUrl + 'users',userPayload);
  }

  getUsers() : Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

}
