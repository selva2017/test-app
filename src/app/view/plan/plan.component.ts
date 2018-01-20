import { Item } from './../../shared/item.model';
import { UserList } from './../../shared/user-list';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ServerService } from './../../shared/server.service';
import { ProdPlan } from './../../shared/prod_plan';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  subscription: Subscription;
  salesOrder: ProdPlan[];
  salesOrder_selected: ProdPlan[] = [];
  salesOrder_selected1: ProdPlan[] = [];
  salesOrder_row: ProdPlan[] = [];
  salesOrder_modified: ProdPlan[] = [];
  showLoader: boolean;
  showAll: boolean = true;
  salesOrder_selected_temp: ProdPlan[] = [];
  // salesOrder_selected_temp =[{item:String,reel:Number}];
  constructor(private serverService: ServerService) {
    this.showLoader = true;
  }

  ngOnInit() {
    this.refreshList();
    console.log(this.salesOrder);
  }
  displayINR(amount: number) {
    // return String(Number(amount).toLocaleString('en-IN'));
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  }

  onClickView(record) {
    this.salesOrder_row = record;
  }
  showSelected() {
    this.showAll = !this.showAll;
  }
  clearAll() {
    // this.salesOrder_selected = [];
    // this.salesOrder_modified = [];
    // this.refreshList();
    this.generateReport();
    // this.extractModified();
    // console.log(this.salesOrder_selected);
    // console.log(this.salesOrder_modified);
  }
  extractModified() {
    for (var i = 0; i < this.salesOrder_selected.length; i++) {
      for (var j = 0; j < this.salesOrder_modified.length; j++) {
        if (this.salesOrder_selected[i].voucherKey === this.salesOrder_modified[j].voucherKey) {
          this.salesOrder_selected.splice(i, 1);
        }
      }
    }
  }
  generateReport() {
    this.salesOrder_selected1 = this.salesOrder_selected.map(x => Object.assign({}, x));
    if (this.salesOrder_selected1.length > 1) {
      // alert("inside"+this.salesOrder_selected.length);
      // alert(this.salesOrder_selected[0].item);
      this.salesOrder_selected_temp[0] = this.salesOrder_selected1[0];
      // alert(this.salesOrder_selected_temp[0].item);
      for (var i = 1; i < this.salesOrder_selected1.length; i++) {
        var match: boolean = false;
        // alert("salesOrder_selected " + i)
        for (var j = 0; j < this.salesOrder_selected_temp.length; j++) {
          // alert("salesOrder_selected_temp " + j)
          if ((this.salesOrder_selected_temp[j].item).trim() === (this.salesOrder_selected1[i].item).trim()) {
            // alert("MAtches " + i + " "+j)
            // this.salesOrder_selected_temp[j].reel;
            // alert(this.salesOrder_selected_temp[j].item);
            this.salesOrder_selected_temp[j].qty = Number(this.salesOrder_selected_temp[j].qty) + Number(this.salesOrder_selected1[i].qty);
            // alert("break" + i + " "+j)
            match = true;
            break;
          }
        }
        if (!match) {
          this.salesOrder_selected_temp.push(this.salesOrder_selected1[i]);
        }

      }
      console.log(this.salesOrder_selected_temp);
    }
    // alert(this.salesOrder_selected_temp);
  }
  // groupbyQty() {
  //   for (var i = 0; i < this.salesOrder_selected.length; i++) {
  //     if (this.salesOrder_selected[i].item == this.salesOrder_selected[i].item) {
  //       this.salesOrder_selected.splice(i, 1);
  //     }
  //   }
  selectFromAll(key, voucherKey, newQuantity) {
    // console.log(newQuantity);
    // alert("newQuantity: " + newQuantity + "voucherKey: " + key.voucherKey +
    //  "Diff: " + (Number(key.voucherNumber)-Number(newQuantity)));
    console.log("key..." + key);
    if (newQuantity > 0) {
      key.qty = Number(newQuantity);
      this.salesOrder_modified.push(key);
    }
    console.log(this.salesOrder_modified);
    console.log("key..." + key);
    // console.log("voucher number..." + voucherNumber)
    // this.salesOrder_row = key;
    this.salesOrder_selected.push(key);
    // console.log(this.salesOrder_selected);
    console.log(this.salesOrder.length);
    console.log(this.salesOrder_selected.length);
    for (var i = 0; i < this.salesOrder.length; i++) {
      // alert(i);
      if (this.salesOrder[i].voucherKey === voucherKey) {
        // alert(this.salesOrder[i]);
        this.salesOrder.splice(i, 1);
        break;
      }
    }
    console.log(this.salesOrder.length);
    console.log(this.salesOrder_selected.length);
    // this.serverService.updateTallysalesOrder(key)
    // this.serverService.setFlagTallysalesOrder(key)
    //   .subscribe(
    //   // (res: salesOrder) => console.log(res),
    //   (success) => {
    //     console.log("success");
    //     this.refreshList();
    //   },
    //   (error) => console.log(error)
    //   );
  }
  selectFromSelected(key, voucherKey) {
    console.log("key..." + key.voucherKey)
    console.log("voucher number..." + voucherKey)
    // this.salesOrder_row = key;
    this.salesOrder.push(key);
    // console.log(this.salesOrder);
    console.log(this.salesOrder_selected.length);
    console.log(this.salesOrder.length);
    for (var i = 0; i < this.salesOrder_selected.length; i++) {
      // alert(i);
      if (this.salesOrder_selected[i].voucherKey === voucherKey) {
        // alert(this.salesOrder_selected[i]);
        this.salesOrder_selected.splice(i, 1);
        break;
      }
    }
    console.log(this.salesOrder_selected.length);
    console.log(this.salesOrder.length);
  }
  refreshList() {
    // this.subscription = this.serverService.getTallysalesOrder().
    //   subscribe(list => {
    //     this.salesOrder = list;
    //     // console.log(this.salesOrder);
    //     this.showLoader = false;
    //   })
    this.showLoader = false;
    this.salesOrder = [
      {
        voucherKey: 1,
        orderDate: '01012018',
        company: 'Selva Inc',
        item: '16 BF 120 GSM',
        size: 100.5,
        qty: 2.5,
        orderStatus: 0
      },
      {
        voucherKey: 2,
        orderDate: '01012018',
        company: 'Santhosh Inc',
        item: '26 BF 120 GSM',
        size: 90,
        qty: 3,
        orderStatus: 0
      },
      {
        voucherKey: 3,
        orderDate: '02012018',
        company: 'Vanathi Inc',
        item: '16 BF 12 GSM',
        size: 10,
        qty: 2,
        orderStatus: 0
      },
      {
        voucherKey: 4,
        orderDate: '03012018',
        company: 'Sel Inc',
        item: '16 BF 10 GSM',
        size: 100,
        qty: 59,
        orderStatus: 0
      },
      {
        voucherKey: 5,
        orderDate: '01112018',
        company: 'Selva Inc',
        item: '16 BF 120 GSM',
        size: 100,
        qty: 20,
        orderStatus: 0
      },
      {
        voucherKey: 6,
        orderDate: '01012018',
        company: 'Santhosh Inc',
        item: '26 BF 120 GSM',
        size: 90,
        qty: 30,
        orderStatus: 0
      },
      {
        voucherKey: 7,
        orderDate: '02012018',
        company: 'Van Inc',
        item: '16 BF 12 GSM',
        size: 10,
        qty: 2.5,
        orderStatus: 0
      },
      {
        voucherKey: 8,
        orderDate: '03012018',
        company: 'Sel Inc',
        item: '16 BF 10 GSM',
        size: 100,
        qty: 25,
        orderStatus: 0
      }];
  }
}