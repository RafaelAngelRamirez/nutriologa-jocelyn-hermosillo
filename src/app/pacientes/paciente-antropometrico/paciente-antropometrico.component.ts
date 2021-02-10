import { Component, Input, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/paciente.model';
import { DatosAntropometricos } from '../../models/paciente.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidacionesService } from '../../services/validaciones.service';
import { UtilidadesService } from '../../services/utilidades.service';
import { CalculosNutricionService } from '../../services/calculos-nutricion.service';

@Component({
  selector: 'app-paciente-antropometrico',
  templateUrl: './paciente-antropometrico.component.html',
  styleUrls: ['./paciente-antropometrico.component.css'],
})
export class PacienteAntropometricoComponent implements OnInit {
  constructor(
    public vs: ValidacionesService,
    private calculosService: CalculosNutricionService,
    public utilidadesService: UtilidadesService
  ) {}

  private _datos: [Partial<DatosAntropometricos>, Paciente];
  public get datos(): [Partial<DatosAntropometricos>, Paciente] {
    return this._datos;
  }
  @Input('datos')
  public set datos(value: [Partial<DatosAntropometricos>, Paciente]) {
    this._datos = value;
    this.paciente = value[1];
    this.crearFormulario(value[0]);
  }

  paciente: Paciente;

  ngOnInit(): void {}

  formulario: FormGroup;

  crearFormulario(datos: Partial<DatosAntropometricos>) {
    this.formulario = new FormGroup({
      compensacion: new FormControl(datos.compensacion),
      peso: new FormControl(datos.peso, [Validators.required]),
      talla: new FormControl(datos.talla, [Validators.required]),
      circunferenciaCintura: new FormControl(datos.circunferenciaCintura, [
        Validators.required,
      ]),
      circunferenciaAbdomen: new FormControl(datos.circunferenciaAbdomen, [
        Validators.required,
      ]),
      circunferenciaCadera: new FormControl(datos.circunferenciaCadera, [
        Validators.required,
      ]),
      masaMuscular: new FormControl(datos.masaMuscular, [Validators.required]),
      porcentajeDeGrasa: new FormControl(datos.porcentajeDeGrasa, [
        Validators.required,
      ]),
      porcentajeDeAgua: new FormControl(datos.porcentajeDeAgua, [
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

  imcDiagnostico(imc: number) {
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
      this.paciente.condicionActual.ultimaMenstruacion
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
    const resultadoCompensacion = ger  * (compensacion / 100);
    const gastoTotal = ger + calEmbarazo;
    const resultado = resultadoCompensacion + gastoTotal;
    console.log({ ger, calEmbarazo, compensacion, resultado });
    return resultado;
  }
}
