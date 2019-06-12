import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterAgentPdvMonitoringComponent } from './master-agent-pdv-monitoring.component';

describe('MasterAgentPdvMonitoringComponent', () => {
  let component: MasterAgentPdvMonitoringComponent;
  let fixture: ComponentFixture<MasterAgentPdvMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterAgentPdvMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterAgentPdvMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
