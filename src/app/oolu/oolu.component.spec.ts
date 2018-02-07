import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OoluComponent } from './oolu.component';

describe('OoluComponent', () => {
  let component: OoluComponent;
  let fixture: ComponentFixture<OoluComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OoluComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OoluComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
