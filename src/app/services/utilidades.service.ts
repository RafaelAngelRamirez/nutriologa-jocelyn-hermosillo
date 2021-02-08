import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilidadesService {
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

  constructor() {}
}
