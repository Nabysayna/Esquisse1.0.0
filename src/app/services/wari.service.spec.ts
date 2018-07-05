import { TestBed, inject } from '@angular/core/testing';

import { WariService } from './wari.service';

describe('WariService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WariService]
    });
  });

  it('should ...', inject([WariService], (service: WariService) => {
    expect(service).toBeTruthy();
  }));
});
