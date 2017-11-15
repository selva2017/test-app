import {Component, OnInit} from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

@Component({
  selector: 'ngbd-datepicker-range',
  templateUrl: 'ngbd-datepicker-range.component.html',
  
})
export class NgbdDatepickerRangeComponent implements OnInit {

  displayMonths = 2;
  navigation = 'select';
  model1: {};
  model2: {};
  now = new Date();
  ngOnInit() {
    this.model2 = {year: this.now.getFullYear(), month: this.now.getMonth() + 1, day: this.now.getDate()};
    this.now.setDate(this.now.getDate()-5);
    this.model1 = {year: this.now.getFullYear(), month: this.now.getMonth() + 1, day: this.now.getDate()};
   }
  onTest(){
    // let newDate = new Date(this.model1);
    // console.log(newDate);
    console.log(this.model1);
    console.log(this.model2);
    let model = [this.model1,this.model2]
    console.log(model);
  }
}