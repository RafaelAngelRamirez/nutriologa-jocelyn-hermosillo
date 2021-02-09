import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../models/paciente.model';
import { ValidacionesService } from '../../services/validaciones.service';
import { DatePipe, Location } from '@angular/common';
import { ManejoDeMensajesService } from '../../services/manejo-de-mensajes.service';
import { UtilidadesService } from '../../services/utilidades.service';
import { ModalService } from '@codice-progressio/modal';

@Component({
  selector: 'app-paciente-crear-editar-detalle',
  templateUrl: './paciente-crear-editar-detalle.component.html',
  styleUrls: ['./paciente-crear-editar-detalle.component.css'],
})
export class PacienteCrearEditarDetalleComponent implements OnInit {
  constructor(
    public modalService: ModalService,
    public utilidadesService: UtilidadesService,
    private renderer: Renderer2,
    private location: Location,
    public vs: ValidacionesService,
    private pacienteService: PacienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private date: DatePipe,
    private notiService: ManejoDeMensajesService
  ) {}

  IdAntropometricos = 'AABBDCDASDF';
  private _cargando = false;
  public get cargando() {
    return this._cargando;
  }
  public set cargando(value) {
    this._cargando = value;

    if (value) this.formulario?.disable();
    else this.formulario?.enable();
  }

  formulario: FormGroup;
  esDetalle = false;
  paciente: Paciente;

  ngOnInit(): void {
    this.obtenerId();
  }

  protocoloDetalle() {
    const callbackEstilos = (x) => {
      this.renderer.setStyle(x, 'border', ' none');
      this.renderer.setStyle(x, 'padding-left', ' 0%');
      this.renderer.setStyle(x, 'border-bottom', ' solid');
      this.renderer.setStyle(x, 'border-bottom-width', ' 1px');
      this.renderer.setStyle(x, 'pointer-events', ' none');
      this.renderer.setStyle(x, 'border-color', '#ccc');
    };
    setTimeout(() => {
      const contenedor = document.getElementById('formularioDetalle');

      // Agregamos una clase a todos los input.
      contenedor
        .querySelectorAll<HTMLInputElement>('input')
        .forEach(callbackEstilos);
      contenedor
        .querySelectorAll<HTMLSelectElement>('select')
        .forEach(callbackEstilos);

      contenedor
        .querySelectorAll<HTMLSelectElement>("input[type='checkbox']")
        .forEach((x) => {
          this.renderer.setAttribute(x, 'disabled', 'true');
        });
    }, 100);
  }

  esRutaDetalle() {
    let url = this.activatedRoute.snapshot['_routerState'].url;
    return url.includes('detalle');
  }

  obtenerId() {
    this.activatedRoute.paramMap.subscribe((params) => {
      let id = params.get('id');

      this.cargando = true;
      if (id) this.cargar(id);
      else this.crearFormulario({});
    });
  }

  cargar(id: string) {
    this.pacienteService.cargar(id).subscribe(
      (paciente) => {
        this.crearFormulario(paciente);
      },
      () => {
        this.cargando = false;
      }
    );
  }

  crearFormulario(paciente: Partial<Paciente>) {
    this.paciente = paciente as Paciente;
    this.formulario = new FormGroup({
      _id: new FormControl(paciente._id),
      nombre: new FormControl(paciente.nombre, [Validators.required]),
      fechaDeNacimiento: new FormControl(
        this.formatearFecha(paciente.fechaDeNacimiento),
        [Validators.required]
      ),
      // true es mujer
      sexo: new FormControl(paciente.sexo, [Validators.required]),
      celular: new FormControl(paciente.celular, [Validators.required]),
      metasDelPaciente: new FormArray(
        paciente.metasDelPaciente?.map((x) => new FormControl(x)) ?? [
          new FormControl(),
        ]
      ),

      condicionActual: new FormGroup({
        embarazo: new FormControl(paciente.condicionActual?.embarazo),
        ultimaMenstruacion: new FormControl(
          paciente?.condicionActual?.ultimaMenstruacion
            ? this.formatearFecha(paciente?.condicionActual?.ultimaMenstruacion)
            : ''
        ),
        dm: new FormControl(paciente.condicionActual?.dm),
        ht: new FormControl(paciente.condicionActual?.ht),
        dl: new FormControl(paciente.condicionActual?.dl),
        au: new FormControl(paciente.condicionActual?.au),
        ca: new FormControl(paciente.condicionActual?.ca),
        cv: new FormControl(paciente.condicionActual?.cv),
        otra: new FormControl(paciente.condicionActual?.otra),
        problemasGastroIntestinales: new FormGroup({
          estrenimiento: new FormControl(
            paciente.condicionActual?.problemasGastroIntestinales?.estrenimiento
          ),
          diarrea: new FormControl(
            paciente.condicionActual?.problemasGastroIntestinales?.diarrea
          ),
          alergias: new FormControl(
            paciente.condicionActual?.problemasGastroIntestinales?.alergias
          ),
          vomito: new FormControl(
            paciente.condicionActual?.problemasGastroIntestinales?.vomito
          ),
          colitis: new FormControl(
            paciente.condicionActual?.problemasGastroIntestinales?.colitis
          ),
          gastritis: new FormControl(
            paciente.condicionActual?.problemasGastroIntestinales?.gastritis
          ),
          nauseas: new FormControl(
            paciente.condicionActual?.problemasGastroIntestinales?.nauseas
          ),
          agruras: new FormControl(
            paciente.condicionActual?.problemasGastroIntestinales?.agruras
          ),
          distencionAbdominal: new FormControl(
            paciente.condicionActual?.problemasGastroIntestinales?.distencionAbdominal
          ),
          otro: new FormControl(
            paciente.condicionActual?.problemasGastroIntestinales?.distencionAbdominal
          ),
        }),
      }),
    });

    this.cargando = false;
    if (this.esRutaDetalle()) {
      this.esDetalle = true;
      this.protocoloDetalle();
    }
    this.modalService.open(this.IdAntropometricos);
  }

  f(campo: string) {
    return this.formulario.get(campo);
  }

  fa(campo: string) {
    return this.f(campo) as FormArray;
  }

  formatearFecha(date: Date) {
    return this.utilidadesService.formatearFecha(date);
  }
  agregarMeta() {
    this.fa('metasDelPaciente').push(new FormControl());
  }
  submit(modelo: any, invalid) {
    this.formulario.markAllAsTouched();
    this.formulario.updateValueAndValidity();

    if (invalid) {
      this.notiService.toast.error('Hay errores');
      return;
    }

    this.cargando = true;

    const operacion = modelo._id
      ? this.pacienteService.modificar(modelo)
      : this.pacienteService.crear(modelo);

    operacion.subscribe(
      () => {
        this.location.back();
        this.cargando = false;
      },
      () => {
        this.cargando = false;
      }
    );
  }

  modificar(paciente: Paciente) {
    this.router.navigate([
      '/modificar',
      paciente._id,
      'paciente',
      paciente.nombre,
    ]);
  }
}
