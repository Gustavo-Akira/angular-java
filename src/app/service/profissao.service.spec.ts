import { TestBed } from '@angular/core/testing';

import { ProfissaoService } from './profissao.service';

describe('ProfissaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfissaoService = TestBed.get(ProfissaoService);
    expect(service).toBeTruthy();
  });
});
