import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninModalComponent } from './signin-modal.component';

describe('SigninModalComponent', () => {
  let component: SigninModalComponent;
  let fixture: ComponentFixture<SigninModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
