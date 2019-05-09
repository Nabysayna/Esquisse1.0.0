import { TestBed, inject } from '@angular/core/testing';

import { TransfertinternationnalService } from './transfertinternationnal.service';

describe('TransfertinternationnalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransfertinternationnalService]
    });
  });

  it('should ...', inject([TransfertinternationnalService], (service: TransfertinternationnalService) => {
    expect(service).toBeTruthy();
  }));
});
