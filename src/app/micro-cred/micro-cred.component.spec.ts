import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroCredComponent } from './micro-cred.component';

describe('MicroCredComponent', () => {
  let component: MicroCredComponent;
  let fixture: ComponentFixture<MicroCredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicroCredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroCredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
