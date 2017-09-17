import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-chart',
  templateUrl: './google-chart.component.html',
  styleUrls: ['./google-chart.component.css']
})
export class GoogleChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  mytestjson = [{ "Task": "Hours per Day" }, { "Work": "1" }, { "Eat": "2" }, { "Commute": "2" }, { "Watch TV": "2" }, { "Sleep": "7" }];

  change = 10;
  data_changed = [];
  temp = [200, 350, 400, 450];


  mydataTable = [
    ['Year', '2010', '2011', { role: 'style' }],
    ['Sales', this.temp[0] + (this.change * this.temp[0]) / 100, 210, 'color: green'],
    ['Profit', this.temp[0] + (this.change * this.temp[0]) / 100, 100, 'color: #76A7FA'],
    ['Net', this.temp[0] + (this.change * this.temp[0]) / 100, 100, 'color: #76A7FA']

  ];
  pieChartData = {
    chartType: 'BarChart',
    dataTable: this.mydataTable,
    options: { 'title': 'Tasks' },
  };
  // https://github.com/gmazzamuto/ng2-google-charts
  // Working charts
  // Table
  // ColumnChart
  // LineChart
  // AreaChart
  // BarChart
  // PieChart
  // data for multiple bars - ComboChart
  // https://developers.google.com/chart/interactive/docs/gallery/combochart
  // for data and arguments
  // http://shreekantha.github.io/ng2-googlechart/
  // https://gmazzamuto.github.io/ng2-google-charts/

}

