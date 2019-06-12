import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterAgentPdvSuivipointComponent } from './master-agent-pdv-suivipoint.component';

describe('MasterAgentPdvSuivipointComponent', () => {
  let component: MasterAgentPdvSuivipointComponent;
  let fixture: ComponentFixture<MasterAgentPdvSuivipointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterAgentPdvSuivipointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterAgentPdvSuivipointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
