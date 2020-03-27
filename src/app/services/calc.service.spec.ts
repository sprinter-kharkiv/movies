import { TestBed } from '@angular/core/testing';

import { CalcService } from './calc.service';

describe('CalcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalcService = TestBed.get(CalcService);
    expect(service).toBeTruthy();
  });
  it('should return sum', () => {
    const service: CalcService = TestBed.get(CalcService);
    expect(service.sum(3, 7)).toBe(10);
  });
});
