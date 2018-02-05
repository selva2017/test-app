import { SalesOrdersPlanned, SalesOrdersPlanned1 } from './../../shared/sales_orders_planned';
import { Daybook } from './../../shared/daybook';
// import { Item } from './../../shared/item.model';
import { UserList } from './../../shared/user-list';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ServerService } from './../../shared/server.service';
import { ProdPlan } from './../../shared/prod_plan';
import { forEach } from '@angular/router/src/utils/collection';
import { Planned } from 'app/shared/planned';
import { DispatchReport } from 'app/shared/dispatch_report';
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
  consolidatedReport: boolean = false;
  salesOrderUpdated: boolean = false;
  salesOrder_BFGSM: ProdPlan[] = [];
  consolidatedBFGSM: ProdPlan[] = [];
  salesOrder_BFGSMSize: ProdPlan[] = [];
  consolidatedBFGSMSize: ProdPlan[] = [];
  salesOrder_BF: ProdPlan[] = [];
  // salesOrder_BFGSM =[{item:String,reel:Number}];
  showPlanSubmitted: boolean=false;
  submittedPlans: Planned[]=[];
  planSubmitted: Planned[]=[];
salesOrdersPlanned: SalesOrdersPlanned[]=[];
salesOrdersPlanned_row1: SalesOrdersPlanned1[]=[];
salesOrdersPlanned_row2: SalesOrdersPlanned1[]=[];
salesOrdersPlanned_row: SalesOrdersPlanned[]=[];
salesOrder_BFGSMSize1: SalesOrdersPlanned1[]=[];
dispatchSalesOrders: DispatchReport[]=[];

  constructor(private serverService: ServerService) {
    this.showLoader = true;
  //   this.planSubmitted= [
  //     {
  //         plannedDate: "2017-09-21",
  //         batchNumber: "1",
  //         items: [
  //       {
  //         id:"3381",
  //       orderNumber:"1",
  //       voucherKey:"185113090457664",
  //       orderDate:"2018-01-01",
  //       company:"AMBAL AGENCIES",
  //       bf:"16",
  //       gsm:"170",
  //       size:"28.00",
  //       weight:"0.84",
  //       newWeight:"0.84",
  //       reel:"3.00",
  //       orderStatus:"0",
  //       altered:"0"}
  //         ]
  //     }];
  }

  ngOnInit() {
    this.refreshList();
    this.getConsolidatedBFGSM();
    this.getConsolidatedBFGSMSize();
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
    // this.showAll = false;
    this.showAll = !this.showAll;
    this.consolidatedReport = false;
  }
  showConsolidated() {
    this.showAll = false;
    this.salesOrderUpdated = false;
    this.consolidatedReport = true;
  }
  confirmProduction() {
    this.salesOrderUpdated = true;
    this.showAll = true;
    // Send the Completed orders
    // this.salesOrder_selected.forEach(element => {
    // console.log(element);
    // console.log(this.salesOrder_selected);
    // console.log(this.salesOrder_BFGSMSize);
    // this.salesOrder_selected['consBfGSMSize']=JSON.stringify(this.salesOrder_BFGSMSize);
    // this.salesOrder_selected['consBfGSM']=JSON.stringify(this.salesOrder_BFGSM);
    // this.salesOrder_selected['consBf']=JSON.stringify(this.salesOrder_BF);
    // console.log(this.salesOrder_selected);
    this.serverService.completedOrders(this.salesOrder_selected)
      .subscribe(
      (success) => {
        console.log("success");
      },
      (error) => console.log(error)
      );
    // });

    // Send the Incompleted orders
    // this.salesOrder_modified;
    // this.serverService.completedOrders(this.salesOrder_modified)
    //   .subscribe(
    //   (success) => {
    //     console.log("success");
    //   },
    //   (error) => console.log(error)
    //   );
    this.salesOrderUpdated = false;
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
        // alert("salesOrder_selected " + i)"
        for (var j = 0; j < this.salesOrder_BFGSM.length; j++) {
          // alert("salesOrder_BFGSM " + j)
          if ((this.salesOrder_BFGSM[j].bf + "" + this.salesOrder_BFGSM[j].gsm) === (this.salesOrder_selected1[i].bf + "" + this.salesOrder_selected1[i].gsm)) {
            // alert("MAtches " + i + " "+j)
            // this.salesOrder_BFGSM[j].reel;
            // alert(this.salesOrder_BFGSM[j].item);
            var sum = Number(Number(this.salesOrder_BFGSM[j].weight) + Number(this.salesOrder_selected1[i].weight)).toFixed(2);
            this.salesOrder_BFGSM[j].weight = parseFloat(sum);
            // alert("break" + i + " "+j)
            match = true;
            break;
          }
        }
        if (!match) {
          this.salesOrder_BFGSM.push(this.salesOrder_selected1[i]);
        }

      }
    }
    // console.log(this.salesOrder_BFGSM);
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
          if (((this.salesOrder_BFGSMSize[j].bf + "" + this.salesOrder_BFGSMSize[j].gsm).concat(String(this.salesOrder_BFGSMSize[j].size))).trim() === ((this.salesOrder_selected1[i].bf + "" + this.salesOrder_selected1[i].gsm).concat(String(this.salesOrder_selected1[i].size))).trim()) {
            // this.salesOrder_BFGSMSize[j].reel;
            var sum = Number(Number(this.salesOrder_BFGSMSize[j].weight) + Number(this.salesOrder_selected1[i].weight)).toFixed(2);
            this.salesOrder_BFGSMSize[j].weight = parseFloat(sum)
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
          // var reg = new RegExp('[0-9]+ (BF)', 'g');
          var item = this.salesOrder_selected1[i].bf;
          // var item = this.salesOrder_selected1[i].item;
          // while ((result = reg.exec(item.toString())) !== null) {
          //   result = JSON.stringify(result);
          // }
          // result = reg.exec(item.toString());
          // alert(result);
          // alert(this.salesOrder_BF[j].item);
          if ((this.salesOrder_BF[j].bf) === this.salesOrder_selected1[i].bf) {
            // this.salesOrder_BF[j].reel;
            // alert("inside");
            var sum = Number(Number(this.salesOrder_BF[j].weight) + Number(this.salesOrder_selected1[i].weight)).toFixed(2);
            this.salesOrder_BF[j].weight = parseFloat(sum);
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
    this.consolidatedReport=false;
    // //console.log(newQuantity);
    // alert("newQuantity: " + newQuantity + "voucherKey: " + key.voucherKey +
    //  "Diff: " + (Number(key.voucherNumber)-Number(newQuantity)));
    console.log("key..." + key.altered);
    key["altered"] = 0;
    if (newQuantity > 0) {
      var wt=Number(key["weight"])-Number(newQuantity);
      key.weight = Number(newQuantity);
      key["altered"] = 1;
      key["newWeight"]= wt;
      key.reel = this.reel(key["newWeight"],key.size);
      this.salesOrder_modified.push(key);
    }
    // console.log(this.salesOrder_modified);
    //console.log("key..." + key);
    // //console.log("voucher number..." + voucherNumber)
    // this.salesOrder_row = key;
    this.salesOrder_selected.push(key);
    // console.log(this.salesOrder_selected);
    //console.log(this.salesOrder.length);
    //console.log(this.salesOrder_selected.length);
    for (var i = 0; i < this.salesOrder.length; i++) {
      // alert(i);
      if (this.salesOrder[i].id === voucherKey) {
        // if (this.salesOrder[i].voucherKey === voucherKey) {
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
    this.consolidatedReport=false;
    //console.log("key..." + key.voucherKey)
    //console.log("voucher number..." + voucherKey)
    // this.salesOrder_row = key;
    this.salesOrder.push(key);
    // //console.log(this.salesOrder);
    //console.log(this.salesOrder_selected.length);
    //console.log(this.salesOrder.length);
    for (var i = 0; i < this.salesOrder_selected.length; i++) {
      // alert(i);
      if (this.salesOrder_selected[i].id === voucherKey) {
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
    // this.showLoader = true;
    this.subscription = this.serverService.getSalesOrder().
      subscribe(list => {
        this.salesOrder = list;
        // console.log(this.salesOrder);
        // this.showLoader = false;
      })
    this.showLoader = false;
  }
  getConsolidatedBFGSM() {
    this.subscription = this.serverService.getTotalBFGSM().
      subscribe(list => {
        // console.log(this.dataSource.data);
        this.consolidatedBFGSM = list;
      })
    this.showLoader = false;
  }
  getConsolidatedBFGSMSize() {
    this.subscription = this.serverService.getTotalBFGSMSize().
      subscribe(list => {
        // console.log(this.dataSource.data);
        this.consolidatedBFGSMSize = list;
      })
    this.showLoader = false;
  }

  convertReel(weight, size) {
    // var reel: any;
    // reel = ((weight * 1000) / (size * 10));
    // reel = (Math.round(reel * 2) / 2).toFixed(1)
    // return reel;
    // reel = Math.round(reel*2);
    return ((weight * 1000) / (size * 10)).toFixed(3);
    // return reel;
  }
  maskContent(item) {
    var reg = new RegExp('[0-9]+ (BF)', 'g');
    return reg.exec(item.toString())[0];
  }
  reel(weight, size) {
    // var reg = new RegExp('[0-9]+ (BF)', 'g');
    // return reg.exec(weight.toString())[0];
    // var reg = this.convertReel(weight,size);
    // alert("rounded - " + Math.round(weight));
    // alert(weight - Math.round(weight));
    var reel: any;
    reel = ((weight * 1000) / (size * 10));
    // reel = (Math.round(reel * 2) / 2).toFixed(1);

    if (reel > Math.round(reel)) {
      // alert("rounded " + Math.round(weight));
      return Math.round(reel);
    }
    else {
      // alert("rounded " + Math.ceil(weight));
      return Math.ceil(reel);
    }
  }

  deleteSalesOrder(id) {
    this.showLoader=true;
    this.serverService.updateSalesOrderStatus(id)
    .subscribe(
      (success) => {
        this.refreshList();
      },
      (error) => console.log(error)
      );
  }
  productionPlan(record){
    this.showAll = false;
    this.showPlanSubmitted=true;
    this.submittedPlans = record;
    // console.log(this.submittedPlans);    
    
  }
  dispatchInfo(){
  }
  onViewDetails(record){
    // console.log(record);    

  }
  dayBook: Daybook[];
  dayBook_row: Daybook[] = [];
  
  displayProdOrders(){
    this.consolidatedReport=true;
    this.subscription = this.serverService.getSalesOrdersPlanned().
    subscribe(list => {
      this.salesOrdersPlanned = list;
      // console.log(this.salesOrdersPlanned);
      this.showLoader = false;
    })
}
onView(record1,record2,record3,record4) {
  // console.log("record");
  // console.log(record1);
  this.salesOrdersPlanned_row1=[];
  this.salesOrdersPlanned_row1 = record1;
  // console.log(this.salesOrdersPlanned_row1);
  this.salesOrder_BF=[];
  this.salesOrder_BF=record2;
  // console.log(this.salesOrder_BF);
  this.salesOrder_BFGSM=[];
  this.salesOrder_BFGSM=record3;
  // console.log(this.salesOrder_BFGSM);
  this.salesOrder_BFGSMSize=[];
  this.salesOrder_BFGSMSize=record4;
  // console.log(this.salesOrder_BFGSMSize);
  // this.salesOrder_selected = this.salesOrdersPlanned_row1;
  // this.generateItemBFGSM();
  // this.generateItemBFGMSSize1();
  // this.generateItemBF();
}
onViewDispatch(batch_number){
  this.consolidatedReport=true;
  this.subscription = this.serverService.getSalesOrdersDispatch(batch_number).
  subscribe(list => {
    this.dispatchSalesOrders = list;
    // console.log(list);
    // console.log(this.dispatchSalesOrders);
    this.showLoader = false;
  })
}
onClickPrint()
{
  window.print();
} 
generateItemBFGMSSize1() {
// console.log("in");
// console.log(this.salesOrdersPlanned_row1);
this.salesOrder_BFGSMSize1 = [];
this.salesOrdersPlanned_row1 = this.salesOrdersPlanned_row2.map(x => Object.assign({}, x));
    
// console.log("this.salesOrdersPlanned_row1.length" + this.salesOrdersPlanned_row1.length);
if (this.salesOrdersPlanned_row1.length >= 1) {
  for (var i = 0; i < this.salesOrdersPlanned_row1.length; i++) {
    // console.log("inside i");
    // console.log("this.salesOrdersPlanned_row1"+this.salesOrdersPlanned_row1);
    // console.log("this.salesOrder_BFGSMSize1"+this.salesOrder_BFGSMSize1);
    // console.log("this.salesOrder_BFGSMSize1.length "+this.salesOrder_BFGSMSize1.length);
    var match: boolean = false; 
    for (var j = 0; j < this.salesOrder_BFGSMSize1.length; j++) {
      if (((this.salesOrder_BFGSMSize1[j].bf + "" + this.salesOrder_BFGSMSize1[j].gsm).concat(String(this.salesOrder_BFGSMSize1[j].size))).trim() === ((this.salesOrdersPlanned_row1[i].bf + "" + this.salesOrdersPlanned_row1[i].gsm).concat(String(this.salesOrdersPlanned_row1[i].size))).trim()) {
        // console.log("inside j");
        // console.log("this.salesOrdersPlanned_row1"+JSON.stringify(this.salesOrdersPlanned_row1[i]));
        // console.log("this.salesOrder_BFGSMSize1"+JSON.stringify(this.salesOrder_BFGSMSize1[j]));
              // this.salesOrder_BFGSMSize[j].reel;
          var sum = Number(Number(this.salesOrder_BFGSMSize1[j].weight) + Number(this.salesOrdersPlanned_row1[i].weight)).toFixed(2);
          // console.log("this.salesOrder_BFGSMSize1[j] - before");
          // console.log("salesOrder_BFGSMSize1 - weight"+ Number(Number(this.salesOrder_BFGSMSize1[j].weight)));
          // console.log("salesOrdersPlanned_row1 - weight"+Number(this.salesOrdersPlanned_row1[i].weight));
          // console.log("this.salesOrder_BFGSMSize1[j] - before modified");
          // console.log("salesOrder_BFGSMSize1 - ['weight']"+ Number(Number(this.salesOrder_BFGSMSize1[j]['weight'])));
          // console.log("salesOrdersPlanned_row1 - ['weight']"+Number(this.salesOrdersPlanned_row1[i]['weight']));
          
          // console.log("weight - sum - "+sum);
          // console.log(this.salesOrder_BFGSMSize1[j].weight);
          // console.log(JSON.stringify(this.salesOrder_BFGSMSize1[j]));
          this.salesOrder_BFGSMSize1[j].weight = parseFloat(sum);
          // console.log("this.salesOrder_BFGSMSize1[j] - after");
          // console.log(this.salesOrder_BFGSMSize1[j].weight);
          // console.log(JSON.stringify(this.salesOrder_BFGSMSize1[j]));
          match = true;
          // console.log("*************************");
          break;
        }
      }
      if (!match) {
        // console.log("! match");
        // console.log("this.salesOrdersPlanned_row1"+this.salesOrdersPlanned_row1);
        // console.log("this.salesOrder_BFGSMSize1"+this.salesOrder_BFGSMSize1);
    
        this.salesOrder_BFGSMSize1.push(this.salesOrdersPlanned_row1[i]);
        // console.log("! match- after");
        // console.log("this.salesOrdersPlanned_row1"+this.salesOrdersPlanned_row1);
        // console.log("this.salesOrder_BFGSMSize1"+this.salesOrder_BFGSMSize1);
        // console.log("--------------------------");

    }
    }
  }
}
}


