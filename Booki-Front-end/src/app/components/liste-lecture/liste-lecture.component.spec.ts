import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeLectureComponent } from './liste-lecture.component';

describe('ListeLectureComponent', () => {
  let component: ListeLectureComponent;
  let fixture: ComponentFixture<ListeLectureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeLectureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
