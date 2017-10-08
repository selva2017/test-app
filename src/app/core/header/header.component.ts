import { AuthService } from './../../login/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  role: string;
  constructor(private authService: AuthService) { 
  }

  ngOnInit() {
    this.authService.role.subscribe(
      (status: string) => {
        console.log("status: "+ status);
        this.role=status;
      }
      // (status: string) => this.role=status
    );
  }
  onclick() {
    alert("clicked");
  }

  onLogout() {
    this.authService.logout();
  }
}
