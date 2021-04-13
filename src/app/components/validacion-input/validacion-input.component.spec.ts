import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ValidacionInputComponent } from './validacion-input.component';

describe('ValidacionInputComponent', () => {
  let component: ValidacionInputComponent;
  let fixture: ComponentFixture<ValidacionInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidacionInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidacionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
