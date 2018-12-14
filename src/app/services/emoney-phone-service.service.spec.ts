import { TestBed, inject } from '@angular/core/testing';

import { EmoneyPhoneServiceService } from './emoney-phone-service.service';

describe('EmoneyPhoneServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmoneyPhoneServiceService]
    });
  });

  it('should ...', inject([EmoneyPhoneServiceService], (service: EmoneyPhoneServiceService) => {
    expect(service).toBeTruthy();
  }));
});
