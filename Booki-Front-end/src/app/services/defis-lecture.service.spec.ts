import { TestBed } from '@angular/core/testing';

import { DefisLectureService } from './defis-lecture.service';

describe('DefisLectureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DefisLectureService = TestBed.get(DefisLectureService);
    expect(service).toBeTruthy();
  });
});
