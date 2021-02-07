import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-pacientes-lista',
  templateUrl: './pacientes-lista.component.html',
  styleUrls: ['./pacientes-lista.component.css'],
})
export class PacientesListaComponent implements OnInit {
  constructor(private pacienteService: PacienteService) {}
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
    if (!date) return;
    var today = new Date();
    var birthDate = new Date(date);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
