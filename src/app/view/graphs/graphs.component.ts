import { BfData } from './../../shared/bf_data';
import { GsmData } from './../../shared/gsm_data';
import { Subscription } from 'rxjs/Subscription';
import { ServerService } from './../../shared/server.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(private serverService: ServerService) {
    this.showGraph = false;
  }

  ngOnInit() {
  }

  showGSMYearly() {
    this.showLoader = true;
    this.lineData = [];
    this.subscription = this.serverService.getTallyGSMData().
      subscribe(list => {
        this.gsm_data = list;
        this.lineData[0] = ['Type', "Target", { 'type': 'string', 'role': 'tooltip', 'p': { 'html': false } }, "Actual", { 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } }];
        for (var i = 0; i < this.gsm_data.length; i++) {
          var type = this.gsm_data[i].voucherEffectiveDate;
          var actual = this.gsm_data[i].gsmTgt;
          var target_tooltip = "Date: " + this.gsm_data[i].voucherEffectiveDate + ", Item: " + this.gsm_data[i].stockItemName + ", Target:" + this.gsm_data[i].gsmTgt + " vs Actual:" + this.gsm_data[i].gsmAct;
          var target = this.gsm_data[i].gsmAct;
          var actual_tooltip = "Date: " + this.gsm_data[i].voucherEffectiveDate + ", Item: " + this.gsm_data[i].stockItemName + ", Target:" + this.gsm_data[i].gsmTgt + " vs Actual:" + this.gsm_data[i].gsmAct;
          this.lineData[i + 1] = [type, target, target_tooltip, actual, actual_tooltip];
        }
        this.showLoader = false;
        this.title = "GSM variance yearly trend";
        this.showGraph = true;
        this.displayGraph(this.lineData);
      }
      )
  }

  monthlyGSMGraph() {
    // this.subscription = this.serverService.getMonthlyGSMData().
  }
  weeklyGSMGraph() {
    // this.subscription = this.serverService.getWeeklyGSMData().
  }

  showBFYearly() {
    this.showLoader = true;
    this.lineData = [];
    this.subscription = this.serverService.getTallyBFData().
      subscribe(list => {
        this.bf_data = list;
        this.lineData[0] = ['Type', "Target", { 'type': 'string', 'role': 'tooltip', 'p': { 'html': false } }, "Actual", { 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } }];
        for (var i = 0; i < this.bf_data.length; i++) {
          var type = this.bf_data[i].voucherEffectiveDate;
          var actual = this.bf_data[i].bfTgt;
          var target_tooltip = "Date: " + this.bf_data[i].voucherEffectiveDate + ", Item: " + this.bf_data[i].stockItemName + ", Target:" + this.bf_data[i].bfTgt + " vs Actual:" + this.bf_data[i].bfAct;
          var target = this.bf_data[i].bfAct;
          var actual_tooltip = "Date: " + this.bf_data[i].voucherEffectiveDate + ", Item: " + this.bf_data[i].stockItemName + ", Target:" + this.bf_data[i].bfTgt + " vs Actual:" + this.bf_data[i].bfAct;
          this.lineData[i + 1] = [type, target, target_tooltip, actual, actual_tooltip];
        }
        this.showLoader = false;
        this.title = "BF variance yearly trend";
        this.showGraph = true;
        this.displayGraph(this.lineData);
      }
      )
  }

  viewBFGraph() {
    // alert("BF Graph");
    this.showLoader = true;
    var lineData = [];
    this.subscription = this.serverService.getTallyBFData().
      subscribe(list => {
        this.bf_data = list;
        // console.log(this.gsm_data);
        // this.convertArray();
        // var lineData: any[];
        lineData[0] = ['Type', "Target", "Actual"];
        for (var i = 0; i < this.bf_data.length; i++) {
          var type = this.bf_data[i].voucherEffectiveDate + this.bf_data[i].stockItemName;
          var type = this.bf_data[i].voucherEffectiveDate + " " + this.bf_data[i].stockItemName;
          var target = this.bf_data[i].bfAct;
          var actual = this.bf_data[i].bfTgt;
          lineData[i + 1] = [type, target, actual];
        }
        this.showGraph = true;
        this.showLoader = false;
        this.title = "BF variance yearly trend";
        this.displayGraph(lineData);
      }
      )
    // var lineData = [
    //   ["type", "Target", "Actual"],
    //   ["2017-10-02120 GSM 100.5CM", 120.00, 120.00],
    //   ["2017-10-02120 GSM 91.5CM", 127.00, 127.00]]
    // this.showGraph = true;
    // this.displayGraph(lineData);
    // lineData = [];
    // this.showGraph = false;
  }

  weeklyBFGraph() {
    // alert("BF Graph");
    this.showLoader = true;
    var lineData = [];
    this.subscription = this.serverService.getWeeklyBFData().
      subscribe(list => {
        this.bf_data = list;
        // console.log(this.gsm_data);
        // this.convertArray();
        // var lineData: any[];
        lineData[0] = ['Type', "Target", "Actual"];
        for (var i = 0; i < this.bf_data.length; i++) {
          var type = this.bf_data[i].voucherEffectiveDate + this.bf_data[i].stockItemName;
          var type = this.bf_data[i].voucherEffectiveDate + " " + this.bf_data[i].stockItemName;
          var target = this.bf_data[i].bfAct;
          var actual = this.bf_data[i].bfTgt;
          lineData[i + 1] = [type, target, actual];
        }
        this.showGraph = true;
        this.showLoader = false;
        this.title = "BF variance weekly";
        this.displayGraph(lineData);
      }
      )
  }

  monthlyBFGraph() {
    // alert("BF Graph");
    this.showLoader = true;
    var lineData = [];
    this.subscription = this.serverService.getMonthlyBFData().
      subscribe(list => {
        this.bf_data = list;
        // console.log(this.gsm_data);
        // this.convertArray();
        // var lineData: any[];
        lineData[0] = ['Type', "Target", "Actual"];
        for (var i = 0; i < this.bf_data.length; i++) {
          var type = this.bf_data[i].voucherEffectiveDate + this.bf_data[i].stockItemName;
          var type = this.bf_data[i].voucherEffectiveDate + " " + this.bf_data[i].stockItemName;
          var target = this.bf_data[i].bfAct;
          var actual = this.bf_data[i].bfTgt;
          lineData[i + 1] = [type, target, actual];
        }
        this.showGraph = true;
        this.showLoader = false;
        this.title = "BF variance monthly trend";
        this.displayGraph(lineData);
      }
      )
  }
  displayGraph(lineData) {
    this.graphData = {
      chartType: 'LineChart',
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
