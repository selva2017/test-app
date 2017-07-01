import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http';

import { Item } from '../shared/item.model';
import { InventoryService } from '../shared/inventory.service';
import { ServerService } from '../shared/server.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  items: Item[];
  viewMode = false;
  addMode = false;

  servers = [{
    name: 'Test', description: 'Test Desc', qty: '100', notes: 'test notes'
  }];
  constructor(private inventoryService: InventoryService,
    private serverService: ServerService) { }

  ngOnInit() {

  }
  onView() {
    this.viewMode = true;
    this.items = this.inventoryService.getInventory();
  }

  onAdd() {
    // this.addMode = true;
    // this.items = this.inventoryService.getInventory();
    this.serverService.storeServers(this.servers)
      .subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
      );
  }

  onGet() {
    this.serverService.getServers()
      .subscribe(
      (response: Response) => {
        const data = response.json();
        console.log(data);
      },
      (error) => console.log(error)
      );
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    const newItem = new Item(value.name, value.description, value.qty, value.notes);

    this.inventoryService.addItem(value);
    form.reset();
  }
}
