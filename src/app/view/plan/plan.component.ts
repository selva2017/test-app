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
  templateUrl: './plan.component.html?v=${new Date().getTime()}',
  styleUrls: ['./plan.component.css?v=${new Date().getTime()}']
})
export class PlanComponent implements OnInit {
  calcReel: Number;
  test: String;
  subscription: Subscription;
  salesOrder: ProdPlan[];
  salesOrderRestore: ProdPlan[];
  salesOrder_selected: ProdPlan[] = [];
  salesOrder_selected1: ProdPlan[] = [];
  salesOrder_row: ProdPlan[] = [];
  salesOrder_modified: ProdPlan[] = [];
  showLoader: boolean;
  salesOrder_BFGSM: ProdPlan[] = [];
  consolidatedBFGSM: ProdPlan[] = [];
  salesOrder_BFGSMSize: ProdPlan[] = [];
  consolidatedBFGSMSize: ProdPlan[] = [];
  salesOrder_BF: ProdPlan[] = [];
  // salesOrder_BFGSM =[{item:String,reel:Number}];
  showAllSalesOrders: boolean = true;
  showSelectedOrders: boolean = false;
  showConsolidatedReports: boolean = false;
  // salesOrderUpdated: boolean = false;
  showProductionPlans: boolean = false;
  modifyProductionPlan: boolean = false;
  showProductionPlansModify: boolean = false;
  showDeleteSalesOrder: boolean = false;
  showRestoreSalesOrder: boolean = false;
  submittedPlans: Planned[] = [];
  planSubmitted: Planned[] = [];
  salesOrdersPlanned: SalesOrdersPlanned[] = [];
  salesOrdersPlanned_row1: SalesOrdersPlanned1[] = [];
  salesOrdersPlanned_row2: SalesOrdersPlanned1[] = [];
  salesOrdersPlanned_row: SalesOrdersPlanned[] = [];
  salesOrder_BFGSMSize1: SalesOrdersPlanned1[] = [];
  dispatchSalesOrders: DispatchReport[] = [];
  dispatchHeader: string;
  batch_number = "";

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
    // this.showLoader=true;
    this.refreshActiveList();
    this.getConsolidatedBFGSM();
    this.getConsolidatedBFGSMSize();
    // //console.log(this.salesOrder);
  }
  displayINR(amount: number) {
    // return String(Number(amount).toLocaleString('en-IN'));
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  }

  // onClickView(record) {
  //   this.salesOrder_row = record;
  // }
  testKeyup(reel) {
    this.test = reel;
    // console.log(reel);
  }
  clearAll() {
    this.salesOrder_selected = [];
    this.salesOrder_selected1 = [];
    this.salesOrder_BFGSMSize = [];
    this.salesOrder_BFGSM = [];
    this.salesOrder_BF = [];
    this.salesOrder_modified = [];
    this.refreshActiveList();
    this.showAllSalesOrders = true;
    this.showSelectedOrders = false;
    this.showConsolidatedReports = false;
    this.showProductionPlans = false;
    this.modifyProductionPlan = false;
    this.showProductionPlansModify = false;
    this.showDeleteSalesOrder = false;
    this.showRestoreSalesOrder = false;
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
  stockReel(reelInStock, row) {
    // console.log(reelInStock);
    var newReel = row.reel - reelInStock;
    for (var j = 0; j < this.salesOrder_BFGSMSize.length; j++) {
      if (this.salesOrder_BFGSMSize[j].id === row.id) {
        // this.salesOrder_BFGSMSize[j].reel;
        // console.log(this.salesOrder_BFGSMSize[j]);
        this.salesOrder_BFGSMSize[j].reel = String(newReel);
        this.salesOrder_BFGSMSize[j].reelInStock = String(reelInStock);
        // console.log(this.salesOrder_BFGSMSize[j]);
        break;
      }
    }
    this.salesOrder_BFGSMSize.slice();
  }
  changeWeight(row1, newWeight, size) {
    row1.newReel = this.calcReel;
    this.calcReel = this.reel(newWeight, size);
    // if ((newWeight) && (Number(newWeight) > Number(weight))){
    //   alert("Your Weight should be less than Order weight: "+ weight + "tons");
    // }
  }
  modifyReel(row, reel) {
    if (reel > 0) {
      this.salesOrder_selected[row.id]['reel'] = reel;
    }
    // console.log(this.salesOrder_modified);
    //console.log("key..." + key);
    // //console.log("voucher number..." + voucherNumber)
    // this.salesOrder_row = key;

  }
  sumReels(reel, reelInstock) {
    return (Number(reel) + Number(reelInstock));
  }
  updatePlannedSalesOrder(id, reel) {
    // console.log(id,reel);
    this.serverService.updateProductionPlanItemReel(id, reel)
      .subscribe(
      // (res: Daybook) => console.log(res),
      (success) => {
        // console.log("success");
        this.onViewProductionPlans();
        // this.refreshActiveList();
      },
      (error) => console.log(error)
      );

  }
  selectFromAll(key, voucherKey, newWeight) {
    this.showConsolidatedReports = false;
    // //console.log(newWeight);
    // alert("newWeight: " + newWeight + "voucherKey: " + key.voucherKey +
    //  "Diff: " + (Number(key.voucherNumber)-Number(newWeight)));
    // console.log("key..." + key.reel);
    // console.log("key...weight" + key.weight);
    // console.log("key...new weight" + key.newWeight);
    key["altered"] = 0;
    if (newWeight > 0) {
      var wt = Number(key["weight"]) - Number(newWeight);
      key.weight = Number(newWeight);
      key["altered"] = 1;
      key["newWeight"] = wt;
      // console.log(key["newWeight"]);
      // console.log(key["size"]);
      key['reel'] = this.reel(newWeight, key['size']);
      // console.log(key['reel']);
      // console.log(key.reel);
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
    //     this.refreshActiveList();
    //   },
    //   (error) => //console.log(error)
    //   );
  }
  selectFromSelected(key, voucherKey) {
    this.showConsolidatedReports = false;
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
  refreshActiveList() {
    // this.salesOrder = [];
    // this.showLoader = true;
    this.subscription = this.serverService.getActiveSalesOrders().
      subscribe(list => {
        this.salesOrder = list;
        // console.log(this.salesOrder);
        this.showLoader = false;
      })
    // this.showLoader = false;
  }
  refreshInActiveList() {
    this.salesOrderRestore = [];
    // this.showLoader = true;
    this.subscription = this.serverService.getInActiveSalesOrders().
      subscribe(list => {
        this.salesOrderRestore = list;
        // console.log(this.salesOrder);
        this.showLoader = false;
      })
    // this.showLoader = false;
  }

  getConsolidatedBFGSM() {
    this.subscription = this.serverService.getTotalBFGSM().
      subscribe(list => {
        // console.log(this.dataSource.data);
        this.consolidatedBFGSM = list;
      })
    // this.showLoader = false;
  }
  getConsolidatedBFGSMSize() {
    this.subscription = this.serverService.getTotalBFGSMSize().
      subscribe(list => {
        // console.log(this.dataSource.data);
        this.consolidatedBFGSMSize = list;
      })
    // this.showLoader = false;
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
    // this.showLoader=true;
    this.serverService.removeSalesOrderStatus(id)
      .subscribe(
      (success) => {
        this.refreshActiveList();
      },
      (error) => console.log(error)
      );
  }
  restoreSalesOrder(id) {
    this.showLoader=true;
    this.serverService.restoreSalesOrderStatus(id)
      .subscribe(
      (success) => {
        this.refreshInActiveList();
      },
      (error) => console.log(error)
      );
  }
  productionPlan(record) {
    this.showAllSalesOrders = false;
    this.showProductionPlans = true;
    this.submittedPlans = record;
    // console.log(this.submittedPlans);    

  }
  dispatchInfo() {
  }
  dayBook: Daybook[];
  dayBook_row: Daybook[] = [];

  onViewShowAll() {
    this.showAllSalesOrders = true;
    this.showSelectedOrders = false;
    this.showProductionPlans = false;
    this.showProductionPlansModify = false;
    this.modifyProductionPlan = false;
    this.showDeleteSalesOrder = false;
    this.showRestoreSalesOrder = false;
    this.showConsolidatedReports = false;
  }
  onViewShowSelected() {
    this.showSelectedOrders = true;
    this.showAllSalesOrders = false;
    this.showProductionPlans = false;
    this.showProductionPlansModify = false;
    this.modifyProductionPlan = false;
    this.showDeleteSalesOrder = false;
    this.showRestoreSalesOrder = false;
    this.showConsolidatedReports = false;
  }
  onViewConsolidatedReports() {
    this.showConsolidatedReports = true;
    this.showAllSalesOrders = false;
    this.showSelectedOrders = false;
    this.showProductionPlans = false;
    this.showProductionPlansModify = false;
    this.modifyProductionPlan = false;
    this.showDeleteSalesOrder = false;
    this.showRestoreSalesOrder = false;
  }
  confirmProduction() {
    this.onViewShowAll();
    // this.showAllSalesOrders = true;
    // this.showConsolidatedReports = false;
    // this.showSelectedOrders = false;
    // this.showProductionPlans = false;
    // this.showRestoreSalesOrder = false;
    // this.showProductionPlansModify = false;

    // Send the Completed orders
    // this.salesOrder_selected.forEach(element => {
    // console.log(element);
    // console.log(this.salesOrder_selected);
    // console.log(this.salesOrder_BFGSMSize);
    // this.salesOrder_selected['consBfGSMSize']=JSON.stringify(this.salesOrder_BFGSMSize);
    // this.salesOrder_selected['consBfGSM']=JSON.stringify(this.salesOrder_BFGSM);
    // this.salesOrder_selected['consBf']=JSON.stringify(this.salesOrder_BF);
    console.log(this.salesOrder_selected);
    this.serverService.createProductionPlan(this.salesOrder_selected)
      .subscribe(
      (success) => {
        console.log("success");
        this.clearAll();
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
    // this.salesOrderUpdated = false;
  }

  onViewProductionPlans() {
    this.showProductionPlans = true;
    this.showAllSalesOrders = false;
    this.showSelectedOrders = false;
    this.showProductionPlansModify = false;
    this.modifyProductionPlan = false;
    this.showDeleteSalesOrder = false;
    this.showRestoreSalesOrder = false;
    this.showConsolidatedReports = false;
    this.salesOrdersPlanned = [];
    this.subscription = this.serverService.getSalesOrdersPlanned().
      subscribe(list => {
        this.salesOrdersPlanned = list;
        // console.log(this.salesOrdersPlanned);
        // this.showLoader = false;
      })
  }
  onEditProductionPlans() {
    this.salesOrdersPlanned = [];
    this.showProductionPlansModify = true;
    this.showAllSalesOrders = false;
    this.showSelectedOrders = false;
    this.showProductionPlans = false;
    this.modifyProductionPlan = false;
    this.showDeleteSalesOrder = false;
    this.showRestoreSalesOrder = false;
    this.showConsolidatedReports = false;

    this.subscription = this.serverService.getSalesOrdersPlanned().
      subscribe(list => {
        this.salesOrdersPlanned = list;
        // console.log(this.salesOrdersPlanned);
        // this.showLoader = false;
      })
  }
  onModifyPlannedReports(record1, record2, record3, record4, createdDate, batch_number) {
    this.batch_number = batch_number;
    this.dispatchHeader = "Production Planned Date : " + createdDate + "     Batch No : " + batch_number;

    this.modifyProductionPlan = true;
    this.showAllSalesOrders = false;
    this.showSelectedOrders = false;
    this.showProductionPlans = false;
    this.showProductionPlansModify = false;
    this.showDeleteSalesOrder = false;
    this.showRestoreSalesOrder = false;
    this.showConsolidatedReports = false;

    this.salesOrdersPlanned_row1 = [];
    this.salesOrdersPlanned_row1 = record1;
    // console.log(this.salesOrdersPlanned_row1);
    this.salesOrder_BF = [];
    this.salesOrder_BF = record2;
    // console.log(this.salesOrder_BF);
    this.salesOrder_BFGSM = [];
    this.salesOrder_BFGSM = record3;
    // console.log(this.salesOrder_BFGSM);
    this.salesOrder_BFGSMSize = [];
    this.salesOrder_BFGSMSize = record4;
  }
  onViewProductionReportModel(record1, record2, record3, record4) {
    // this.modifyProductionPlan = true;
    // this.showAllSalesOrders = false;
    // this.showSelectedOrders = false;
    // this.showProductionPlans = false;
    // this.showProductionPlansModify = false;
    // this.showDeleteSalesOrder= false;
    // this.showRestoreSalesOrder = false;
    // this.showConsolidatedReports = false;

    // console.log("record");
    // console.log(record1);
    this.salesOrdersPlanned_row1 = [];
    this.salesOrdersPlanned_row1 = record1;
    // console.log(this.salesOrdersPlanned_row1);
    this.salesOrder_BF = [];
    this.salesOrder_BF = record2;
    // console.log(this.salesOrder_BF);
    this.salesOrder_BFGSM = [];
    this.salesOrder_BFGSM = record3;
    // console.log(this.salesOrder_BFGSM);
    this.salesOrder_BFGSMSize = [];
    this.salesOrder_BFGSMSize = record4;
    // console.log(this.salesOrder_BFGSMSize);
    // this.salesOrder_selected = this.salesOrdersPlanned_row1;
    // this.generateItemBFGSM();
    // this.generateItemBFGMSSize1();
    // this.generateItemBF();
  }
  onDeleteProductionPlanItem(row) {
    this.showProductionPlansModify = true;
    this.showAllSalesOrders = false;
    this.showSelectedOrders = false;
    this.showProductionPlans = false;
    this.modifyProductionPlan = false;
    this.showDeleteSalesOrder = false;
    this.showRestoreSalesOrder = false;
    this.showConsolidatedReports = false;

    this.serverService.deleteProductionPlanItem(row.id, row.salesOrderPlannedId, row.altered, row.weight)
      .subscribe(
      (success) => {
        this.refreshActiveList();
        this.onEditProductionPlans();
      },
      (error) => console.log(error)
      );

  }
  onRestoreSalesReports() {
    this.showRestoreSalesOrder = true;
    this.showAllSalesOrders = false;
    this.showSelectedOrders = false;
    this.showProductionPlans = false;
    this.showProductionPlansModify = false;
    this.modifyProductionPlan = false;
    this.showDeleteSalesOrder = false;
    this.showConsolidatedReports = false;

    this.salesOrderRestore = [];
    // this.showLoader = true;
    this.subscription = this.serverService.getInActiveSalesOrders().
      subscribe(list => {
        this.salesOrderRestore = list;
        // console.log(this.salesOrder);
        // this.showLoader = false;
      })
  }
  onDeleteSalesOrders() {
    this.refreshActiveList();
    this.showDeleteSalesOrder = true;
    this.showAllSalesOrders = false;
    this.showSelectedOrders = false;
    this.showProductionPlans = false;
    this.showProductionPlansModify = false;
    this.modifyProductionPlan = false;
    this.showRestoreSalesOrder = false;
    this.showConsolidatedReports = false;
  }
  onclick() {
    console.log("inside")
  }
  onAddItemToExistingProductionPlan(key, voucherKey, newWeight) {
    console.log(key, voucherKey, newWeight);
    console.log(this.batch_number);
    // this.showConsolidatedReports = false;
    key["altered"] = 0;
    if (newWeight > 0) {
      var wt = Number(key["weight"]) - Number(newWeight);
      key.weight = Number(newWeight);
      key["altered"] = 1;
      key["newWeight"] = wt;
      key['reel'] = this.reel(newWeight, key['size']);
      this.salesOrder_modified.push(key);
    }
    this.salesOrder_selected.push(key);
    for (var i = 0; i < this.salesOrder.length; i++) {
      if (this.salesOrder[i].id === voucherKey) {
        this.salesOrder.splice(i, 1);
        break;
      }
    }
    // this.generateItemBFGSM();
    // this.generateItemBFGMSSize();
    // this.generateItemBF();

    this.serverService.addItemToExistingProductionPlan(this.salesOrder_selected, this.batch_number)
      .subscribe(
      (success) => {
        console.log("success");
        this.refreshActiveList();
        this.onEditProductionPlans();
      },
      (error) => console.log(error)
      );
    // this.clearAll();
  }
  onViewDispatchModel(batch_number, createdDate) {
    this.batch_number = batch_number;
    this.dispatchHeader = "Production Planned Date : " + createdDate + "     Batch No : " + batch_number;
    // this.showConsolidatedReports = true;
    this.subscription = this.serverService.getSalesOrdersDispatch(batch_number).
      subscribe(list => {
        this.dispatchSalesOrders = list;
        // console.log(list);
        // console.log(this.dispatchSalesOrders);
        // this.showLoader = false;
      })
  }
  onClickPrint() {
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