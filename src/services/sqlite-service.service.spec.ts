import { TestBed } from '@angular/core/testing';

import { SQLiteServiceService } from './sqlite-service.service';

describe('SQLiteServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SQLiteServiceService = TestBed.get(SQLiteServiceService);
    expect(service).toBeTruthy();
  });
});
