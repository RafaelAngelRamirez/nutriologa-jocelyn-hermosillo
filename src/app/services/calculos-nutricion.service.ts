import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { UtilidadesService } from './utilidades.service';

@Injectable({
  providedIn: 'root',
})
export class CalculosNutricionService {
  constructor(private utilidadesService: UtilidadesService) {}
  
  caloriasEmbarazoPorTrimestre = {
    1: 0,
    2: 340,
    3: 425,
  };

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

  pesoMinimo(talla: number) {
    if (!talla) return;

    return talla * talla * 18.5;
  }

  pesoMaximo(talla: number) {
    if (!talla) return;

    return talla * talla * 24.99;
  }
}
