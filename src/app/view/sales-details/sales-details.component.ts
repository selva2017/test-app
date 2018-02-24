import { SalesDetails } from './../../shared/sales-details';
import { ServerService } from './../../shared/server.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sales-details',
  templateUrl: './sales-details.component.html',
  styleUrls: ['./sales-details.component.css']
})
export class SalesDetailsComponent implements OnInit {
  showLoader: boolean;
  sales_details: SalesDetails[];
  subscription: Subscription;

  constructor(private serverService: ServerService) {
    this.showLoader = true;
  }

  ngOnInit() {
    this.refreshList();
  }

  refreshList() {
    this.subscription = this.serverService.getSalesList('all').
      subscribe(list => {
        this.sales_details = list;
        // console.log(this.stock_list);
        this.showLoader = false;
      })
  }

}
