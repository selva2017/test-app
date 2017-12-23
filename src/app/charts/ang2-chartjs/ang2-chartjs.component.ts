import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ang2-chartjs',
  // template: '<canvas id="chart"></canvas>',
  templateUrl: './ang2-chartjs.component.html',
  styleUrls: ['./ang2-chartjs.component.css']
})
export class Ang2ChartjsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  // http://www.chartjs.org/docs/latest/charts/
  // https://codepen.io/chartjs/pen/YVWZbz
// line,bar,pie,doughnut,polarArea
  // type = 'polarArea';
  // data = {
  //   labels: ["January", "February", "March", "April", "May", "June", "July"],
  //   datasets: [
  //     {
  //       label: "My First dataset",
  //       data: [65, 59, 80, 81, 56, 55, 40],
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 206, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //         'rgba(153, 102, 255, 0.2)',
  //         'rgba(255, 159, 64, 0.2)'
  //     ],
  //     borderColor: [
  //         'rgba(255,99,132,1)',
  //         'rgba(54, 162, 235, 1)',
  //         'rgba(255, 206, 86, 1)',
  //         'rgba(75, 192, 192, 1)',
  //         'rgba(153, 102, 255, 1)',
  //         'rgba(255, 159, 64, 1)'
  //     ],
  //     borderWidth: 1
  //     }
  //   ]
  // };
  // options = {
  //   responsive: true,
  //   maintainAspectRatio: false
  // };
  // ---------------Another way-------------------------
type = 'bar';
data = {
  labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    // labels: ["12 BF 100 GSM 48",
    // "12 BF 100 GSM 28",    "12 BF 100 GSM 33",    "12 BF 100 GSM 47",    "12 BF 100 GSM 22",    "12 BF 100 GSM 46",    "12 BF 100 GSM 38",    "12 BF 100 GSM 39",    "12 BF 100 GSM 33",
    // "12 BF 100 GSM 48",    "12 BF 100 GSM 28",    "12 BF 100 GSM 33",    "12 BF 100 GSM 47",    "12 BF 100 GSM 22",    "12 BF 100 GSM 46",    "12 BF 100 GSM 38",    "12 BF 100 GSM 39",
    // "12 BF 100 GSM 33",    "12 BF 100 GSM 28",    "12 BF 100 GSM 33",    "12 BF 100 GSM 47",    "12 BF 100 GSM 22",    "12 BF 100 GSM 46",   "12 BF 100 GSM 38",    "12 BF 100 GSM 39",
    // "12 BF 100 GSM 33",    "12 BF 100 GSM 48",    "12 BF 100 GSM 28",    "12 BF 100 GSM 33",    "12 BF 100 GSM 47",    "12 BF 100 GSM 22",    "12 BF 100 GSM 46",    "12 BF 100 GSM 38",
    // "12 BF 100 GSM 39",    "12 BF 100 GSM 33"    ],
    datasets: [{
      label: "Target",
      backgroundColor: "rgba(0,128,120,110.2)",
      borderColor: "rgba(0,100,0,1)",
      borderWidth: 2,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [690, 671, 1046, 548, 948, 993, 1169, 1523, 483]
      // data: [120	,        120	,        100	,        100	,        120	,        120	,        100	,
      //   100	,        120	,        120	,        100	,        100	,        120	,        120	,        100	,        100	,        120	,        120	,         120	,        100	,        100	,        120	,
      //   120	,        100	,        100	,        120	,        120	,        100	,        100	,        120	,        120	,        100	,        100	,        120	,        120	]    
      },
    {
      label: "Actual",
      backgroundColor: "rgba(0,128,0,0.2)",
      borderColor: "rgba(0,100,0,1)",
      borderWidth: 2,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [117	,        121	,        99	,        101	,        116	,        119	,        99	,        100	,        117	,        121	,        99	,        101	,
        116	,        119	,        99	,        100	,        122	,        125	,        121	,        99	,        101	,        116	,        119	,        99	,        100	,
        117	,        121	,        99	,        101	,        116	,        119	,        99	,        100	,
        122	,        125]    }]
  };
  
  options = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        stacked: true,
        gridLines: {
          display: true,
          color: "rgba(255,99,132,0.2)"
        }
      }],
      xAxes: [{
        gridLines: {
          display: false
        }
      }]
    }
  };
  
}
