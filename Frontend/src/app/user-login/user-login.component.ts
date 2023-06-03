import { Component, Directive, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router} from '@angular/router';
import { UserForLogin } from '../models/user';
import { AuthService } from '../services/auth.service';
import * as alertyfy  from 'alertifyjs';




@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {


  constructor(private router:Router,
              private authService:AuthService)
           { }




  ngOnInit() {


  }

  onUserLogin(loginForm:NgForm){
    this.authService.authUser(loginForm.value).subscribe(
      (response: UserForLogin) => {
          const user = response;
          if (user) {
             localStorage.setItem('Name', user.name);
              localStorage.setItem('password', user.password);

              alertyfy.success("Login Successfull");
              this.router.navigate(['/']);
          }
      },error=>{

            alertyfy.error("Login Failed! Please try again...");

      }
  );
  }


}
