import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayViewHourSegmentComponent } from './day-view-hour-segment.component';

describe('DayViewHourSegmentComponent', () => {
  let component: DayViewHourSegmentComponent;
  let fixture: ComponentFixture<DayViewHourSegmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayViewHourSegmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayViewHourSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
