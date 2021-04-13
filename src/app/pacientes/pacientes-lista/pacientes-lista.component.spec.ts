import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PacientesListaComponent } from './pacientes-lista.component';

describe('PacientesListaComponent', () => {
  let component: PacientesListaComponent;
  let fixture: ComponentFixture<PacientesListaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PacientesListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
