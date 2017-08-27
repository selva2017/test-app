import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import { ServerService } from '../../shared/server.service';
import { ProductView } from '../../shared/product-view.interface';

@Component({
  selector: 'app-edit-inventory',
  templateUrl: './edit-inventory.component.html',
  styleUrls: ['./edit-inventory.component.css']
})
export class EditInventoryComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  products: ProductView;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: ProductView;

  productsChanged = new Subject<ProductView>();

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.serverService.getWSData()
      .subscribe(
      (servers: ProductView) => this.products = servers,
      (error) => console.log(error)
      );

    this.subscription = this.serverService.startedEditing
      .subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.products[index];
        this.slForm.setValue({
          // productId: this.editedItem.productId,
          productName: this.editedItem.productName,
          productQuantity: this.editedItem.productQuantity,
          productPrice: this.editedItem.productPrice
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
    // only name qty and amount will be fetched from form.... what to do for the other fields?? pass product.field?
    const newProduct = new ProductView(value.productId, value.productCode, value.productName, value.productQuantity,
      value.productPrice, value.supplierId, value.supplierName, value.supplierPhone);
    console.log(newProduct);
    if (this.editMode) {
      this.updateItem(this.editedItemIndex, newProduct);
    }
    this.editMode = false;
    form.reset();
  }
  updateItem(index: number, newProduct: ProductView) {
    this.products[index] = newProduct;
    this.productsChanged.next(this.products);

    // Send the new product to the service to update data
    this.serverService.putData(newProduct)
      .subscribe(
      (servers: ProductView) => this.products = servers,
      (error) => console.log(error)
      );


  }
}
