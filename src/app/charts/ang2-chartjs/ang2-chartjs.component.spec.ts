import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ang2ChartjsComponent } from './ang2-chartjs.component';

describe('Ang2ChartjsComponent', () => {
  let component: Ang2ChartjsComponent;
  let fixture: ComponentFixture<Ang2ChartjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ang2ChartjsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ang2ChartjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
