import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder,FormControl,FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserForRegister } from '../models/user';
import { AuthService } from '../services/auth.service';
import * as alertyfy  from 'alertifyjs';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  userObj: UserForRegister;
  formValue !:FormGroup;
  userDetails !: any;
  userSubmitted: boolean;
  editMode: boolean =false;
  currentUserId:number;
  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formBuilder:FormBuilder,
              private authService: AuthService) { }

    ngOnInit() {
      this.formValue = this.formBuilder.group({
        name:['',[Validators.required,this.noWhitespaceValidator]],
        email:['',[Validators.required,this.noWhitespaceValidator]],
        mobile:['',[Validators.required,this.noWhitespaceValidator]],
        password:['',[Validators.required,this.noWhitespaceValidator]]
      });
      this.getAllUsers();

    }

    clickAddUser(){
      this.formValue.reset();
      this.showAdd =true;
      this.showUpdate=false;
    }

    onSubmit() {

      this.userSubmitted = true;
      if (this.formValue.valid) {
          // this.user = Object.assign(this.user, this.registerationForm.value);
          this.authService.registerUser(this.userData()).subscribe(() =>
          {
              let ref=document.getElementById('Cancel');
              ref?.click();
              this.formValue.reset();
              alertyfy.success("New User Created Successfully");
              this.getAllUsers();
          },error =>{

            console.log(error);
            alertyfy.error("User not created something went wrong");
          }
          );
      }
  }

  userData():UserForRegister {
    return this.userObj ={

      name:this.name.value,
      email:this.email.value,
      mobile:this.mobile.value,
      password:this.password.value


    }
  }
    getAllUsers(){
      this.authService.getUser().subscribe(res=>{
        this.userDetails = res;
      });
    }


  deleteUser(row:any){
    this.authService.deleteUser(row.id).subscribe(res =>{
      alertyfy.success("User Deleted Successfully");
      this.getAllUsers();
    })
  }

  onEdit(row:any){
    this.showAdd =false;
    this.showUpdate=true;
    this.editMode=true;
    this.currentUserId =row.id;
    this.userUpdateData(this.currentUserId);
    //To get the values on the Update page
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['password'].setValue(row.password);
    this.editMode = true;

  }
  userUpdateData(currentUserId:number):UserForRegister {

    return this.userObj ={
      id:this.currentUserId,
      name:this.name.value,
      email:this.email.value,
      mobile:this.mobile.value,
      password:this.password.value
    }
  }
  updateUsers(){
    console.log(this.userUpdateData(this.currentUserId));
    this.authService.updateUser(this.currentUserId,this.userUpdateData(this.currentUserId)).subscribe(res=>{
      alertyfy.success("User Updated Successfully");
      let ref=document.getElementById('Cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllUsers();
    });
   }

   onReset() {
    this.userSubmitted = false;
    this.formValue.reset();
  }

  get name(){
    return this.formValue.get('name') as FormControl;
  }
  get email(){
    return this.formValue.get('email') as FormControl;
  }
  get mobile(){
    return this.formValue.get('mobile') as FormControl;
  }
  get password(){
    return this.formValue.get('password') as FormControl;
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}

}


