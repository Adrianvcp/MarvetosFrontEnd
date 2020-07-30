import { TestBed } from '@angular/core/testing';

import { ExcelUpdateDataService } from './excel-update-data.service';

describe('ExcelUpdateDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExcelUpdateDataService = TestBed.get(ExcelUpdateDataService);
    expect(service).toBeTruthy();
  });
});
