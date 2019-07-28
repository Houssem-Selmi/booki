import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUploadComponent } from './form-upload.component';

describe('FormUploadComponent', () => {
  let component: FormUploadComponent;
  let fixture: ComponentFixture<FormUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
