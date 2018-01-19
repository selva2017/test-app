import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ServerService } from './../../shared/server.service';
import { UserList } from 'app/shared/user-list';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  subscription: Subscription;
  userList: UserList[];
  status: string;
  role: string;
  disableUpdate: boolean = true;

  constructor(private serverService: ServerService) {
  }
  setStatus(value: string) {
    // console.log(value);
    this.status = value;
    this.disableUpdate = false;
  }
  setRole(value: string) {
    // console.log(value);
    this.role = value;
    this.disableUpdate = false;
  }
  onClickReviewed(key) {
    // console.log("Modal clicked..." + key)
    // key.userStatus = this.status;
    this.status? key.userStatus = this.status : '';
    // key.role = this.role;
    this.role? key.role = this.role : '';
    // console.log("After ..." + key)
    // console.log(JSON.stringify(key));

    this.serverService.updateUsers(key)
      .subscribe(
      // (res: Daybook) => console.log(res),
      (success) => {
        // console.log("success");
        this.disableUpdate = true;
        // this.refreshList();
      },
      (error) => console.log(error.status)
      );
  }
  ngOnInit() {
    this.subscription = this.serverService.getUserRoles().
      subscribe(list => {
        this.userList = list;
        // console.log("this.userlist");
        // console.log(this.userList);
      },
      error => {
      }
      );

  }

}
