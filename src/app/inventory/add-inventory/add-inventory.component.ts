import { Component, OnInit } from '@angular/core';
import { FormsModule, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ServerService } from '../../shared/server.service';

import { Product } from '../../shared/product.model';

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

  id: Number;
  name: String;
  postdata: String;

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.itemForm = new FormGroup({
      'itemData': new FormGroup({
        'id': new FormControl(null, [Validators.required]),
        'name': new FormControl(null, [Validators.required])
      }),
    });
    // this.itemForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );
    this.itemForm.statusChanges.subscribe(
      (status) => console.log(status)
    );
    // this.itemForm.setValue({
    //   'itemData': {
    //     'id': '',
    //     'name': ''
    //   }
    // });
  }

  onSubmit() {
    //Working example
    this.serverService.postWSData()
      .subscribe(
      data => this.postdata = JSON.stringify(data),
      error => alert(error),
      () => console.log('finished')
      );

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
