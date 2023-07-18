import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb:FormBuilder) {}


  loginForm = this.fb.group({
    password: ['',[Validators.required,Validators.minLength(8)]],
    email: ['',[Validators.required,Validators.email]]
  })
  get f(): { [key:string]: AbstractControl } {
    return this.loginForm.controls;
  }

}
