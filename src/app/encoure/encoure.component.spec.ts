import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncoureComponent } from './encoure.component';

describe('EncoureComponent', () => {
  let component: EncoureComponent;
  let fixture: ComponentFixture<EncoureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncoureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncoureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
