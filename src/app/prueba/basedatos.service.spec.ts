import { TestBed, inject } from '@angular/core/testing';

import { BasedatosService } from './basedatos.service';

describe('BasedatosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BasedatosService]
    });
  });

  it('should be created', inject([BasedatosService], (service: BasedatosService) => {
    expect(service).toBeTruthy();
  }));
});
