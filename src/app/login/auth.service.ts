import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { ServerService } from './../shared/server.service';

@Injectable()
export class AuthService {
    responseStatus: string;
    token: boolean;

    constructor(private serviceAuth: ServerService, private router: Router) { }

    signinUser(user) {
        console.log(user);
        this.serviceAuth.authenticateUser(user)
            .subscribe(
            // data => console.log(data),
            success => {
                // this.responseStatus = success.status;
                // console.log(this.responseStatus);
                // console.log("success");
                // console.log(success);
                if (success.statusMessage == "AUTH_SUCCESS") {
                    this.token = true;
                    this.router.navigate(['']);
                }
                else {
                    this.token = false;
                    console.log('login error');
                }
            },
            error => alert(error),
            () => console.log('finished')
            );
    }

    logout() {
        this.token = null;
    }

    isAuthenticated() {
        return this.token;
    }
}
