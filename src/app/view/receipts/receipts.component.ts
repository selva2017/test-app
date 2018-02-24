import { ServerService } from './../../shared/server.service';
import { Receipts } from './../../shared/receipts';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.css']
})
export class ReceiptsComponent implements OnInit {

  showLoader: boolean;
  receipts: Receipts[];
  subscription: Subscription;

  constructor(private serverService: ServerService) {
    this.showLoader = true;
  }

  ngOnInit() {
    this.refreshList();
  }

  refreshList() {
    this.subscription = this.serverService.getReceiptList('all').
      subscribe(list => {
        this.receipts= list;
        // console.log(this.stock_list);
        this.showLoader = false;
      })
  }

}
