import { BfData } from './../../shared/bf_data';
import { GsmData } from './../../shared/gsm_data';
import { Subscription } from 'rxjs/Subscription';
import { ServerService } from './../../shared/server.service';
import { Component, OnInit } from '@angular/core';

import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

  showGraph: boolean;
  showLoader: boolean;
  lineData: any[];
  graphData = {};
  subscription: Subscription;
  gsm_data: GsmData[];
  bf_data: BfData[];
  title: string;

  // For the Date Picker
  displayMonths = 2;
  navigation = 'select';
  date1: {};
  date2: {};
  now = new Date();
  // checkBoxValue: boolean;

  constructor(private serverService: ServerService) {
    this.showGraph = false;
  }

  ngOnInit() {
    this.date2 = {year: this.now.getFullYear(), month: this.now.getMonth() + 1, day: this.now.getDate()};
    this.now.setDate(this.now.getDate()-5);
    this.date1 = {year: this.now.getFullYear(), month: this.now.getMonth() + 1, day: this.now.getDate()};
  }

  onClickShowGraph(graph_type){
    // console.log(graph_type);
    // console.log(this.checkBoxValue);
    // console.log(this.date1);
    // console.log(this.date2);
    let model = [this.date1,this.date2]
    // console.log(model);
    graph_type == 'gsm' ? this.showGSMGraph('0') : this.showBFGraph('0');
  }
  showGSMGraph(days: string) {
    this.showLoader = true;
    this.lineData = [];
    this.subscription = this.serverService.getGSMData(days).
      subscribe(list => {
        this.gsm_data = list;
        this.lineData[0] = ['Type', "Target", { 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } }, "Actual", { 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } }];
        for (var i = 0; i < this.gsm_data.length; i++) {
          var type = this.gsm_data[i].voucherEffectiveDate;
          var actual = this.gsm_data[i].gsmTgt;
          var gsm_tooltip = '<style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td, th {border: 1.5px solid #dddddd;text-align: left;padding: 8px;}</style><table class="table-sm"><tr><td>Date</td><td>' + this.gsm_data[i].voucherEffectiveDate
          + '</td></tr><tr><td>Batch</td><td>' + this.gsm_data[i].batchName  
           + '</td></tr><tr><td>Item</td><td>' + this.gsm_data[i].stockItemName + '</td></tr><tr style="background-color:#b5e7a0"><td>Target</td><td><b>'
          + this.gsm_data[i].gsmTgt + '</td></tr><tr style="background-color:#ffcc5c"><td>Actual</td><td><b>' + this.gsm_data[i].gsmAct + ' </td></tr></table>';
          
          // var target_tooltip = '<div>Date: <strong>' + this.gsm_data[i].voucherEffectiveDate + '</strong><br>Item: <strong>' + this.gsm_data[i].stockItemName
          //   + '</strong></br><div style="color:Green;">Target: <strong>' + this.gsm_data[i].gsmTgt + '</strong></div><div style="color:Blue;">Actual: <strong>' + this.gsm_data[i].gsmAct + '</strong></div> </div>';
          // var target_tooltip = '<div><strong>2010</strong><br>Date: <strong>00/00/0000</strong><br>Sales: <strong>$600</strong></div>';
          // var target_tooltip = "Date: " + this.gsm_data[i].voucherEffectiveDate + ", Item: " + this.gsm_data[i].stockItemName + ", Target:" + this.gsm_data[i].gsmTgt + " vs Actual:" + this.gsm_data[i].gsmAct;
          var target = this.gsm_data[i].gsmAct;
          // var actual_tooltip = '<div>Date: <strong>' + this.gsm_data[i].voucherEffectiveDate + '</strong><br>Item: <strong>' + this.gsm_data[i].stockItemName
          // + '</strong></br>Target: <strong>' + this.gsm_data[i].gsmTgt + '</strong><br>Actual: <strong>' + this.gsm_data[i].gsmAct + '</strong > </div>';
          // var actual_tooltip = "Date: " + this.gsm_data[i].voucherEffectiveDate + ", Item: " + this.gsm_data[i].stockItemName + ", Target:" + this.gsm_data[i].gsmTgt + " vs Actual:" + this.gsm_data[i].gsmAct;
          this.lineData[i + 1] = [type, target, gsm_tooltip, actual, gsm_tooltip];
        }
        this.showLoader = false;
        this.title = "GSM variance trend";
        this.showGraph = true;
        this.displayGraph(this.lineData);
      }
      )
  }

  showBFGraph(days: string) {
    this.showLoader = true;
    this.lineData = [];
    this.subscription = this.serverService.getBFData(days).
      subscribe(list => {
        this.bf_data = list;
        this.lineData[0] = ['Type', "Target", { 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } }, "Actual", { 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } }];
        for (var i = 0; i < this.bf_data.length; i++) {
          var type = this.bf_data[i].voucherEffectiveDate;
          var actual = this.bf_data[i].bfTgt;
          // var bf_tooltip = '<div>Date: <strong>' + this.bf_data[i].voucherEffectiveDate + '</strong><br>Item: <strong>' + this.bf_data[i].stockItemName 
          // + '</strong></br><div style="color:Green;">Target: <strong>' + this.bf_data[i].bfTgt + '</strong></div><div style="color:Blue;">Actual: <strong>' + this.bf_data[i].bfAct + '</strong></div> </div>';
          var bf_tooltip = '<style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td, th {border: 1.5px solid #dddddd;text-align: left;padding: 8px;}</style><table class="table-sm"><tr><td>Date</td><td>' + this.bf_data[i].voucherEffectiveDate
          + '</td></tr><tr><td>Batch</td><td>' + this.bf_data[i].batchName  
          + '</td></tr><tr><td>Item</td><td>' + this.bf_data[i].stockItemName + '</td></tr><tr style="background-color:#b5e7a0"><td>Target</td><td><b>'
            + this.bf_data[i].bfTgt + '</td></tr><tr style="background-color:#ffcc5c"><td>Actual</td><td><b>' + this.bf_data[i].bfAct + ' </td></tr></table>';
          var target = this.bf_data[i].bfAct;
          this.lineData[i + 1] = [type, target, bf_tooltip, actual, bf_tooltip];
        }
        this.showLoader = false;
        this.title = "BF variance trend";
        this.showGraph = true;
        this.displayGraph(this.lineData);
      }
      )
  }

  // viewBFGraph() {
  //   // alert("BF Graph");
  //   this.showLoader = true;
  //   var lineData = [];
  //   this.subscription = this.serverService.getTallyBFData().
  //     subscribe(list => {
  //       this.bf_data = list;
  //       // console.log(this.gsm_data);
  //       // this.convertArray();
  //       // var lineData: any[];
  //       lineData[0] = ['Type', "Target", "Actual"];
  //       for (var i = 0; i < this.bf_data.length; i++) {
  //         var type = this.bf_data[i].voucherEffectiveDate + this.bf_data[i].stockItemName;
  //         var type = this.bf_data[i].voucherEffectiveDate + " " + this.bf_data[i].stockItemName;
  //         var target = this.bf_data[i].bfAct;
  //         var actual = this.bf_data[i].bfTgt;
  //         lineData[i + 1] = [type, target, actual];
  //       }
  //       this.showGraph = true;
  //       this.showLoader = false;
  //       this.title = "BF variance yearly trend";
  //       this.displayGraph(lineData);
  //     }
  //     )
  //   // var lineData = [
  //   //   ["type", "Target", "Actual"],
  //   //   ["2017-10-02120 GSM 100.5CM", 120.00, 120.00],
  //   //   ["2017-10-02120 GSM 91.5CM", 127.00, 127.00]]
  //   // this.showGraph = true;
  //   // this.displayGraph(lineData);
  //   // lineData = [];
  //   // this.showGraph = false;
  // }

  // weeklyBFGraph() {
  //   // alert("BF Graph");
  //   this.showLoader = true;
  //   var lineData = [];
  //   this.subscription = this.serverService.getWeeklyBFData().
  //     subscribe(list => {
  //       this.bf_data = list;
  //       // console.log(this.gsm_data);
  //       // this.convertArray();
  //       // var lineData: any[];
  //       lineData[0] = ['Type', "Target", "Actual"];
  //       for (var i = 0; i < this.bf_data.length; i++) {
  //         var type = this.bf_data[i].voucherEffectiveDate + this.bf_data[i].stockItemName;
  //         var type = this.bf_data[i].voucherEffectiveDate + " " + this.bf_data[i].stockItemName;
  //         var target = this.bf_data[i].bfAct;
  //         var actual = this.bf_data[i].bfTgt;
  //         lineData[i + 1] = [type, target, actual];
  //       }
  //       this.showGraph = true;
  //       this.showLoader = false;
  //       this.title = "BF variance weekly";
  //       this.displayGraph(lineData);
  //     }
  //     )
  // }

  // monthlyBFGraph() {
  //   // alert("BF Graph");
  //   this.showLoader = true;
  //   var lineData = [];
  //   this.subscription = this.serverService.getMonthlyBFData().
  //     subscribe(list => {
  //       this.bf_data = list;
  //       // console.log(this.gsm_data);
  //       // this.convertArray();
  //       // var lineData: any[];
  //       lineData[0] = ['Type', "Target", "Actual"];
  //       for (var i = 0; i < this.bf_data.length; i++) {
  //         var type = this.bf_data[i].voucherEffectiveDate + this.bf_data[i].stockItemName;
  //         var type = this.bf_data[i].voucherEffectiveDate + " " + this.bf_data[i].stockItemName;
  //         var target = this.bf_data[i].bfAct;
  //         var actual = this.bf_data[i].bfTgt;
  //         lineData[i + 1] = [type, target, actual];
  //       }
  //       this.showGraph = true;
  //       this.showLoader = false;
  //       this.title = "BF variance monthly trend";
  //       this.displayGraph(lineData);
  //     }
  //     )
  // }
  displayGraph(lineData) {
    this.graphData = {
      chartType: 'ComboChart',
      dataTable: lineData,
      options: {
        title: this.title,
        // legend: 'none',
        tooltip: { isHtml: true },
        width: 1080,
        height: 500,
        colors: ['green', 'orange'],
        hAxis: {
          title: 'Date'
          // ticks: [100,200]
        },
        vAxis: {
          title: 'GSM'
        }
      }
    };
  }
}
