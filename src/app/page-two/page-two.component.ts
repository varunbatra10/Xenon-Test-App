import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { ApiService } from '../service/api.service';
import { HttpClient, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-page-two',
  templateUrl: './page-two.component.html',
  styleUrls: ['./page-two.component.css']
})
export class PageTwoComponent implements OnInit {

  allusers: User[];
  users: User[];   
  pages1: number;
  pages: any;
  currentPage:User[];
  pageNo: number = 1;
  pageSize: number = 10;


  constructor(private http: HttpClient, private router: Router, private apiService: ApiService) { 
   }

  ngOnInit() {
      this.apiService.getUsers().subscribe( data => {
        this.allusers = data;
        this.users=this.allusers;
        var start = (this.pageNo-1)*10;
        this.users = this.allusers.slice(start,start + this.pageSize);
        this.pages1 = Math.ceil(this.allusers.length/this.pageSize);
        this.pages = Array(this.pages1).fill(1).map((x, i) => i + 1);
      });
      
  }

 
  getActivePage(page):boolean{
    return (page == this.pageNo)? true:false;
}

getPageNo(pages) {
  switch(pages){
    case 'prev':
          this.pageNo = this.pageNo>1?this.pageNo-1:this.pageNo;
          break;
    case 'next':
          this.pageNo = this.pageNo<this.pages.length?this.pageNo+1:this.pageNo;
          break;
    default:
    this.pageNo = pages;
    }
    
    var start = (this.pageNo-1)*10;
    this.users = this.allusers.slice(start,start + this.pageSize);
 
  
  }
}
