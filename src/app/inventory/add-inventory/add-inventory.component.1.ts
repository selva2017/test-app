import { Component, OnInit } from '@angular/core';
import { FormsModule, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ServerService } from '../../shared/server.service';

import { Product } from '../../shared/product.model';
import { Supplier } from '../../shared/supplier.model';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent implements OnInit {
  itemForm: FormGroup;
  products: Product;
  addMode = false;
  prod: any;

  id = 0;
  name = '';
  postdata: String;
  suppliers: Supplier;

  index: any;
  model: Supplier;

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.itemForm = new FormGroup({
      'itemData': new FormGroup({
        // 'productId': new FormControl(null, [Validators.required]),
        'productCode': new FormControl(null, [Validators.required]),
        'productName': new FormControl(null, [Validators.required]),
        'productQuantity': new FormControl(null, [Validators.required]),
        'productPrice': new FormControl(null, [Validators.required]),
        'supplierID': new FormControl(null, [Validators.required]),
        'suppliername': new FormControl(null, [Validators.required]),
        'supplierphone': new FormControl(null, [Validators.required])
      }),
    });

    this.serverService.getSupplierData()
      .subscribe(
      // (servers: Supplier) => console.log(servers),
      (servers: Supplier) => this.suppliers = servers,
      (error) => console.log(error)
      );

    // this.itemForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );
    // this.itemForm.statusChanges.subscribe(
    //   (status) => console.log(status)
    // );
    // this.itemForm.setValue({
    //   'itemData': {
    //     'id': '',
    //     'name': ''
    //   }
    // });
  }
  selectsupplier() {

    console.log(this.suppliers[this.index - 1]);
    this.model = new Supplier(this.suppliers[this.index - 1].supplierID, this.suppliers[this.index - 1].name, this.suppliers[this.index - 1].phone);

  }
  onSubmit() {

    //Working example---------------
    // this.serverService.postWSData()
    //   .subscribe(
    //   data => this.postdata = JSON.stringify(data),
    //   error => alert(error),
    //   () => console.log('finished')
    //   );
    //------------------------end

    //Working example-----------Form data
    let data = this.itemForm.get('itemData').value;
    this.serverService.postWSData(data)
      .subscribe(
      data => this.postdata = JSON.stringify(data),
      error => alert(error),
      () => console.log('finished')
      );
    // --------end


    // console.log(this.itemForm.get('itemData').value);
    // console.log(this.itemForm.get('itemData.id').value);
    // console.log(this.itemForm.get('itemData.name').value);
    // console.log(JSON.stringify(this.itemForm.get('itemData').value));

    // let data = this.itemForm.get('itemData').value  ;
    // let data = JSON.stringify(this.itemForm.get('itemData').value);
    // this.serverService.postWSData(data);
    // this.postdata = this.itemForm.value.itemData.id;
    // console.log(this.postdata);
    // this.products.id = this.id;
    // this.products.name = this.name;

    //     				var id = parseFloat((<HTMLInputElement>document.getElementById("id")).value);
    // var name = (<HTMLInputElement>document.getElementById("name")).value; 

    // this.serverService.postWSData(this.itemForm.getRawValue());

    // let formData = this.itemForm.getRawValue();
    // let serializedForm = JSON.stringify(formData);
    // console.log(serializedForm);
    // this.serverService.postWSData(serializedForm);


    // let obj = { "id":30, "name":"John"};
    // this.serverService.postWSData(JSON.stringify(obj));

    // this.products.id = this.itemForm.get('itemData.id').value;
    // this.products.name = this.itemForm.get('itemData.name').value;
    // this.id = this.itemForm.get('itemData.id').value;
    // this.name = this.itemForm.get('itemData.name').value;
    // this.addMode = true;
    // console.log(this.itemForm.get('itemData.name'));
    // this.itemForm.reset();
  }
}
