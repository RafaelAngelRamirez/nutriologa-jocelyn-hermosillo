import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../models/paciente.model';
import { ValidacionesService } from '../../services/validaciones.service';
import { DatePipe, Location } from '@angular/common';

@Component({
  selector: 'app-paciente-crear-editar-detalle',
  templateUrl: './paciente-crear-editar-detalle.component.html',
  styleUrls: ['./paciente-crear-editar-detalle.component.css'],
})
export class PacienteCrearEditarDetalleComponent implements OnInit {
  constructor(
    private location: Location,
    public vs: ValidacionesService,
    private pacienteService: PacienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private date: DatePipe
  ) {}
  cargando = false;

  formulario: FormGroup;

  ngOnInit(): void {
    this.obtenerId();
    if (this.esRutaDetalle()) {
      this.protocoloDetalle();
    }
  }

  protocoloDetalle() {
    throw new Error('Method not implemented.');
  }

  esRutaDetalle() {
    let url = this.activatedRoute.snapshot['_routerState'].url;
    return url.includes('detalle');
  }

  obtenerId() {
    this.activatedRoute.paramMap.subscribe((params) => {
      let id = params.get('id');

      this.cargando = true;
      if (id) this.cargar(id);
      else this.crearFormulario({});
    });
  }

  cargar(id: string) {
    this.pacienteService.cargar(id).subscribe(
      (paciente) => {
        this.crearFormulario(paciente);
      },
      () => {
        this.cargando = false;
      }
    );
  }

  crearFormulario(paciente: Partial<Paciente>) {
    this.formulario = new FormGroup({
      _id: new FormControl(paciente._id, []),
      nombre: new FormControl(paciente.nombre, [Validators.required]),
      fechaDeNacimiento: new FormControl(
        this.formatearFecha(paciente.fechaDeNacimiento),
        [Validators.required]
      ),
      // true es mujer
      sexo: new FormControl(paciente.sexo, [Validators.required]),
      celular: new FormControl(paciente.celular, [Validators.required]),
      metasDelPaciente: new FormArray(
        paciente.metasDelPaciente?.map((x) => new FormControl(x)) ?? []
      ),
    });

    this.cargando = false;
  }

  f(campo: string) {
    return this.formulario.get(campo);
  }

  fa(campo: string) {
    return this.f(campo) as FormArray;
  }

  formatearFecha(date: Date) {
    let fecha = date ?? new Date();
    return this.date.transform(fecha, 'yyyy-MM-dd');
  }
  agregarMeta() {
    this.fa('metasDelPaciente').push(new FormControl());
  }
  submit(modelo: Paciente, invalid) {
    this.formulario.markAllAsTouched();
    this.formulario.updateValueAndValidity();
    if (invalid) return;

    this.cargando = true;
    (modelo._id
      ? this.pacienteService.modificar(modelo)
      : this.pacienteService.crear(modelo)
    ).subscribe(
      () => {
        this.location.back();
        this.cargando = false;
      },
      () => {
        this.cargando = false;
      }
    );
  }
}
