import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user = {
    'email': '',
    'password': '',
    'confirmPassword': '',
    'companyId': '',
  };

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
  console.log(form.value)
    this.user.email = form.value.email;
    this.user.password = form.value.password;

    //   this.authService.signinUser(this.user);
    //   if (!this.authService.isAuthenticated())
    //     this.error_msg = "Invalid username or password.";
    //   else
    //     this.error_msg = "";
  }
  onCancel() { }
}
