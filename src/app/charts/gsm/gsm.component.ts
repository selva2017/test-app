import { GsmData } from './../../shared/gsm_data';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServerService } from './../../shared/server.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-gsm',
  templateUrl: './gsm.component.html',
  styleUrls: ['./gsm.component.css']
})
export class GsmComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  gsm_data: GsmData[];
  // line_data: any[];
  lineData = [];

  constructor(private serverService: ServerService) {
    alert("inside constructor gsm");
    this.subscription = this.serverService.getTallyGSMData().
      subscribe(list => {
        this.gsm_data = list;
        // console.log(this.gsm_data);
        // this.convertArray();
        // var lineData: any[];
        this.lineData[0] = ['Type', "Target", "Actual"];
        for (var i = 0; i < this.gsm_data.length; i++) {
          var type = this.gsm_data[i].voucherEffectiveDate + this.gsm_data[i].stockItemName;
          var target = this.gsm_data[i].gsmAct;
          var actual = this.gsm_data[i].gsmTgt;
          this.lineData[i + 1] = [type, target, actual];
        }
      }
      )
  }

  ngOnInit() {
    alert("inside ngoninit gsm");
  }

  ngOnDestroy(){
    this.lineData=[];
  }
  // lineData = [
  // ["type", "Target", "Actual"]
  // ["2017-10-02120 GSM 100.5CM", 119.00, 120.00],
  // ["2017-10-02120 GSM 91.5CM", 117.00, 120.00],
  // ["2017-10-02120 GSM 96.5CM", 118.00, 120.00],
  // ["2017-10-02120 GSM 100.5CM", 120.00, 120.00],
  // ["2017-10-02120 GSM 89 CM", 120.00, 120.00]
  // ];

  convertArray() {
    var showGraph = true;
    var lineData: any[][];
    this.lineData[0] = ['Type', "Target", "Actual"];
    // console.log(this.lineData);
    // console.log("this.gsm_data");

    // console.log(this.gsm_data);
    for (var i = 0; i < this.gsm_data.length; i++) {
      var type = this.gsm_data[i].voucherEffectiveDate + this.gsm_data[i].stockItemName;
      var target = this.gsm_data[i].gsmAct;
      // var temp_target = 20.00;
      var actual = this.gsm_data[i].gsmTgt;
      // var temp_actual = 19.55;
      this.lineData[i + 1] = [type, target, actual];
      // this.lineData[i + 1] = [type, temp_target, temp_actual];
      // console.log(this.lineData);
    }
  }

  // lineData = [
  //   ['type', 'Target', 'Actual'],
  //   ["	3-09-2017	", 120, 117],
  //   ["	30-09-2017	", 120, 121],
  //   ["	31-09-2017	", 120, 115],
  //   ["	31-09-2019	", 120, 116],
  //   ["	1/10/2017	", 120, 119],
  //   ["	31-09-2021	", 120, 110],
  //   ["	31-09-2023	", 120, 113],
  //   ["	1/11/2017	", 120, 124],
  //   ["	31-09-2025	", 120, 125],
  //   ["	31-09-2027	", 120, 116],
  //   ["	1/12/2017	", 120, 125],
  //   ["	31-09-2029	", 120, 115],
  //   ["	31-09-2031	", 120, 116],
  //   ["	1/13/2017	", 120, 119],
  //   ["	31-09-2033	", 120, 113],
  //   ["	31-09-2035	", 120, 123],
  //   ["	1/14/2017	", 120, 124],
  //   ["	31-09-2037	", 120, 125]
  // ];

  gsmData = {
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

  refreshData() {
    // this.subscription = this.serverService.getTallyGSMData().
    //   subscribe(list => {
    //     this.gsm_data = list;
    //     console.log(this.gsm_data);
    //   }
    //   )
  }
}
