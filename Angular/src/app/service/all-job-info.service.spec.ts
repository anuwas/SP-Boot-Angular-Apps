import { TestBed } from '@angular/core/testing';

import { AllJobInfoService } from './all-job-info.service';

describe('AllJobInfoService', () => {
  let service: AllJobInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllJobInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
