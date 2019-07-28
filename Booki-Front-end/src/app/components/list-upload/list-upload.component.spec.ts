import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUploadComponent } from './list-upload.component';

describe('ListUploadComponent', () => {
  let component: ListUploadComponent;
  let fixture: ComponentFixture<ListUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
