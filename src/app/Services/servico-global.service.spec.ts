import { TestBed } from '@angular/core/testing';

import { ServicoGlobalService } from './servico-global.service';

describe('ServicoGlobalService', () => {
  let service: ServicoGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicoGlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
