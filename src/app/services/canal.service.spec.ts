import { TestBed, inject } from '@angular/core/testing';

import { CanalService } from './canal.service';

describe('CanalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanalService]
    });
  });

  it('should ...', inject([CanalService], (service: CanalService) => {
    expect(service).toBeTruthy();
  }));
});
