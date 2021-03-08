import { TestBed } from '@angular/core/testing';

import { SaleItemsService } from './sale-items.service';

describe('SaleItemsService', () => {
  let service: SaleItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
