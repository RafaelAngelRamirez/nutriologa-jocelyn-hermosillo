import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UtilidadesService {
  constructor(private datePipe: DatePipe) {}

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

  formatearFecha(date: Date) {
    // Tenemos que eliminar la z del string para que no
    // nos convierta la fecha
    
    let limpio = date?.toString().split('');
    // Es la ultima posición
    limpio.pop();

    let fecha = limpio.join('') ?? new Date();
    return this.datePipe.transform(fecha, 'yyyy-MM-dd');
  }
}
