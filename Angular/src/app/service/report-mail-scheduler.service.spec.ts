import { TestBed } from '@angular/core/testing';

import { ReportMailSchedulerService } from './report-mail-scheduler.service';

describe('ReportMailSchedulerService', () => {
  let service: ReportMailSchedulerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportMailSchedulerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
