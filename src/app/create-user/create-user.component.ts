import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  constructor(private fb: FormBuilder, public userService: UserService, private router: Router) { }


  createUserForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    username: ['', [Validators.required, Validators.maxLength(10)]],
    email: ['', [Validators.required, Validators.email]]
  })
  get f(): { [key: string]: AbstractControl } {
    return this.createUserForm.controls;
  }

  createAccount() {
    this.userService.createAccount(this.createUserForm.value).subscribe((res) => {
      console.log(res);
      this.userService.user = res; // kullanıcıyı burada aldık
      localStorage.setItem('user', JSON.stringify(res));
      this.router.navigateByUrl('/home');
    })
  }

}
