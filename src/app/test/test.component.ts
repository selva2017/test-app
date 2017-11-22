import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular-4-data-table';
import { Prod } from './../shared/prod';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { ServerService } from '../shared/server.service';
import { Router } from '@angular/router';

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
  showLoader: boolean;

  constructor(private productService: ServerService,
    private router: Router) {
    this.showLoader = true;
  }
  refreshList() {
    this.subscription = this.productService.getTallyData()
      .subscribe(products => {
        // console.log(products);
        this.products = products;
        this.initializeTable(products);
      });
  }
  private initializeTable(products: Prod[]) {
    console.log(products);
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
      this.products.filter(p => p.reportKey.toLowerCase().includes(query.toLowerCase())) :
      this.products;

    this.initializeTable(filteredProducts);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.refreshList();
  }

  onClick(key: string) {
    //Need to have the service updated for just passign Flag and report ID
    // let product_update = '';
    // this.productService.putTallyData(product_update)
    //   .subscribe(
    //   (servers: Prod) => console.log(servers),
    //   (error) => console.log(error)
    //   );

    //start---- Get the clicked key and identify the row in array
    let num = 0;
    let row;
    for (num = 0; num <= this.products.length; num++) {
      if (this.products[num].tallySummaryIid == key)
        break;
    }
    let product_update = this.products[num];
    // product_update.checkFlag = "1";
    this.productService.putTallyData(product_update)
      .subscribe(
      (success) => {
        // console.log("success");
        this.refreshList();
      },
      // (servers: Prod) => console.log(servers),
      (error) => console.log(error)
      );
    // location.reload();
    // this.router.navigate(['/test']);
    //---end
  }
}