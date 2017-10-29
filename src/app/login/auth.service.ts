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
                if (success.statusMessage == "AUTH_SUCCESS") {
                    this.token = true;
                    this.router.navigate(['home']);
                    this.isAdmin(success.role);
                    this.token_name = success.token;
                    console.log('token name-' + this.token_name);
                    localStorage.setItem('currentUser', JSON.stringify(this.token_name));
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
        this.router.navigate(['login']);
        localStorage.removeItem('currentUser');
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
