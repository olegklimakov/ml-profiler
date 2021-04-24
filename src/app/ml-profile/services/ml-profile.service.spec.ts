import { TestBed } from '@angular/core/testing';

import { MlProfileService } from './ml-profile.service';

describe('MlProfileService', () => {
  let service: MlProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MlProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
