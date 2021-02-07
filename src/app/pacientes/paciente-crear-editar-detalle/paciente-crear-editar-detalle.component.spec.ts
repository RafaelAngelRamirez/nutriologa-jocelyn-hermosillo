import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteCrearEditarDetalleComponent } from './paciente-crear-editar-detalle.component';

describe('PacienteCrearEditarDetalleComponent', () => {
  let component: PacienteCrearEditarDetalleComponent;
  let fixture: ComponentFixture<PacienteCrearEditarDetalleComponent>;

  beforeEach(async(() => {
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
