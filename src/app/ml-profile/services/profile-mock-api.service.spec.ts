import { TestBed } from '@angular/core/testing';

import { ProfileMockApiService } from './profile-mock-api.service';

describe('ProfileMockApiService', () => {
  let service: ProfileMockApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileMockApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
