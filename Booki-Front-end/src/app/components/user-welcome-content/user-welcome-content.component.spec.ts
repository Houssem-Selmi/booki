import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWelcomeContentComponent } from './user-welcome-content.component';

describe('UserWelcomeContentComponent', () => {
  let component: UserWelcomeContentComponent;
  let fixture: ComponentFixture<UserWelcomeContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserWelcomeContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWelcomeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
