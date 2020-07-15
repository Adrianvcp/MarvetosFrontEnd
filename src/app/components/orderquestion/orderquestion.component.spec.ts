import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderquestionComponent } from './orderquestion.component';

describe('OrderquestionComponent', () => {
  let component: OrderquestionComponent;
  let fixture: ComponentFixture<OrderquestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderquestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
