import { TestBed } from '@angular/core/testing';

import { DashboardSharedService } from './dashboard-shared.service';

describe('DashboardSharedService', () => {
  let service: DashboardSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
