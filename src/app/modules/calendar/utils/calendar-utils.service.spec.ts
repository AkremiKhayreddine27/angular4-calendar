import { TestBed, inject } from '@angular/core/testing';

import { CalendarUtilsService } from './calendar-utils.service';

describe('CalendarUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarUtilsService]
    });
  });

  it('should be created', inject([CalendarUtilsService], (service: CalendarUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
