import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterAgentPdvUpdateCautionComponent } from './master-agent-pdv-update-caution.component';

describe('MasterAgentPdvUpdateCautionComponent', () => {
  let component: MasterAgentPdvUpdateCautionComponent;
  let fixture: ComponentFixture<MasterAgentPdvUpdateCautionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterAgentPdvUpdateCautionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterAgentPdvUpdateCautionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
