import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-chart-example',
  // templateUrl: './simple-chart-example.component.html',
  template: `
        <chart [options]="options"></chart>
    `,
  styleUrls: ['./simple-chart-example.component.css']
})
export class SimpleChartExampleComponent implements OnInit {

  constructor() {
    this.options = {
      title: { text: 'Progress chart....' },
      series: [{
        data: [29.9, 71.5, 106.4, 129.2, 15, 200],
      }]
    };
  }
  options: Object;
  onChartSelection(e) {
    // this.from = e.originalEvent.xAxis[0].min.toFixed(2);
    // this.to = e.originalEvent.xAxis[0].max.toFixed(2);
  }
  ngOnInit() {
  }

}
