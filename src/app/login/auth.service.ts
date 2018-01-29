import { Router, RouterModule } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';

import { ServerService } from './../shared/server.service';

@Injectable()
export class AuthService {
    responseStatus: string;
    token: boolean = false;
    token_name: string;
    role = new EventEmitter<string>();
    invalidLogin = new EventEmitter<boolean>();

    constructor(private serviceAuth: ServerService, private router: Router) { }

    signinUser(user) {
        this.serviceAuth.authenticateUser(user)
            .subscribe(
            success => {
                // console.log(success);

                if (success.statusMessage == "AUTH_SUCCESS") {
                    this.token = true;
                    // this.router.navigate(['stock']);
                    this.router.navigate(['home']);
                    this.isAdmin(success.role);
                    this.token_name = success.token;
                    localStorage.setItem('token', this.token_name);
                    // localStorage.setItem('token', JSON.stringify(this.token_name));
                    localStorage.setItem('role', success.role);
                    // localStorage.setItem('role', JSON.stringify(success.role));
                    localStorage.setItem('companyName', success.companyName);
                    localStorage.setItem('companyId', success.companyId);
                    // localStorage.setItem('companyId', JSON.stringify(success.companyId));
                    // console.log('token name-' + this.token_name);
                    console.log('Company Id -' + success.companyId);
                    // console.log('Company Name -' + success.companyName);
                    // console.log('First Name -' + success.firstName);
                    // console.log('Last Name -' + success.lastName);
                    console.log('Role -' + success.role);
                }
                else {
                    this.token = false;
                    this.invalidLogin.emit(true);
                }
            },
            error => alert(error),
            () => console.log('finished')
            );
    }

    logout() {
        this.token = null;
        localStorage.clear();
        // localStorage.removeItem('currentUser');
        // localStorage.removeItem('userType');
        this.router.navigate(['']);
    }

    isAuthenticated() {
        return this.token;
    }

    isAdmin(role) {
        this.role.emit(role);
    }

    // Function to set if the user is in login page 
    // Send the value to header if the user is login page and NOT show login link in header

    private loginFlag: boolean = false;

    setFlagLogin(passedValue: boolean) {
        this.loginFlag = passedValue;
        console.log("this.loginFlag");
        console.log(this.loginFlag);
    }

    getFlagLogin() {
        return this.loginFlag;
    }

}
