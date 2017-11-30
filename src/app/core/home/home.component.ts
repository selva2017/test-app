import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
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
  graph_data: any[];
  statistics_data: any[];
  title: string;
  today: number = Date.now();
  showProductionGraph: boolean;
  constructor(private serverService: ServerService) {
    
    this.showGraph = false;
    // alert("cons");
  }

  ngOnInit() {
    // this.showGSMGraph("30");
    // alert("nginit");
    this.showProductionGraph = false;
    console.log("mychk = "+ this.showProductionGraph);
    var role = localStorage.getItem('role');
    console.log("role" + role);
    if (role =='admin'){
      this.showProductionGraph = true;
      console.log("Flag = "+this.showProductionGraph);
      console.log("mychk = "+ this.showProductionGraph);
    }
    this.showProdStatistics();
    this.showProdDataGraph();
  }
  showProdStatistics() {
    this.showLoader = true;

    this.lineData = [];
    this.subscription = this.serverService.getProdStatsForDashboard().
      subscribe(list => {
        this.statistics_data = list;
      }
      )
      this.showLoader = false;
  }

    displayINR(amount: number){
    // return Number(amount/1000).toLocaleString('en-IN');
    return Number(Math.round(amount/1000)).toLocaleString('en-IN');
    // return new Intl.NumberFormat('en-IN').format(amount);
    // console.log(new Intl.NumberFormat('en-IN').format(amount));

  }

showProdDataGraph() {
  this.showLoader = true;
  this.lineData = [];
  this.subscription = this.serverService.getProdDataForDashboardChart().
    subscribe(list => {
      this.graph_data = list;
      this.lineData[0] = ['Type', "Actual", { 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } }];
      for (var i = 0; i < this.graph_data.length; i++) {
        var type = '';
        // var type = this.graph_data[i].date;
        var actual = Math.round(this.graph_data[i].quantity/1000);
        var graph_tooltip = '<style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td, th {border: 1.5px solid #dddddd;text-align: left;padding: 8px;}</style><table class="table-sm"><tr><td>Tonnes</td><td>' + this.graph_data[i].quantity
          + '</td></tr><tr><td>Date</td><td>' + this.graph_data[i].date + '</td></tr>';
        this.lineData[i + 1] = [type, actual, graph_tooltip];
      }
      this.showLoader = false;
      this.showGraph = true;
      this.displayGraph(this.lineData);
    }
    )
}

displayGraph(lineData) {
  // alert("disaplay graph");
  this.graphData = {
    chartType: 'AreaChart',
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
        title: 'Tonnes'
      }
    }
  };
}
}
