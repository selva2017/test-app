import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular-4-data-table';
import { Prod } from './../shared/prod';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { ServerService } from '../shared/server.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, OnDestroy {

  products: Prod[];
  subscription: Subscription;
  tableResource: DataTableResource<Prod>;
  items: Prod[] = [];
  itemCount: number;

  constructor(private productService: ServerService) {
    this.subscription = this.productService.getSupplierData()
      .subscribe(products => {
        // console.log(products);
        this.products = products;
        this.initializeTable(products);
      });
  }

  private initializeTable(products: Prod[]) {
    // console.log(products);
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if (!this.tableResource) return;

    this.tableResource.query(params)
      .then(items => this.items = items);
  }

  filter(query: string) {
    let filteredProducts = (query) ?
      this.products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      this.products;

    this.initializeTable(filteredProducts);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

  onClick(supplierID) {
    alert(supplierID);
  }
}