import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeModalComponent } from './challenge-modal.component';

describe('ChallengeModalComponent', () => {
  let component: ChallengeModalComponent;
  let fixture: ComponentFixture<ChallengeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
