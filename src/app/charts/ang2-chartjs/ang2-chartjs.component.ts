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
type = 'line';
data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [{
      label: "Dataset #1",
      backgroundColor: "rgba(0,128,0,0.2)",
      borderColor: "rgba(0,100,0,1)",
      borderWidth: 2,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [65, 59, 20, 81, 56, 55, 40],
    }]
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
