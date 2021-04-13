import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Paciente, DatosAntropometricos } from '../models/paciente.model';

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
    return this.http.post<Paciente>(this.base, modelo);
  }

  eliminar(paciente: Paciente) {
    return this.http.delete<null>(this.base.concat('/id/' + paciente._id));
  }

  modificar(modelo: Paciente) {
    return this.http.put<Paciente>(this.base, modelo);
  }

  leerTodo() {
    return this.http.get<Paciente[]>(this.base);
  }

  crearDatoAntropometrico(model: any) {
    return this.http.put<Paciente>(
      this.base.concat('/datos-antropometricos/crear'),
      model
    );
  }

  modificarDatoAntropometrico(model: any) {
    return this.http.put<Paciente>(
      this.base.concat('/datos-antropometricos/modificar'),
      model
    );
  }

  eliminarDataoAntropometrico(idDatoAntro: string, idPaciente: number) {
    return this.http.delete<DatosAntropometricos>(
      this.base.concat(`/datos-antropometricos/${idPaciente}/${idDatoAntro}`)
    );
  }
}
