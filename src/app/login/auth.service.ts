import { Router, RouterModule } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';

import { ServerService } from './../shared/server.service';

@Injectable()
export class AuthService {
    responseStatus: string;
    token: boolean = false;
    role = new EventEmitter<string>();

    constructor(private serviceAuth: ServerService, private router: Router) { }

    signinUser(user) {
        this.serviceAuth.authenticateUser(user)
            .subscribe(
            success => {
                if (success.statusMessage == "AUTH_SUCCESS") {
                    this.token = true;
                    this.router.navigate(['']);
                    this.isAdmin(success.role);
                }
                else {
                    this.token = false;
                }
            },
            error => alert(error),
            () => console.log('finished')
            );
    }

    logout() {
        this.token = null;
        this.router.navigate(['login']);
    }

    isAuthenticated() {
        return this.token;
    }

    isAdmin(role) {
        this.role.emit(role);
    }
}
