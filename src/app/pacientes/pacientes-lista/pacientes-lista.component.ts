import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../models/paciente.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilidadesService } from '../../services/utilidades.service';

@Component({
  selector: 'app-pacientes-lista',
  templateUrl: './pacientes-lista.component.html',
  styleUrls: ['./pacientes-lista.component.css'],
})
export class PacientesListaComponent implements OnInit {
  constructor(
    private utilidadesService: UtilidadesService,
    private pacienteService: PacienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  cargando = false;
  ngOnInit(): void {
    this.cargar();
  }

  pacientes: any[] = [];

  cargar() {
    this.cargando = true;
    this.pacienteService.leerTodo().subscribe((pacientes) => {
      this.pacientes = pacientes;
    });
  }

  calcularEdad(date: Date) {
    this.utilidadesService.calcularEdad(date);
  }

  detalle(paciente: Paciente) {
    this.router.navigate([
      '/detalle',
      paciente._id,
      'paciente',
      paciente.nombre,
    ]);
  }
}
