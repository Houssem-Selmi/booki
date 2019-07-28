import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupModalComponent } from './signup-modal.component';

describe('SignupModalComponent', () => {
  let component: SignupModalComponent;
  let fixture: ComponentFixture<SignupModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
