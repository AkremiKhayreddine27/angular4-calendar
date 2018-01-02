import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenDayEventsComponent } from './open-day-events.component';

describe('OpenDayEventsComponent', () => {
  let component: OpenDayEventsComponent;
  let fixture: ComponentFixture<OpenDayEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenDayEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenDayEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
