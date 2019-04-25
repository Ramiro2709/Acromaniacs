import { TestBed } from '@angular/core/testing';

import { AlertToMysqlServiceService } from './alert-to-mysql-service.service';

describe('AlertToMysqlServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlertToMysqlServiceService = TestBed.get(AlertToMysqlServiceService);
    expect(service).toBeTruthy();
  });
});
