import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ServerService } from './../../shared/server.service';
import { StockList } from './../../shared/stocklist';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  subscription: Subscription;
  totalQuantities = 0.0;
  stock_list: StockList[];
  showLoader: boolean;

  constructor(private serverService: ServerService) {
    this.showLoader = true;
  }

  ngOnInit() {
    this.refreshList();
  }
  
  refreshList() {
    this.subscription = this.serverService.getTallyStockData().
    subscribe(list => {
      this.stock_list = list;
      console.log(this.stock_list);
      this.showLoader = false;
    })
  }

}