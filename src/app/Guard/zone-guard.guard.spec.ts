import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { ZoneGuard } from './zone-guard.guard';
// import { zoneGuardGuard } from './zone-guard.guard';

describe('zoneGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => zoneGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
