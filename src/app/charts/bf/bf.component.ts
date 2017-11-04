import { Subscription } from 'rxjs/Subscription';
import { ServerService } from './../../shared/server.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { BfData } from './../../shared/bf_data';

@Component({
  selector: 'app-bf',
  templateUrl: './bf.component.html',
  styleUrls: ['./bf.component.css']
})

export class BfComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  bf_data: BfData[];
  // line_data: any[];
  lineData = [];

  constructor(private serverService: ServerService) {
    alert("inside constructor- bf");
    this.subscription = this.serverService.getBFData('0').
      subscribe(list => {
        this.bf_data = list;
        // console.log(this.bf_data);
        // this.convertArray();
        // var lineData: any[];
        this.lineData[0] = ['Type', "Target", "Actual"];
        for (var i = 0; i < this.bf_data.length; i++) {
          var type = this.bf_data[i].voucherEffectiveDate + this.bf_data[i].stockItemName;
          var target = this.bf_data[i].bfAct;
          var actual = this.bf_data[i].bfTgt;
          this.lineData[i + 1] = [type, target, actual];
        }
      }
      )
  }

  ngOnInit() {
    alert("inside ngoninit-bf");
  }

  ngOnDestroy() {
    this.lineData = [];
  }

  convertArray() {
    // var showGraph = true;
    // var lineData: any[][];
    // this.lineData[0] = ['Type', "Target", "Actual"];
    // // console.log(this.lineData);
    // // console.log("this.bf_data");

    // // console.log(this.bf_data);
    // for (var i = 0; i < this.bf_data.length; i++) {
    //   var type = this.bf_data[i].voucherEffectiveDate + this.bf_data[i].stockItemName;
    //   var target = this.bf_data[i].bfAct;
    //   var actual = this.bf_data[i].bfTgt;
    //   this.lineData[i + 1] = [type, target, actual];
    //   // console.log(this.lineData);
    // }
  }

  bfData = {
    chartType: 'LineChart',
    dataTable: this.lineData,
    options: {
      title: 'GSM Variation Datewise',
      // legend: 'none',
      tooltip: { isHtml: true },
      width: 1250,
      height: 500,
      colors: ['green', 'orange']
    }
  };
}
