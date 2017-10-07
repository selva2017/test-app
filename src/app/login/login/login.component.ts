import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { User } from './../../shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error_msg: string = '';
  user: User = {
    'email': '',
    'password': '',
  };

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.user.email = form.value.email;
    this.user.password = form.value.password;

    this.authService.signinUser(this.user);
     // console.log("this.authService.error_message");
    // console.log(this.authService.error_message);
    // this.error_msg = this.authService.errorMessage();
     if (this.authService.isAuthenticated())
         this.error_msg = "Enter a valid Username and Password!";
  }
}
