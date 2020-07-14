import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepBystepComponent } from './step-bystep.component';

describe('StepBystepComponent', () => {
  let component: StepBystepComponent;
  let fixture: ComponentFixture<StepBystepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepBystepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepBystepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
