import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Paciente } from 'src/app/models/paciente.model';
import { DatosAntropometricos } from '../../models/paciente.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidacionesService } from '../../services/validaciones.service';
import { UtilidadesService } from '../../services/utilidades.service';
import { CalculosNutricionService } from '../../services/calculos-nutricion.service';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-paciente-antropometrico',
  templateUrl: './paciente-antropometrico.component.html',
  styleUrls: ['./paciente-antropometrico.component.css'],
})
export class PacienteAntropometricoComponent implements OnInit {
  constructor(
    public vs: ValidacionesService,
    private calculosService: CalculosNutricionService,
    public utilidadesService: UtilidadesService,
    private pacienteService: PacienteService
  ) {}

  private _datos: PacienteAntropometricoOpciones;
  public get datos(): PacienteAntropometricoOpciones {
    return this._datos;
  }
  @Input()
  public set datos(value: PacienteAntropometricoOpciones) {
    this._datos = value;
    this.paciente = value.paciente;
    this.crearFormulario(value.datoAntropometrico);
    this.esDetalle = value.esDetalle;
    this.editando = value.esEdicion;
  }

  @Output() guardado = new EventEmitter<Paciente>();

  paciente: Partial<Paciente>;

  ngOnInit(): void {}

  formulario: FormGroup;
  editando: boolean;
  private _esDetalle: boolean;
  public get esDetalle(): boolean {
    return this._esDetalle;
  }
  public set esDetalle(value: boolean) {
    this._esDetalle = value;
    if (value) this.formulario?.disable();
    else this.formulario.enable();
  }

  private _cargando = false;
  public get cargando() {
    return this._cargando;
  }
  public set cargando(value) {
    this._cargando = value;
    if (value) this.formulario.disable();
    else this.formulario.enable();
  }

  crearFormulario(datos: Partial<DatosAntropometricos>) {
    this.formulario = new FormGroup({
      _id: new FormControl(datos?._id),
      compensacion: new FormControl(datos?.compensacion),
      peso: new FormControl(datos?.peso, [Validators.required]),
      talla: new FormControl(datos?.talla, [Validators.required]),
      circunferenciaCintura: new FormControl(datos?.circunferenciaCintura, [
        Validators.required,
      ]),
      circunferenciaAbdomen: new FormControl(datos?.circunferenciaAbdomen, [
        Validators.required,
      ]),
      circunferenciaCadera: new FormControl(datos?.circunferenciaCadera, [
        Validators.required,
      ]),
      masaMuscular: new FormControl(datos?.masaMuscular, [Validators.required]),
      porcentajeDeGrasa: new FormControl(datos?.porcentajeDeGrasa, [
        Validators.required,
      ]),
      porcentajeDeAgua: new FormControl(datos?.porcentajeDeAgua, [
        Validators.required,
      ]),
    });
  }

  f(c: string) {
    return this.formulario.get(c);
  }

  imc() {
    const peso = this.f('peso')?.value;
    const talla = this.f('talla')?.value;
    return this.calculosService.imc(peso, talla);
  }

  kgGrasa() {
    const peso = this.f('peso')?.value;
    const grasa = this.f('porcentajeDeGrasa')?.value;
    return this.calculosService.kgGrasa(peso, grasa);
  }

  claveColorDiagnostico = this.calculosService.claveColorDiagnostico;

  imcDiagnostico() {
    return this.calculosService.imcDiagnostico(this.imc());
  }

  pesoTeorico() {
    const talla = this.f('talla')?.value;
    const fechaDeNacimiento = this.paciente?.fechaDeNacimiento;
    const sexo = this.paciente?.sexo;

    return this.calculosService.pesoTeorico(talla, fechaDeNacimiento, sexo);
  }

  gastoEnergeticoReposo() {
    const peso = this.f('peso')?.value;
    const talla = this.f('talla')?.value;
    const fechaDeNacimiento = this.paciente?.fechaDeNacimiento;
    const sexo = this.paciente?.sexo;

    return this.calculosService.gastoEnergeticoReposo(
      peso,
      talla,
      fechaDeNacimiento,
      sexo
    );
  }

  obtenerSemanas() {
    return this.calculosService.obtenerSemanas(
      this.paciente?.condicionActual?.ultimaMenstruacion
    );
  }

  obtenerTrimestre() {
    return this.calculosService.obtenerTrimestre(
      this.paciente?.condicionActual?.ultimaMenstruacion
    );
  }

  obtenerCaloriasTrimestre() {
    return this.calculosService.obtenerCaloriasTrimestre(
      this.paciente?.condicionActual?.ultimaMenstruacion
    );
  }

  pesoMinimo() {
    const talla = this.f('talla')?.value;
    return this.calculosService.pesoMinimo(talla);
  }

  pesoMaximo() {
    const talla = this.f('talla')?.value;
    return this.calculosService.pesoMaximo(talla);
  }

  calculoCompesancion() {
    const ger = this.gastoEnergeticoReposo();
    const calEmbarazo = this.obtenerCaloriasTrimestre() ?? 0;
    const compensacion = this.f('compensacion')?.value;
    const resultadoCompensacion = ger * (compensacion / 100);
    const gastoTotal = ger + calEmbarazo;
    const resultado = resultadoCompensacion + gastoTotal;
    return resultado;
  }

  submit(model: any, invalid: boolean) {
    this.formulario.markAllAsTouched();
    this.formulario.updateValueAndValidity();

    if (invalid || this.formulario.disabled) return;

    model['idPaciente'] = this.paciente._id;
    this.cargando = true;

    this.datos?.datoAntropometrico?._id
      ? this.guardarModificacion(model)
      : this.guardarNuevo(model);
  }

  guardarModificacion(model: any) {
    this.pacienteService.modificarDatoAntropometrico(model).subscribe(
      (paciente) => {
        this.guardado.emit(paciente);
        this.paciente = paciente;

        this.cargando = false;
        this.editando = false;
        this.esDetalle = true;
      },
      () => (this.cargando = false)
    );
  }

  guardarNuevo(model: any) {
    this.pacienteService.crearDatoAntropometrico(model).subscribe(
      (paciente) => {
        this.paciente = paciente;
        this.guardado.emit(paciente);
        this.cargando = false;
        this.editando = false;
        this.esDetalle = true;
      },
      () => (this.cargando = false)
    );
  }

  editar() {
    this.esDetalle = false;
    this.editando = true;
  }

  eliminar() {
    if (this.cargando) return;
    this.cargando = true;
    this.pacienteService
      .eliminarDataoAntropometrico(
        this.datos.datoAntropometrico._id,
        this.paciente._id
      )
      .subscribe(() => {
        // Eliminamos del paciente este dato.
        this.paciente.datosAntropometricos = this.paciente.datosAntropometricos.filter(
          (x) => x._id !== this.datos.datoAntropometrico._id
        );

        this.cargando = false;
      });
  }
}

export interface PacienteAntropometricoOpciones {
  datoAntropometrico: DatosAntropometricos;
  paciente: Paciente;
  esDetalle: boolean;
  esEdicion: boolean;
}
