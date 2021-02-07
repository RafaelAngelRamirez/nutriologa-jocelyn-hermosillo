import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { PacientesListaComponent } from './pacientes/pacientes-lista/pacientes-lista.component';
import { PacienteCrearEditarDetalleComponent } from './pacientes/paciente-crear-editar-detalle/paciente-crear-editar-detalle.component';

const appRoutes: Routes = [
  { path: 'pacientes', component: PacientesListaComponent },
  {
    path: 'nuevo-paciente',
    component: PacienteCrearEditarDetalleComponent,
  },
  {
    path: 'editar/:id/paciente/:nombre',
    component: PacienteCrearEditarDetalleComponent,
  },
  {
    path: 'modificar/:id/paciente/:nombre',
    component: PacienteCrearEditarDetalleComponent,
  },{
    path:"**",
    redirectTo:"pacientes"
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PacientesListaComponent,
    PacienteCrearEditarDetalleComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
