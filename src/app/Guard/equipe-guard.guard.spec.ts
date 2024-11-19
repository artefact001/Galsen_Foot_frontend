import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { EquipeGuard } from './equipe-guard.guard';

describe('equipeGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => equipeGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
