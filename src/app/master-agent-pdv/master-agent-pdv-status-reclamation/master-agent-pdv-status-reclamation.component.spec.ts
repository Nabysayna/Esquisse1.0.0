import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterAgentPdvStatusReclamationComponent } from './master-agent-pdv-status-reclamation.component';

describe('MasterAgentPdvStatusReclamationComponent', () => {
  let component: MasterAgentPdvStatusReclamationComponent;
  let fixture: ComponentFixture<MasterAgentPdvStatusReclamationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterAgentPdvStatusReclamationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterAgentPdvStatusReclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
