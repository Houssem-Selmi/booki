import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingDevTeamComponent } from './landing-dev-team.component';

describe('LandingDevTeamComponent', () => {
  let component: LandingDevTeamComponent;
  let fixture: ComponentFixture<LandingDevTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingDevTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingDevTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
