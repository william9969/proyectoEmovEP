import { TestBed } from '@angular/core/testing';

import { MismultasService } from './mismultas.service';

describe('MismultasService', () => {
  let service: MismultasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MismultasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
