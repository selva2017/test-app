import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import { ServerService } from '../../shared/server.service';
import { Product } from '../../shared/product.model';

@Component({
  selector: 'app-edit-inventory',
  templateUrl: './edit-inventory.component.html',
  styleUrls: ['./edit-inventory.component.css']
})
export class EditInventoryComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  products: Product;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Product;

  productsChanged = new Subject<Product>();

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.serverService.getWSData()
      .subscribe(
      (servers: Product) => this.products = servers,
      (error) => console.log(error)
      );

    this.subscription = this.serverService.startedEditing
      .subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.products[index];
        this.slForm.setValue({
          name: this.editedItem.name,
          id: this.editedItem.id
        })
      }
      );
  }
  onEditItem(index: number) {
    this.serverService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newProduct = new Product(value.id, value.name);
    if (this.editMode) {
      this.updateItem(this.editedItemIndex, newProduct);
    }
    this.editMode = false;
    form.reset();
  }
  updateItem(index: number, newProduct: Product) {
    this.products[index] = newProduct;
    this.productsChanged.next(this.products);

    // Send the new product to the service to update data
    this.serverService.putData(newProduct)
      .subscribe(
      (servers: Product) => this.products = servers,
      (error) => console.log(error)
      );


  }
}
