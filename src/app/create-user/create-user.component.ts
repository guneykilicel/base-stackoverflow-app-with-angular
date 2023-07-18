import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  constructor(private fb:FormBuilder, public userService: UserService) {}


  createUserForm = this.fb.group({
    password: ['',[Validators.required,Validators.minLength(8)]],
    username: ['',[Validators.required,Validators.maxLength(10)]],
    email: ['',[Validators.required,Validators.email]]
  })
  get f(): { [key:string]: AbstractControl } {
    return this.createUserForm.controls;
  }

  createAccount() {
    this.userService.createAccount(this.createUserForm.value).subscribe((res)=> {
      console.log(res);
    })
  }

}
