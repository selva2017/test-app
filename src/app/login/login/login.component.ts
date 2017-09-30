import { ServerService } from './../../shared/server.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { User } from './../../shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private serviceAuth: ServerService) { }
  postdata: string;
  user: User = {
    'email': '',
    'password': '',
  };

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.user.email = form.value.email;
    this.user.password = form.value.password;

    console.log(this.user);

    this.serviceAuth.authenticateUser(this.user)
      .subscribe(
      data => this.postdata = JSON.stringify(data),
      error => alert(error),
      () => console.log('finished')
      );

  }
}
