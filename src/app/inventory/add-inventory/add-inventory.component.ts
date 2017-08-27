import { Component, OnInit } from '@angular/core';
import { FormsModule, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ServerService } from '../../shared/server.service';

import { Product } from '../../shared/product.model';
import { ProductAdd } from '../../shared/product-add.interface';
import { Supplier } from '../../shared/supplier.model';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent implements OnInit {
  itemForm: FormGroup;

  product: Product = {
    productId: '',
    productCode: '',
    productName: '',
    productQuantity: '',
    productPrice: ''
  };
  productAdd: ProductAdd = {
    productId: '',
    productCode: '',
    productName: '',
    productQuantity: '',
    productPrice: '',
    supplierId: ''
  };
  supplierDetails: Supplier = {
    supplierID: '',
    name: '',
    phone: ''
  };

  addMode = false;
  postdata: String;
  suppliers: Supplier;
  index: any;

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.itemForm = new FormGroup({
      'itemData': new FormGroup({
        'productId': new FormControl(null, [Validators.required]),
        'productCode': new FormControl(null, [Validators.required]),
        'productName': new FormControl(null, [Validators.required]),
        'productQuantity': new FormControl(null, [Validators.required]),
        'productPrice': new FormControl(null, [Validators.required]),
        'supplierID': new FormControl(null, [Validators.required]),
      }),
    });

    this.serverService.getSupplierData()
      .subscribe(
      (servers: Supplier) => this.suppliers = servers,
      (error) => console.log(error)
      );
  }
  selectsupplier() {
    this.supplierDetails = new Supplier(this.suppliers[this.index - 1].supplierID, this.suppliers[this.index - 1].name, this.suppliers[this.index - 1].phone);
    console.log(this.supplierDetails);

  }
  onSubmit() {
    this.productAdd.productId = this.product.productId;
    this.productAdd.productCode = this.product.productCode;
    this.productAdd.productName = this.product.productName;
    this.productAdd.productQuantity = this.product.productQuantity;
    this.productAdd.productPrice = this.product.productPrice;
    this.productAdd.supplierId = this.supplierDetails.supplierID;

    //Working example-----------Form data
    let data = this.itemForm.get('itemData').value;
    this.serverService.postWSData(this.productAdd)
      .subscribe(
      data => this.postdata = JSON.stringify(data),
      error => alert(error),
      () => console.log('finished')
      );
    // --------end
  }
}
