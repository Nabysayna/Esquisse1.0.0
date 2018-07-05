import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WariComponent } from './wari.component';

describe('WariComponent', () => {
  let component: WariComponent;
  let fixture: ComponentFixture<WariComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WariComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
