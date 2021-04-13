import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ManejoDeMensajesService {
  swal: SwalClass;
  constructor(public toast: ToastrService) {
    this.swal = new SwalClass(this);
  }
}

class SwalClass {
  constructor(private root: ManejoDeMensajesService) {}

  async confirmacion(
    msj = 'Esta acción no se puede deshacer',
    titulo = '¿Estas segúro?'
  ) {
    return Swal.fire({
      title: titulo,
      text: msj,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Entiendo, ¡adelante!',
    });
  }

  success(msj: string, titulo = 'Eliminado') {
    Swal.fire(titulo, msj, 'success');
  }
}
