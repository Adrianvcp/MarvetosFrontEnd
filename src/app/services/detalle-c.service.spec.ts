import { TestBed } from '@angular/core/testing';

import { DetalleCService } from './detalle-c.service';

describe('DetalleCService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetalleCService = TestBed.get(DetalleCService);
    expect(service).toBeTruthy();
  });
});
