import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLoginComponent } from './navbar-login.component';

describe('NavbarLoginComponent', () => {
  let component: NavbarLoginComponent;
  let fixture: ComponentFixture<NavbarLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
