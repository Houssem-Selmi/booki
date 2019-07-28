import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLivreComponent } from './search-livre.component';

describe('SearchLivreComponent', () => {
  let component: SearchLivreComponent;
  let fixture: ComponentFixture<SearchLivreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchLivreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLivreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
