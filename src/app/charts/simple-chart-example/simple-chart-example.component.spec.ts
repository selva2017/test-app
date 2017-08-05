import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleChartExampleComponent } from './simple-chart-example.component';

describe('SimpleChartExampleComponent', () => {
  let component: SimpleChartExampleComponent;
  let fixture: ComponentFixture<SimpleChartExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleChartExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleChartExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
