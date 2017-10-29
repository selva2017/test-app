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
  // lineData: any[];
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
  
  viewGSMGraph() {
    this.showLoader = true;
    // alert("GSM Graph");
    var lineData = [];
    this.subscription = this.serverService.getTallyGSMData().
    subscribe(list => {
      this.gsm_data = list;
      // console.log(this.gsm_data);
      // this.convertArray();
      // var lineData: any[];
      lineData[0] = ['Type', "Target", "Actual"];
      for (var i = 0; i < this.gsm_data.length; i++) {
        var type = this.gsm_data[i].voucherEffectiveDate + this.gsm_data[i].stockItemName;
        var target = this.gsm_data[i].gsmAct;
        var actual = this.gsm_data[i].gsmTgt;
        lineData[i + 1] = [type, target, actual];
      }
      this.showGraph = true;
      this.showLoader = false;
      this.title = "GSM variance yearly trend";
      this.displayGraph(lineData);
    }
  )
  // var lineData = [
    //   ["type", "Target", "Actual"],
    //   ["2017-10-02120 GSM 100.5CM", 120.00, 120.00],
    //   ["2017-10-02120 GSM 91.5CM", 117.00, 112.00]]
    // this.showGraph = true;
    // this.displayGraph(lineData);
    // alert(lineData);
    // lineData = [];
    // this.showGraph = false;
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
        colors: ['green', 'orange']
      }
    };
  }
}
