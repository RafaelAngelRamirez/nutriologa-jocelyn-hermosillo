import { TestBed } from '@angular/core/testing';

import { CalculosNutricionService } from './calculos-nutricion.service';

describe('CalculosNutricionService', () => {
  let service: CalculosNutricionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculosNutricionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
