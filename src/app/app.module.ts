import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

// FECHAS EN ESPAÑOL
import { NgModule, LOCALE_ID } from '@angular/core';
import localePy from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localePy, 'es-MX');

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { PacientesListaComponent } from './pacientes/pacientes-lista/pacientes-lista.component';
import { PacienteCrearEditarDetalleComponent } from './pacientes/paciente-crear-editar-detalle/paciente-crear-editar-detalle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidacionInputComponent } from './components/validacion-input/validacion-input.component';
import { ComponentsModule } from './components/components/components.module';
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ModalModule } from '@codice-progressio/modal';

const appRoutes: Routes = [
  { path: 'pacientes', component: PacientesListaComponent },
  {
    path: 'nuevo-paciente',
    component: PacienteCrearEditarDetalleComponent,
  },
  {
    path: 'modificar/:id/paciente/:nombre',
    component: PacienteCrearEditarDetalleComponent,
  },
  {
    path: 'detalle/:id/paciente/:nombre',
    component: PacienteCrearEditarDetalleComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    PacientesListaComponent,
    PacienteCrearEditarDetalleComponent,
    ValidacionInputComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ComponentsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      enableHtml: true,
      progressBar: true,
      progressAnimation: 'increasing',
    }),
    ModalModule,
  ],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'es-MX' },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
