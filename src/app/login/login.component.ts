import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb:FormBuilder, public userService: UserService, private snackbar: MatSnackBar, private router: Router) {}


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
      } else {
        if (res[0].password === this.loginForm.value.password) {
          this.userService.user = res[0]; // kullanıcıyı burada aldık
          localStorage.setItem('user',JSON.stringify(res[0]));
          this.router.navigateByUrl('/home');
        } else {
          this.snackbar.open('Böyle bir hesap bulunamadı','Tamam');
        }
      }
    })
  }

}
