import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAnfantComponent } from './new-anfant.component';

describe('NewAnfantComponent', () => {
  let component: NewAnfantComponent;
  let fixture: ComponentFixture<NewAnfantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAnfantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAnfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
