import { ServerService } from './../../shared/server.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule, FormArray, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {
  itemForm: FormGroup;
  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.itemForm = new FormGroup({
      'itemData': new FormGroup({
        'title': new FormControl(null, [Validators.required]),
        'message': new FormControl(null, [Validators.required]),
        'url': new FormControl(null, [Validators.required]),
        'role': new FormControl(null, [Validators.required]),
        // 'importance': new FormControl(null, [Validators.required]),
      }),
    });
  }

  onSubmit(form: NgForm) {
    form.value.role=1;
    this.serverService.postMessage(form.value)
      .subscribe(
      // (res: Daybook) => console.log(res),
      (success) => {
        // console.log("success");
        // this.refreshList();
        form.reset();
      },
      (error) => console.log(error)
      );

    // console.log(form.value);
    // console.log(form.value.message);
    // console.log(form.value.url);
    // console.log(form.value.role);
    // console.log(form.value.importance);
  }

}
