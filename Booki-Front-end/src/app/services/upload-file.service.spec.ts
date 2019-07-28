import { TestBed } from '@angular/core/testing';

import { UploadFileService } from './upload-file.service';

describe('UploadFileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadFileService = TestBed.get(UploadFileService);
    expect(service).toBeTruthy();
  });
});
