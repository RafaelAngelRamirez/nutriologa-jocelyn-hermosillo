import { TestBed } from '@angular/core/testing';

import { ManejoDeMensajesService } from './manejo-de-mensajes.service';

describe('ManejoDeMensajesService', () => {
  let service: ManejoDeMensajesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManejoDeMensajesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
