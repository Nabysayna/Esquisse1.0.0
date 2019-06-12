import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterAgentPdvDemandeRetraitComponent } from './master-agent-pdv-demande-retrait.component';

describe('MasterAgentPdvDemandeRetraitComponent', () => {
  let component: MasterAgentPdvDemandeRetraitComponent;
  let fixture: ComponentFixture<MasterAgentPdvDemandeRetraitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterAgentPdvDemandeRetraitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterAgentPdvDemandeRetraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
