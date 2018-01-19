import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ServerService } from './../../shared/server.service';
import { Daybook } from './../../shared/daybook';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  subscription: Subscription;
  dayBook: Daybook[];
  dayBook_selected: Daybook[] = [];
  dayBook_row: Daybook[] = [];
  showLoader: boolean;
  showAll: boolean = true;

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
  showSelected() {
    this.showAll = !this.showAll;
  }
  clearAll() {
    this.dayBook_selected = [];
  }
  selectFromAll(key,newQuantity) {
    // console.log(newQuantity);
    // alert("newQuantity: "+newQuantity+"voucherKey: "+key.voucherKey);
    // console.log("key..." + key)
    // console.log("voucher number..." + voucherNumber)
    // this.dayBook_row = key;
    this.dayBook_selected.push(key);
    // console.log(this.dayBook_selected);
    // console.log(this.dayBook.length);
    for (var i = 0; i < this.dayBook.length; i++) {
      // alert(i);
      if (this.dayBook[i].voucherKey === key.voucherKey) {
        // alert(this.dayBook[i]);
        this.dayBook.splice(i, 1);
        break;
      }
    }
    // console.log(this.dayBook.length);
    // this.serverService.updateTallyDaybook(key)
    // this.serverService.setFlagTallyDaybook(key)
    //   .subscribe(
    //   // (res: Daybook) => console.log(res),
    //   (success) => {
    //     console.log("success");
    //     this.refreshList();
    //   },
    //   (error) => console.log(error)
    //   );
  }
  selectFromSelected(key,voucherNumber) {
    // console.log("key..." + key)
    // console.log("voucher number..." + voucherNumber)
    // this.dayBook_row = key;
    this.dayBook.push(key);
    // console.log(this.dayBook);
    // console.log(this.dayBook_selected.length);
    for (var i = 0; i < this.dayBook_selected.length; i++) {
      // alert(i);
      if (this.dayBook_selected[i].voucherKey === voucherNumber) {
        // alert(this.dayBook_selected[i]);
        this.dayBook_selected.splice(i, 1);
        break;
      }
    }
    // console.log(this.dayBook_selected.length);
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
