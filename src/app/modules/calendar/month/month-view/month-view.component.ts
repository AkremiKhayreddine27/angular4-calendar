import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, Inject, LOCALE_ID, ChangeDetectorRef } from '@angular/core';
import * as dateFns from 'date-fns';
import { CalendarEvent } from '../../utils/CalendarEvent';
import { WeekDay } from '../../utils/week-day';
import { MonthViewDay } from '../../utils/month/MonthViewDay';
import { CalendarEventTimesChangedEvent } from '../../utils/CalendarEventTimesChangedEvent';
import { MonthView } from '../../utils/month/MonthView';
import { CalendarUtilsService } from './../../utils/calendar-utils.service';
import { validateEvents } from './../../utils/isInside';

import { MonthViewEvent } from '../../utils/month/MonthViewEvent';

import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.scss']
})
export class MonthViewComponent implements OnInit, OnChanges, OnDestroy {

  /**
  * The current view date
  */
  @Input() viewDate: Date;

  /**
  * An array of events to display on view.
  */
  @Input() events: CalendarEvent[] = [];

  /**
  * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
  */
  @Input() excludeDays: number[] = [];

  /**
  * Whether the events list for the day of the `viewDate` option is visible or not
  */
  @Input() activeDayIsOpen = false;

  /**
  * An observable that when emitted on will re-render the current view
  */
  @Input() refresh: Subject<any>;

  /**
  * The locale used to format dates
  */
  @Input() locale: string;

  /**
  * The start number of the week
  */
  @Input() weekStartsOn: number;

  /**
  * An array of day indexes (0 = sunday, 1 = monday etc) that indicate which days are weekends
  */
  @Input() weekendDays: number[];

  /**
  * An output that will be called before the view is rendered for the current month.
  * If you add the `cssClass` property to a day in the body it will add that class to the cell element in the template
  */
  @Output()
  beforeViewRender: EventEmitter<{
    header: WeekDay[];
    body: MonthViewDay[];
  }> = new EventEmitter();

  /**
  * Called when the day cell is clicked
  */
  @Output()
  dayClicked: EventEmitter<{ day: MonthViewDay }> = new EventEmitter<{
    day: MonthViewDay;
  }>();

  /**
  * Called when the event title is clicked
  */
  @Output()
  eventClicked: EventEmitter<{ event: CalendarEvent }> = new EventEmitter<{
    event: CalendarEvent;
  }>();

  /**
  * Called when an event is dragged and dropped
  */
  @Output()
  eventTimesChanged: EventEmitter<
    CalendarEventTimesChangedEvent
  > = new EventEmitter<CalendarEventTimesChangedEvent>();

/**
 * @hidden
 */
columnHeaders: any;

/**
 * @hidden
 */
view: any;

/**
 * @hidden
 */
monthEvents: MonthViewEvent[];

/**
 * @hidden
 */
openRowIndex: any;

/**
 * @hidden
 */
openDay: any;

/**
 * @hidden
 */
refreshSubscription: Subscription;

/**
 * @hidden
 */
constructor(
  private cdr: ChangeDetectorRef,
  private utils: CalendarUtilsService,
  @Inject(LOCALE_ID) locale: string
) {
  this.locale = locale;
}

ngOnInit() {
  if (this.refresh) {
    this.refreshSubscription = this.refresh.subscribe(() => {
      this.refreshAll();
      this.cdr.markForCheck();
    });
  }
}

/**
 * @hidden
 */
ngOnChanges(changes: any): void {
  if (changes.viewDate || changes.excludeDays || changes.weekendDays) {
    this.refreshHeader();
  }

  if (changes.events) {
    validateEvents(this.events);
  }

  if (
    changes.viewDate ||
    changes.events ||
    changes.excludeDays ||
    changes.weekendDays
  ) {

    this.refreshBody();
  }

  if (
    changes.activeDayIsOpen ||
    changes.viewDate ||
    changes.events ||
    changes.excludeDays
  ) {
    this.checkActiveDayIsOpen();
  }
}

/**
 * @hidden
 */
ngOnDestroy(): void {
  if (this.refreshSubscription) {
    this.refreshSubscription.unsubscribe();
  }
}

private refreshHeader(): void {
  this.columnHeaders = this.utils.getWeekViewHeader({
    viewDate: this.viewDate,
    weekStartsOn: this.weekStartsOn,
    excluded: this.excludeDays,
    weekendDays: this.weekendDays
  });
  this.emitBeforeViewRender();
}

private refreshBody(): void {
  this.view = this.utils.getMonthViewGrid({
    events: this.events,
    viewDate: this.viewDate,
    weekStartsOn: this.weekStartsOn,
    excluded: this.excludeDays,
    weekendDays: this.weekendDays
  });
  this.emitBeforeViewRender();
}

private emitBeforeViewRender(): void {
  if (this.columnHeaders && this.view) {
    this.beforeViewRender.emit({
      header: this.columnHeaders,
      body: this.view.days
    });
  }
}

private checkActiveDayIsOpen(): void {
  if (this.activeDayIsOpen === true) {
    this.openDay = this.view.days.find((day: any) =>
      dateFns.isSameDay(day.date, this.viewDate)
    );
    const index: number = this.view.days.indexOf(this.openDay);
    this.openRowIndex =
      Math.floor(index / this.view.totalDaysVisibleInWeek) *
      this.view.totalDaysVisibleInWeek;
  } else {
    this.openRowIndex = null;
    this.openDay = null;
  }
}

private refreshAll(): void {
  this.columnHeaders = null;
  this.view = null;
  this.refreshHeader();
  this.refreshBody();
  this.checkActiveDayIsOpen();
}

}
