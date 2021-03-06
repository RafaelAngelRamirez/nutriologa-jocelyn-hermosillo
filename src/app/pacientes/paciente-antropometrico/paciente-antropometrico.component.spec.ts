import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PacienteAntropometricoComponent } from './paciente-antropometrico.component';

describe('PacienteAntropometricoComponent', () => {
  let component: PacienteAntropometricoComponent;
  let fixture: ComponentFixture<PacienteAntropometricoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteAntropometricoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteAntropometricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
