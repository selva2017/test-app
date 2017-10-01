import { AuthService } from './../../login/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { 
  }

  ngOnInit() {
  }
  onclick() {
    alert("clicked");
  }

  onLogout() {
    this.authService.logout();
  }
}
