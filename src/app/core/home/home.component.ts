import { ProdStatistics } from './../../shared/prod-statistics';
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
  salesData: any[];
  salesMonth: any[];
  prodStatistics: ProdStatistics;
  monthSalesData: any[];
  constructor(private serverService: ServerService) {

    this.showGraph = false;
    // alert("cons");
  }

  ngOnInit() {
    // this.showGSMGraph("30");
    // alert("nginit");
    this.showProductionGraph = false;
    console.log("mychk = " + this.showProductionGraph);
    var role = localStorage.getItem('role');
    console.log("role" + role);
    if (role == 'admin') {
      this.showProductionGraph = true;
      console.log("Flag = " + this.showProductionGraph);
      console.log("mychk = " + this.showProductionGraph);
    }
    this.showProdStatistics();
    // this.showProdDataGraph(); //No Data and getting length NULL
    this.showMonthlySalesGraph();
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

  displayIndianFormat(amount: number) {
    return Number(Math.round(amount / 1000)).toLocaleString('en-IN');
  }

  displayINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
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
          var actual = Math.round(this.graph_data[i].quantity / 1000);
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

  showMonthlySalesGraph() {
    this.showLoader = true;
    this.salesData = [];
    this.salesMonth = [];
    this.monthSalesData = [];
    this.serverService.getProdStatsForDashboard()
      .subscribe(
      (list) => {
        this.prodStatistics = list;
        console.log(this.prodStatistics);
        this.salesData = [];
        this.salesMonth = [];
        // console.log(this.prodStatistics[0].salesSummaryByMonth.length);
        this.monthSalesData[0] = ['Month', 'Percentage'];
        for (var i = 0; i < this.prodStatistics.salesSummaryByMonth.length; i++)
          if (Number(this.prodStatistics.salesSummaryByMonth[i].amount) > 0) {
            this.salesData[i] = Number(this.prodStatistics.salesSummaryByMonth[i].amount);
            this.salesMonth[i] = this.prodStatistics.salesSummaryByMonth[i].month;
            this.monthSalesData[i+1] = [this.salesMonth[i], this.salesData[i]]
          }
        // console.log(sales.length);
        // console.log(this.salesData);
        // console.log(this.salesMonth);
        console.log(this.monthSalesData);
      }
      )
    this.showLoader = false;
  }

  lData = ([
    [this.monthSalesData]
    // ["April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "Febrarury", "March"],
    // [9999, 9999, 9999, 9999, 9999, 9999, 9999, 9999, 9999, 9999, 9999, 9999]
    // console.log(this.salesMonth),
    // console.log(this.salesData),
    // [this.salesMonth],
    // [this.salesData]
    // ['Month', 'Percentage'],
    // ["King's pawn (e4)", 44],
    // ["Queen's pawn (d4)", 31],
    // ["Knight to King 3 (Nf3)", 12],
    // ["Queen's bishop pawn (c4)", 10],
    // ['Other', 3]
  ]);



  pieChartData = {

    chartType: 'Bar',
    dataTable: this.lData,
    // dataTable: this.monthSalesData,
    options: {
      title: 'GSM Variation Datewise',
      legend: 'none',
      tooltip: { isHtml: true },
      // width: 1000,
      // height: 500,
      colors: ['green'],
      hAxis: {
        title: 'Date'
      },
      vAxis: {
        title: 'GSM ',
        // ticks: [0, 10, 15, 20, 40]
      }
      // series: {
      //   0: { color: '#6f9654' },
      //   1: { color: '#e7711b' },
      // 0: { color: '#e2431e' },
      // 1: { color: '#e7711b' },
      // 2: { color: '#f1ca3a' },
      // 3: { color: '#6f9654' },
      // 4: { color: '#1c91c0' },
      // 5: { color: '#43459d' },
      //  },
    }
  };
}
