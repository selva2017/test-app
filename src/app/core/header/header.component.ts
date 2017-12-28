import { AuthService } from './../../login/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  role: string;
  isLoginPage: boolean;
  companyId: string;

  constructor(private authService: AuthService, private router: Router) { 
  }

  ngOnInit() {
    //Get the user is in login page
    this.isLoginPage = this.authService.getFlagLogin();
    console.log("this.isLoginPage");
    console.log(this.isLoginPage);
    this.companyId = localStorage.getItem('companyId');

    console.log("login Page--"+this.isLoginPage);
    this.authService.role.subscribe(
      (status: string) => {
        console.log("role: "+ status);
        this.role=status;
      }
      // (status: string) => this.role=status
    );
    console.log("in header");
    console.log(this.companyId);
  }
  onLogin() {
    this.router.navigate(['login']);
  }

  onLogout() {
    this.authService.logout();
  }
}
