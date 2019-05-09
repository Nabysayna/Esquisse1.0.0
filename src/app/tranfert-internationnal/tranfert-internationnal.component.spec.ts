import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranfertInternationnalComponent } from './tranfert-internationnal.component';

describe('TranfertInternationnalComponent', () => {
  let component: TranfertInternationnalComponent;
  let fixture: ComponentFixture<TranfertInternationnalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranfertInternationnalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranfertInternationnalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
