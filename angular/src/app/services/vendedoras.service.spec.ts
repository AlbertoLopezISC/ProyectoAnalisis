import { TestBed } from '@angular/core/testing';

import { VendedorasService } from './vendedoras.service';

describe('VendedorasService', () => {
  let service: VendedorasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendedorasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
