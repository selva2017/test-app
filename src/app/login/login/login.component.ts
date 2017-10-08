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

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.user.email = form.value.email;
    this.user.password = form.value.password;

    this.authService.signinUser(this.user);
    if (!this.authService.isAuthenticated())
      this.error_msg = "Please enter a valid Username and Password.";
    else
      this.error_msg = "";
  }

}
