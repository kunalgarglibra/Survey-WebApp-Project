import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as alertyfy  from 'alertifyjs';

@Component({
  selector: 'app-Admin-login',
  templateUrl: './Admin-login.component.html',
  styleUrls: ['./Admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private router:Router,
              ) { }

  ngOnInit() {
  }
  onLogin(AdminloginForm :NgForm)
  {
     console.log(AdminloginForm.value);


    var adminname = AdminloginForm.controls['adminName'].value;
    var password = AdminloginForm.controls['password'].value;

     if(adminname === 'admin' && password === 'admin'){
      localStorage.setItem('key', adminname);
      alertyfy.success("Login Successfull");
      console.log('Login Success');

       this.router.navigate(['/admin/home']);

     }
     else{
      alertyfy.Fail("Login Fail");
       console.log('Login Fail');
     }


  }

}
