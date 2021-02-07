import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { PacientesListaComponent } from './pacientes/pacientes-lista/pacientes-lista.component';
import { PacienteCrearEditarDetalleComponent } from './pacientes/paciente-crear-editar-detalle/paciente-crear-editar-detalle.component';

const appRoutes: Routes = [
  { path: 'pacientes', component: HomeComponent },
  {
    path: 'about',
    component: AboutComponent,
  },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  declarations: [AppComponent, PacientesListaComponent, PacienteCrearEditarDetalleComponent],
  imports: [BrowserModule, RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
