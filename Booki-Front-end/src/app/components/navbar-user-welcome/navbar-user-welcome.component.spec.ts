import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarUserWelcomeComponent } from './navbar-user-welcome.component';

describe('NavbarUserWelcomeComponent', () => {
  let component: NavbarUserWelcomeComponent;
  let fixture: ComponentFixture<NavbarUserWelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarUserWelcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarUserWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
