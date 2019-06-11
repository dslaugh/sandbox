import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingComponent } from './shipping.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ShippingComponent', () => {
  let component: ShippingComponent;
  let fixture: ComponentFixture<ShippingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingComponent ],
      imports: [ HttpClientTestingModule ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
