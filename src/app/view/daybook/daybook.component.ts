import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ServerService } from './../../shared/server.service';
import { Daybook } from './../../shared/daybook';

@Component({
  selector: 'app-daybook',
  templateUrl: './daybook.component.html',
  styleUrls: ['./daybook.component.css']
})
export class DaybookComponent implements OnInit {

  subscription: Subscription;
  dayBook: Daybook[];
  dayBook_row: Daybook[] = [];
  showLoader: boolean;

  constructor(private serverService: ServerService) {
    this.showLoader = true;
  }

  ngOnInit() {
    this.refreshList();
  }
  displayINR(amount: number) {
    // return String(Number(amount).toLocaleString('en-IN'));
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  }

  onClickView(record) {
    this.dayBook_row = record;
  }
  onClickReviewed(key) {
    // console.log("Modal clicked..." + key)
    // this.serverService.updateTallyDaybook(key)
    this.serverService.setFlagTallyDaybook(key)
      .subscribe(
      // (res: Daybook) => console.log(res),
      (success) => {
        // console.log("success");
        this.refreshList();
      },
      (error) => console.log(error)
      );
  }
  refreshList() {
    this.subscription = this.serverService.getTallyDaybook().
      subscribe(list => {
        this.dayBook = list;
        // console.log(this.dayBook);
        this.showLoader = false;
      })
  }
}
