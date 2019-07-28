import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeDefaultCardComponent } from './challenge-default-card.component';

describe('ChallengeDefaultCardComponent', () => {
  let component: ChallengeDefaultCardComponent;
  let fixture: ComponentFixture<ChallengeDefaultCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeDefaultCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeDefaultCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
