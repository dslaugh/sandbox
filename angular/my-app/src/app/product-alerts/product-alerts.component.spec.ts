import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAlertsComponent } from './product-alerts.component';

describe('ProductAlertsComponent', () => {
  let component: ProductAlertsComponent;
  let fixture: ComponentFixture<ProductAlertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAlertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAlertsComponent);
    component = fixture.componentInstance;
    component.product = { price: 700 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the notify button if price is > 700', async () => {
    const fixt = TestBed.createComponent(ProductAlertsComponent);
    const comp = fixt.componentInstance;
    comp.product = { price: 800 };
    fixt.detectChanges();
    fixt.whenStable().then(() => {
      const el = fixt.nativeElement.querySelector('#notifyButton');
      expect(el).toBeTruthy();
    });
  });

  it('should not show the notify button if price is <= 700', async () => {
    const fixt = TestBed.createComponent(ProductAlertsComponent);
    const comp = fixt.componentInstance;
    comp.product = { price: 700 };
    fixt.detectChanges();
    fixt.whenStable().then(() => {
      const el = fixt.nativeElement.querySelector('#notifyButton');
      expect(el).toBeFalsy();
    });
  });

});
