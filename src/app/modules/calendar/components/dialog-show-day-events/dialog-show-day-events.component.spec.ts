import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogShowDayEventsComponent } from './dialog-show-day-events.component';

describe('DialogShowDayEventsComponent', () => {
  let component: DialogShowDayEventsComponent;
  let fixture: ComponentFixture<DialogShowDayEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogShowDayEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogShowDayEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
