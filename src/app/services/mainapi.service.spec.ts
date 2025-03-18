import { TestBed } from '@angular/core/testing';

import { MainapiService } from './mainapi.service';

describe('MainapiService', () => {
  let service: MainapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
