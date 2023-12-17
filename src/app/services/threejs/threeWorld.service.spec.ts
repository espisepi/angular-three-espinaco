import { TestBed } from '@angular/core/testing';

import { ThreeWorldService } from './threeWorld.service';

describe('WorldService', () => {
  let service: ThreeWorldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThreeWorldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
