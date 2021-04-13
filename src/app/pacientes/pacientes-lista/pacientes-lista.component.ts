import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../models/paciente.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilidadesService } from '../../services/utilidades.service';
import { ManejoDeMensajesService } from '../../services/manejo-de-mensajes.service';

@Component({
  selector: 'app-pacientes-lista',
  templateUrl: './pacientes-lista.component.html',
  styleUrls: ['./pacientes-lista.component.css'],
})
export class PacientesListaComponent implements OnInit {
  constructor(
    private msjService: ManejoDeMensajesService,
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
      this.cargando = false;
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

  eliminar(paciente: Paciente) {
    console.log('entro', this.cargando);
    if (this.cargando) return;

    this.msjService.swal
      .confirmacion(
        'Eliminar un paciente no se puede revertir y se perderán todos sus datos.'
      )
      .then((r) => {
        console.log(r);
        if (r.isConfirmed) {
          this.cargando = true;
          this.pacienteService.eliminar(paciente).subscribe(
            (x) => {
              console.log("eliminado")
              this.pacientes = this.pacientes.filter(
                (x) => x._id !== paciente._id
              );
              this.cargando = false;
              this.msjService.swal.success('Se elimino correctamente');
            },
            () => this.cargando = false
          );
        } else this.cargando = false;
      });
  }
}
