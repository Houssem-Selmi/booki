import { TestBed } from '@angular/core/testing';

import { LivresService } from './livres.service';

describe('LivresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LivresService = TestBed.get(LivresService);
    expect(service).toBeTruthy();
  });
});
