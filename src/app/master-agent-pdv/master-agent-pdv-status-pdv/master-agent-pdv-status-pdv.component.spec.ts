import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterAgentPdvStatusPdvComponent } from './master-agent-pdv-status-pdv.component';

describe('MasterAgentPdvStatusPdvComponent', () => {
  let component: MasterAgentPdvStatusPdvComponent;
  let fixture: ComponentFixture<MasterAgentPdvStatusPdvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterAgentPdvStatusPdvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterAgentPdvStatusPdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
