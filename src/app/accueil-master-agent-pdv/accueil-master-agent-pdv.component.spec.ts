import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilMasterAgentPdvComponent } from './accueil-master-agent-pdv.component';

describe('AccueilMasterAgentPdvComponent', () => {
  let component: AccueilMasterAgentPdvComponent;
  let fixture: ComponentFixture<AccueilMasterAgentPdvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccueilMasterAgentPdvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilMasterAgentPdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
