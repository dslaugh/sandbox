import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CartService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: CartService = TestBed.get(CartService);
    expect(service).toBeTruthy();
  });
});
