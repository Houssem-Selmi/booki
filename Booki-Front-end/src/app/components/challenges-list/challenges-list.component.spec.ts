import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengesListComponent } from './challenges-list.component';

describe('ChallengesListComponent', () => {
  let component: ChallengesListComponent;
  let fixture: ComponentFixture<ChallengesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
