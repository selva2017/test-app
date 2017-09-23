import { Product } from './../../shared/product.model';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Prod } from './../../shared/prod';
import { ServerService } from './../../shared/server.service';

@Component({
  selector: 'app-daybook',
  templateUrl: './daybook.component.html',
  styleUrls: ['./daybook.component.css']
})
export class DaybookComponent implements OnInit {

  subscription: Subscription;
  products: Prod[];
  product_row: Prod[]=[];

  constructor(private serverService: ServerService) {
    this.subscription = this.serverService.getTallyData().
      subscribe(products => {
        this.products = products;
      })
  }

  ngOnInit() {
  }
  onClick(row) {
this.product_row=row;

  }
}
