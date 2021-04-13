import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PacienteCrearEditarDetalleComponent } from './paciente-crear-editar-detalle.component';

describe('PacienteCrearEditarDetalleComponent', () => {
  let component: PacienteCrearEditarDetalleComponent;
  let fixture: ComponentFixture<PacienteCrearEditarDetalleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteCrearEditarDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteCrearEditarDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
