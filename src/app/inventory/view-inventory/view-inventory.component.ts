import { Component, OnInit } from '@angular/core';

import { Item } from '../../shared/item.model';
import { InventoryService } from '../../shared/inventory.service';
import { ServerService } from '../../shared/server.service';

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

  constructor(private inventoryService: InventoryService,
    private serverService: ServerService) { }

  ngOnInit() {
    this.viewMode = true;
    this.items = this.inventoryService.getInventory();
  }
}
