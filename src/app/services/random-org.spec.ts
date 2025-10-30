import { TestBed } from '@angular/core/testing';

import { RandomOrg } from './random-org';

describe('RandomOrg', () => {
  let service: RandomOrg;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomOrg);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
