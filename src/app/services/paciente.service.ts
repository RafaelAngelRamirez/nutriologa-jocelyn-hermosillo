import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Paciente } from '../models/paciente.model';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  constructor(private http: HttpClient) {}

  base = environment.URL_BASE('paciente');

  cargar(id: string) {
    return this.http.get<Paciente>(this.base.concat('/id/' + id));
  }

  crear(modelo: Paciente) {
    console.log(modelo)
    return this.http.post<Paciente>(this.base, modelo);
  }

  modificar(modelo: Paciente) {
    return this.http.put<Paciente>(this.base, modelo);
  }

  leerTodo() {
    return this.http.get<Paciente[]>(this.base);
  }
}
