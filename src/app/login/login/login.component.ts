import { AuthGuard } from './../auth-guard.service';
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
  error_msg: string;
  user: User = {
    'email': '',
    'password': '',
  };
  invalidLogin: boolean;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {

    this.authService.invalidLogin.subscribe(
      (status: boolean) => {
        console.log("Login: "+ status);
        this.invalidLogin=status;
      }
      // (status: string) => this.role=status
    );
  }

  onSubmit(form: NgForm) {
    this.user.email = form.value.email;
    this.user.password = form.value.password;

    this.authService.signinUser(this.user);
    if (!this.authService.isAuthenticated())
      this.error_msg = "Invalid username or password.";
    else
      this.error_msg = "";
  }

}
