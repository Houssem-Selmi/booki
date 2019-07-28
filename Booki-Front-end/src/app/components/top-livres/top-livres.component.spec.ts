import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLivresComponent } from './top-livres.component';

describe('TopLivresComponent', () => {
  let component: TopLivresComponent;
  let fixture: ComponentFixture<TopLivresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopLivresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopLivresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
