import { TestBed, inject } from '@angular/core/testing';

import { ZuuluService } from './zuulu.service';

describe('ZuuluService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZuuluService]
    });
  });

  it('should ...', inject([ZuuluService], (service: ZuuluService) => {
    expect(service).toBeTruthy();
  }));
});
