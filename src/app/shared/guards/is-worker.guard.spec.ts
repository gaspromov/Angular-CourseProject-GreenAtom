import { TestBed } from '@angular/core/testing';

import { IsWorkerGuard } from './is-worker.guard';

describe('IsWorkerGuard', () => {
  let guard: IsWorkerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsWorkerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
