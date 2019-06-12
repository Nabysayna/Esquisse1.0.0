import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterAgentPdvCreditationCcComponent } from './master-agent-pdv-creditation-cc.component';

describe('MasterAgentPdvCreditationCcComponent', () => {
  let component: MasterAgentPdvCreditationCcComponent;
  let fixture: ComponentFixture<MasterAgentPdvCreditationCcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterAgentPdvCreditationCcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterAgentPdvCreditationCcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
