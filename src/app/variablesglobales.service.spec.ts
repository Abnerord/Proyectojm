import { TestBed, inject } from '@angular/core/testing';

import { VariablesglobalesService } from './variablesglobales.service';

describe('VariablesglobalesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VariablesglobalesService]
    });
  });

  it('should be created', inject([VariablesglobalesService], (service: VariablesglobalesService) => {
    expect(service).toBeTruthy();
  }));
});
