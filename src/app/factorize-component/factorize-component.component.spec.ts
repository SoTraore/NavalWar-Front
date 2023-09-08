import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorizeComponentComponent } from './factorize-component.component';

describe('FactorizeComponentComponent', () => {
  let component: FactorizeComponentComponent;
  let fixture: ComponentFixture<FactorizeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactorizeComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactorizeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
