import { Component, OnInit } from '@angular/core';
import { FormsModule, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent implements OnInit {
  itemForm: FormGroup;

  constructor() { }

ngOnInit() {
    this.itemForm = new FormGroup({
      'itemData': new FormGroup({
        'name': new FormControl(null, [Validators.required]),
        'description': new FormControl(null, [Validators.required])
       }),
      });
    // this.itemForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );
    this.itemForm.statusChanges.subscribe(
      (status) => console.log(status)
    );
    this.itemForm.setValue({
      'itemData': {
        'name': '',
        'description': ''
      }
    });
  }

  onSubmit() {
    console.log(this.itemForm);
    this.itemForm.reset();
  }
}
