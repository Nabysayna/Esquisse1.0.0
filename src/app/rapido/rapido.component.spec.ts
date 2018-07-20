import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RapidoComponent } from './rapido.component';

describe('FacturiersComponent', () => {
  let component: RapidoComponent;
  let fixture: ComponentFixture<RapidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RapidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
