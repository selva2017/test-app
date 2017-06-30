import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Item } from '../shared/item.model';
import { InventoryService } from '../shared/inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  items: Item[];
  viewMode = false;
  addMode = false;

  constructor(private inventoryService: InventoryService) { }

  ngOnInit() {
    
  }
  onView(){
    this.viewMode = true;
    this.items = this.inventoryService.getInventory();
  }

  onAdd(){
    this.addMode = true;
    // this.items = this.inventoryService.getInventory();
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newItem = new Item(value.name, value.description, value.qty, value.notes);
    
    this.inventoryService.addItem(value);
    form.reset();
}
}
