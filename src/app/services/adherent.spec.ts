import { TestBed } from '@angular/core/testing';
import { AdherentService } from './adherent';

describe('Adherent', () => {
  let service: AdherentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdherentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
