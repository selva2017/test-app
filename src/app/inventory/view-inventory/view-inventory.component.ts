import { Component, OnInit } from '@angular/core';

import { Item } from '../../shared/item.model';
import { InventoryService } from '../../shared/inventory.service';
import { ServerService } from '../../shared/server.service';

import { Product } from '../../shared/product.model';

@Component({
  selector: 'app-view-inventory',
  templateUrl: './view-inventory.component.html',
  styleUrls: ['./view-inventory.component.css']
})
export class ViewInventoryComponent implements OnInit {
  items: Item[];
  viewMode = false;
  testItem = this.serverService.getTestName();
  testws = this.serverService.getServers();
  product = this.serverService.getWSData();

  constructor(private inventoryService: InventoryService,
    private serverService: ServerService) {
    // this.testws = this.serverService.getServers();
  }

  ngOnInit() {
    console.log('ng init');
    this.viewMode = true;
    this.items = this.inventoryService.getInventory();
    // const a = JSON.stringify(this.testws);
  }
}
