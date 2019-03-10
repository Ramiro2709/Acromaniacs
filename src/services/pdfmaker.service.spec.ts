import { TestBed } from '@angular/core/testing';

import { PDFMakerService } from './pdfmaker.service';

describe('PDFMakerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PDFMakerService = TestBed.get(PDFMakerService);
    expect(service).toBeTruthy();
  });
});
