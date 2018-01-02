import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayViewAllDayEventComponent } from './day-view-all-day-event.component';

describe('DayViewAllDayEventComponent', () => {
  let component: DayViewAllDayEventComponent;
  let fixture: ComponentFixture<DayViewAllDayEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayViewAllDayEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayViewAllDayEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
