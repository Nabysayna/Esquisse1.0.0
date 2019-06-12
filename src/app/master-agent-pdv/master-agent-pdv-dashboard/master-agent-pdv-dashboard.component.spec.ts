import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterAgentPdvDashboardComponent } from './master-agent-pdv-dashboard.component';

describe('MasterAgentPdvDashboardComponent', () => {
  let component: MasterAgentPdvDashboardComponent;
  let fixture: ComponentFixture<MasterAgentPdvDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterAgentPdvDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterAgentPdvDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
