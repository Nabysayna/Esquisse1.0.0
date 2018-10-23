import { TestBed, inject } from '@angular/core/testing';

import { ControleService } from './controle.service';

describe('ControleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ControleService]
    });
  });

  it('should ...', inject([ControleService], (service: ControleService) => {
    expect(service).toBeTruthy();
  }));
});
