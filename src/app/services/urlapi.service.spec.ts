import { TestBed } from '@angular/core/testing';

import { UrlapiService } from './urlapi.service';

describe('UrlapiService', () => {
  let service: UrlapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
