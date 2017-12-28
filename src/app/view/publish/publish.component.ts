import { Component, OnInit } from '@angular/core';
import { FormsModule, FormArray, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {
  itemForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.itemForm = new FormGroup({
      'itemData': new FormGroup({
        'message': new FormControl(null, [Validators.required]),
        'url': new FormControl(null, [Validators.required]),
        'roles': new FormControl(null, [Validators.required]),
        'importance': new FormControl(null, [Validators.required]),
      }),
    });
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    console.log(form.value.message);
    console.log(form.value.url);
    console.log(form.value.roles);
    console.log(form.value.importance);
  }

}
