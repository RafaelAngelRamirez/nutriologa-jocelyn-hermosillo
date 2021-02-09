import { Component, Input, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/paciente.model';
import { DatosAntropometricos } from '../../models/paciente.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidacionesService } from '../../services/validaciones.service';
import { UtilidadesService } from '../../services/utilidades.service';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-paciente-antropometrico',
  templateUrl: './paciente-antropometrico.component.html',
  styleUrls: ['./paciente-antropometrico.component.css'],
})
export class PacienteAntropometricoComponent implements OnInit {
  constructor(
    public vs: ValidacionesService,

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

  caloriasEmbarazoPorTrimestre = {
    1: 0,
    2: 340,
    3: 425,
  };

  ngOnInit(): void {}

  formulario: FormGroup;

  crearFormulario(datos: Partial<DatosAntropometricos>) {
    this.formulario = new FormGroup({
      // peso: new FormControl(datos.peso, [Validators.required]),
      // talla: new FormControl(datos.talla, [Validators.required]),
      // circunferenciaCintura: new FormControl(datos.circunferenciaCintura, [
      //   Validators.required,
      // ]),
      peso: new FormControl(46, [Validators.required]),
      talla: new FormControl(1.64, [Validators.required]),
      circunferenciaCintura: new FormControl(70, [Validators.required]),
      circunferenciaAbdomen: new FormControl(72, [Validators.required]),
      circunferenciaCadera: new FormControl(8, [Validators.required]),
      masaMuscular: new FormControl(datos.masaMuscular, [Validators.required]),
      porcentajeDeGrasa: new FormControl(datos.porcentajeDeGrasa, [
        Validators.required,
      ]),
      porcentajeDeAgua: new FormControl(datos.porcentajeDeAgua, [
        Validators.required,
      ]),
      // peso: new FormControl(46, [Validators.required]),
      // talla: new FormControl(1.64, [Validators.required]),
      // circunferenciaCintura: new FormControl(datos.circunferenciaCintura, [
      //   Validators.required,
      // ]),
      // circunferenciaAbdomen: new FormControl(datos.circunferenciaAbdomen, [
      //   Validators.required,
      // ]),
      // circunferenciaCadera: new FormControl(datos.circunferenciaCadera, [
      //   Validators.required,
      // ]),
      // masaMuscular: new FormControl(datos.masaMuscular, [Validators.required]),
      // porcentajeDeGrasa: new FormControl(datos.porcentajeDeGrasa, [
      //   Validators.required,
      // ]),
      // porcentajeDeAgua: new FormControl(datos.porcentajeDeAgua, [
      //   Validators.required,
      // ]),
    });
  }

  f(c: string) {
    return this.formulario.get(c);
  }

  /**
   *indice de masa corporal
   *
   * @param {number} peso
   * @param {number} talla
   * @returns
   * @memberof PacienteAntropometricoComponent
   */
  imc(peso: number, talla: number) {
    if (!peso || !talla) return;
    return peso / (talla * talla);
  }

  kgGrasa(peso: number, grasa: number) {
    if (!peso || !grasa) return;
    return peso * (grasa / 100);
  }

  claveColorDiagnostico = {
    BP: 'info',
    NP: 'success',
    SP: 'warning',
    OB1: 'danger',
    OB2: 'danger',
    OB3: 'danger',
  };

  imcDiagnostico(imc: number) {
    if (imc < 18.5) return 'BP';

    console.log(18.5 >= imc, imc < 25);
    if (imc >= 18.5 && imc < 25) return 'NP';
    if (imc >= 25 && imc < 30) return 'SP';
    if (imc >= 30 && imc < 35) return 'OB1';
    if (imc >= 35 && imc < 40) return 'OB2';
    if (imc >= 40) return 'OB3';
  }

  pesoTeorico(talla: number, fechaNacimiento: Date, sexo: boolean) {
    if (!talla || !fechaNacimiento) return;

    const tallaCM = talla * 100;

    const edad = this.utilidadesService.calcularEdad(fechaNacimiento);

    const valor1 = (tallaCM - 150) / 4;
    const valor2Hombre = (edad - 20) / 4;
    const valor2Mujer = (edad - 20) / 2.5;

    const formulaHombre = tallaCM - 100 - valor1 + valor2Hombre;
    const formulaMujer = tallaCM - 100 - valor1 + valor2Mujer;

    return sexo ? formulaMujer : formulaHombre;
  }

  gastoEnergeticoReposo(
    peso: number,
    talla: number,
    fechaNacimiento: Date,
    sexo: boolean
  ) {
    if (!peso || !talla || !fechaNacimiento) return;

    const valor1 = peso * 10;
    const tallaCM = talla * 100;
    const valor2 = tallaCM * 6.25;
    const edad = this.utilidadesService.calcularEdad(fechaNacimiento);
    const valor3 = edad * 5;

    const hombre = valor1 + valor2 - valor3 + 5;
    const mujer = valor1 + valor2 - valor3 - 161;

    return sexo ? mujer : hombre;
  }

  obtenerSemanas(ultimaMenstruacion) {
    const hoy = DateTime.local();
    const ultima = DateTime.fromJSDate(new Date(ultimaMenstruacion));
    const sdg = Math.ceil(hoy.diff(ultima, ['weeks']).weeks);
    return sdg;
  }

  obtenerTrimestre(ultimaMenstruacion: Date) {
    if (!ultimaMenstruacion) return 0;
    const sdg = this.obtenerSemanas(ultimaMenstruacion);

    if (sdg <= 13) return 1;
    if (sdg <= 27) return 2;
    return 3;
  }

  obtenerCaloriasTrimestre(ultimaMenstruacion: Date) {
    return this.caloriasEmbarazoPorTrimestre[
      this.obtenerTrimestre(ultimaMenstruacion)
    ];
  }
}
