import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb:FormBuilder, public userService: UserService, private snackbar: MatSnackBar) {}


  loginForm = this.fb.group({
    password: ['',[Validators.required,Validators.minLength(8)]],
    email: ['',[Validators.required,Validators.email]]
  })
  get f(): { [key:string]: AbstractControl } {
    return this.loginForm.controls;
  }


  login() {
    this.userService.getUser(this.loginForm.value.email).subscribe((res) => {
      //console.log(res);
      if(res.length == 0) {
        this.snackbar.open('Böyle bir hesap bulunamadı', 'Tamam');
      }
    })
  }

}
