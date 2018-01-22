// import { Item } from './../../shared/item.model';
import { UserList } from './../../shared/user-list';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ServerService } from './../../shared/server.service';
import { ProdPlan } from './../../shared/prod_plan';
// import { forEach } from '@angular/router/src/utils/collection';

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
  salesOrder_BFGSM: ProdPlan[] = [];
  salesOrder_BFGSMSize: ProdPlan[] = [];
  salesOrder_BF: ProdPlan[] = [];
  // salesOrder_BFGSM =[{item:String,reel:Number}];
  constructor(private serverService: ServerService) {
    this.showLoader = true;
  }

  ngOnInit() {
    this.refreshList();
    // //console.log(this.salesOrder);
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
    this.salesOrder_selected = [];
    this.salesOrder_selected1 = [];
    this.salesOrder_BFGSMSize = [];
    this.salesOrder_BFGSM = [];
    this.salesOrder_BF = [];
    this.salesOrder_modified = [];
    this.refreshList();
    this.showAll = true;
    // this.generateItemBFGSM();
    // this.extractModified();
    // //console.log(this.salesOrder_selected);
    // //console.log(this.salesOrder_modified);
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
  generateItemBFGSM() {
    this.salesOrder_BFGSM = [];
    this.salesOrder_selected1 = this.salesOrder_selected.map(x => Object.assign({}, x));
    if (this.salesOrder_selected1.length >= 1) {
      // alert("inside"+this.salesOrder_selected.length);
      // alert(this.salesOrder_selected[0].item);
      // this.salesOrder_BFGSM[0] = this.salesOrder_selected1[0];
      // alert(this.salesOrder_BFGSM[0].item);
      for (var i = 0; i < this.salesOrder_selected1.length; i++) {
        var match: boolean = false;
        // alert("salesOrder_selected " + i)
        for (var j = 0; j < this.salesOrder_BFGSM.length; j++) {
          // alert("salesOrder_BFGSM " + j)
          if ((this.salesOrder_BFGSM[j].item).trim() === (this.salesOrder_selected1[i].item).trim()) {
            // alert("MAtches " + i + " "+j)
            // this.salesOrder_BFGSM[j].reel;
            // alert(this.salesOrder_BFGSM[j].item);
            var sum = Number(Number(this.salesOrder_BFGSM[j].qty) + Number(this.salesOrder_selected1[i].qty)).toFixed(2);
            this.salesOrder_BFGSM[j].qty = parseFloat(sum);
            // alert("break" + i + " "+j)
            match = true;
            break;
          }
        }
        if (!match) {
          this.salesOrder_BFGSM.push(this.salesOrder_selected1[i]);
        }

      }
      //console.log(this.salesOrder_BFGSM);
    }
    // alert(this.salesOrder_BFGSM);
  }
  generateItemBFGMSSize() {
    this.salesOrder_BFGSMSize = [];
    this.salesOrder_selected1 = this.salesOrder_selected.map(x => Object.assign({}, x));
    if (this.salesOrder_selected1.length >= 1) {
      // this.salesOrder_BFGSMSize[0] = this.salesOrder_selected1[0];
      for (var i = 0; i < this.salesOrder_selected1.length; i++) {
        var match: boolean = false;
        for (var j = 0; j < this.salesOrder_BFGSMSize.length; j++) {
          if ((this.salesOrder_BFGSMSize[j].item.concat(String(this.salesOrder_BFGSMSize[j].size))).trim() === (this.salesOrder_selected1[i].item.concat(String(this.salesOrder_selected1[i].size))).trim()) {
            // this.salesOrder_BFGSMSize[j].reel;
            var sum = Number(Number(this.salesOrder_BFGSMSize[j].qty) + Number(this.salesOrder_selected1[i].qty)).toFixed(2);
            this.salesOrder_BFGSMSize[j].qty = parseFloat(sum)
            match = true;
            break;
          }
        }
        if (!match) {
          this.salesOrder_BFGSMSize.push(this.salesOrder_selected1[i]);
        }
      }
    }
  }
  generateItemBF() {
    this.salesOrder_BF = [];
    var result;
    this.salesOrder_selected1 = this.salesOrder_selected.map(x => Object.assign({}, x));
    if (this.salesOrder_selected1.length >= 1) {
      // this.salesOrder_BF[0] = this.salesOrder_selected1[0];
      for (var i = 0; i < this.salesOrder_selected1.length; i++) {
        var match: boolean = false;
        for (var j = 0; j < this.salesOrder_BF.length; j++) {
          var reg = new RegExp('[0-9]+ (BF)', 'g');
          var item = this.salesOrder_selected1[i].item;
          // while ((result = reg.exec(item.toString())) !== null) {
          //   result = JSON.stringify(result);
          // }
          result = reg.exec(item.toString());
          // alert(result);
          // alert(this.salesOrder_BF[j].item);
          if (this.salesOrder_BF[j].item.includes(result[0])) {
            // this.salesOrder_BF[j].reel;
            // alert("inside");
            var sum = Number(Number(this.salesOrder_BF[j].qty) + Number(this.salesOrder_selected1[i].qty)).toFixed(2);
            this.salesOrder_BF[j].qty = parseFloat(sum);
            match = true;
            break;
          }
        }
        if (!match) {
          this.salesOrder_BF.push(this.salesOrder_selected1[i]);
        }
      }
    }
  }

  selectFromAll(key, voucherKey, newQuantity) {
    // //console.log(newQuantity);
    // alert("newQuantity: " + newQuantity + "voucherKey: " + key.voucherKey +
    //  "Diff: " + (Number(key.voucherNumber)-Number(newQuantity)));
    //console.log("key..." + key);
    if (newQuantity > 0) {
      key.qty = Number(newQuantity);
      this.salesOrder_modified.push(key);
    } 
    //console.log(this.salesOrder_modified);
    //console.log("key..." + key);
    // //console.log("voucher number..." + voucherNumber)
    // this.salesOrder_row = key;
    this.salesOrder_selected.push(key);
    // //console.log(this.salesOrder_selected);
    //console.log(this.salesOrder.length);
    //console.log(this.salesOrder_selected.length);
    for (var i = 0; i < this.salesOrder.length; i++) {
      // alert(i);
      if (this.salesOrder[i].voucherKey === voucherKey) {
        // alert(this.salesOrder[i]);
        this.salesOrder.splice(i, 1);
        break;
      }
    }
    //console.log(this.salesOrder.length);
    //console.log(this.salesOrder_selected.length);
    this.generateItemBFGSM();
    this.generateItemBFGMSSize();
    this.generateItemBF();
    // this.serverService.updateTallysalesOrder(key)
    // this.serverService.setFlagTallysalesOrder(key)
    //   .subscribe(
    //   // (res: salesOrder) => //console.log(res),
    //   (success) => {
    //     //console.log("success");
    //     this.refreshList();
    //   },
    //   (error) => //console.log(error)
    //   );
  }
  selectFromSelected(key, voucherKey) {
    //console.log("key..." + key.voucherKey)
    //console.log("voucher number..." + voucherKey)
    // this.salesOrder_row = key;
    this.salesOrder.push(key);
    // //console.log(this.salesOrder);
    //console.log(this.salesOrder_selected.length);
    //console.log(this.salesOrder.length);
    for (var i = 0; i < this.salesOrder_selected.length; i++) {
      // alert(i);
      if (this.salesOrder_selected[i].voucherKey === voucherKey) {
        // alert(this.salesOrder_selected[i]);
        this.salesOrder_selected.splice(i, 1);
        break;
      }
    }
    this.generateItemBFGSM();
    this.generateItemBFGMSSize();
    this.generateItemBF();
    //console.log(this.salesOrder_selected.length);
    //console.log(this.salesOrder.length);
  }
  refreshList() {
    this.subscription = this.serverService.getSalesOrder().
      subscribe(list => {
        this.salesOrder = list;
        // //console.log(this.salesOrder);
        this.showLoader = false;
      })
    this.showLoader = false;
  }
  maskContent(item) {
    var reg = new RegExp('[0-9]+ (BF)', 'g');
    return reg.exec(item.toString())[0];
  }
}