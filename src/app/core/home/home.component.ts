import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { BfData } from './../../shared/bf_data';
import { GsmData } from './../../shared/gsm_data';
import { Subscription } from 'rxjs/Subscription';
import { ServerService } from './../../shared/server.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
        // alert("cons");
  }

  ngOnInit() {
    this.showGSMGraph("30");
    // alert("nginit");
  }

  showGSMGraph(days: string) {
    // alert("show graph");
    this.showLoader = true;
    this.lineData = [];
    this.subscription = this.serverService.getGSMData(days).
      subscribe(list => {
        this.gsm_data = list;
        this.lineData[0] = ['Type', "Actual", { 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } }];
        // this.lineData[0] = ['Type', "Target", { 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } }, "Actual", { 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } }];
        for (var i = 0; i < this.gsm_data.length; i++) {
          var type = '';
          var actual = this.gsm_data[i].gsmTgt;
          var gsm_tooltip = '<style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td, th {border: 1.5px solid #dddddd;text-align: left;padding: 8px;}</style><table class="table-sm"><tr><td>Date</td><td>' + this.gsm_data[i].voucherEffectiveDate
            + '</td></tr><tr><td>Item</td><td>' + this.gsm_data[i].stockItemName + '</td></tr><tr style="background-color:#b5e7a0"><td>Target</td><td><b>'
            + this.gsm_data[i].gsmTgt + '</td></tr><tr style="background-color:#ffcc5c"><td>Actual</td><td><b>' + this.gsm_data[i].gsmAct + ' </td></tr></table>';
          // var target = this.gsm_data[i].gsmAct;
          this.lineData[i + 1] = [type, actual, gsm_tooltip];
          // this.lineData[i + 1] = [type, target, gsm_tooltip, actual, gsm_tooltip];
        }
        this.showLoader = false;
        // this.title = "GSM variance yearly trend";
        this.showGraph = true;
        this.displayGraph(this.lineData);
      }
      )
  }

  displayGraph(lineData) {
    // alert("disaplay graph");
    this.graphData = {
      chartType: 'SteppedAreaChart',
      dataTable: lineData,
      options: {
        title: this.title,
        tooltip: { isHtml: true },
        width: 1000,
        height: 300,
        colors: ['#87cb16'],
        hAxis: {
          title: 'Date',
          // ticks: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        vAxis: {
          title: 'GSM'
        }
      }
    };
  }
}
