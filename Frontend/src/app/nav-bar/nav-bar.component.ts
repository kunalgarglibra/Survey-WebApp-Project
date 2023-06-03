import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {


  loggedinUser: boolean;
  adminLogin:boolean;

  constructor() { }
  ngOnInit() {
  }

  loggedin(){
     this.adminLogin = true;
     return localStorage.getItem('key');


  }

  userLoggedIn  (){
    this.loggedinUser=true;
    return localStorage.getItem('Name');
       // return this.loggedinUser;
  }
onLogout(){
  localStorage.removeItem('key');
}
onUserLogout(){
  localStorage.removeItem('Name');
  localStorage.removeItem('token');
}


}
