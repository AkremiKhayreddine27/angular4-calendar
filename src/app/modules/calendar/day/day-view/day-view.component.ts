import { Inject, ChangeDetectorRef, LOCALE_ID, Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { ResizeEvent } from 'angular-resizable-element';
import * as dateFns from 'date-fns';
import { CalendarEvent } from '../../utils/CalendarEvent';
import { CalendarEventTimesChangedEvent } from '../../utils/CalendarEventTimesChangedEvent';
import { DayViewHour } from '../../utils/day/DayViewHour';
import { DayView } from '../../utils/day/DayView';
import { DayViewEvent } from '../../utils/day/DayViewEvent';
import { DayViewEventResize } from '../../utils/day/DayViewEventResize';
import { CalendarUtilsService } from './../../utils/calendar-utils.service';
import { CalendarDragHelper } from './../../utils/CalendarDragHelper';
import { CalendarResizeHelper } from './../../utils/CalendarResizeHelper';
import { validateEvents } from './../../utils/isInside';
import { DayViewHourSegment } from '../../utils/day/DayViewHourSegment';

/**
 * @hidden
*/
const MINUTES_IN_HOUR = 60;

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.css']
})
export class DayViewComponent implements OnInit, OnChanges, OnDestroy {

  /**
   * The current view date
  */
  @Input() viewDate: Date;

  /**
   * An array of events to display on view
  */
  @Input() events: CalendarEvent[] = [];

  /**
   * The number of segments in an hour. Must be <= 6
  */
  @Input() hourSegments = 2;

  /**
   * The height in pixels of each hour segment
  */
  @Input() hourSegmentHeight = 30;

  /**
   * The day start hours in 24 hour time. Must be 0-23
  */
  @Input() dayStartHour = 0;

  /**
   * The day start minutes. Must be 0-59
  */
  @Input() dayStartMinute = 0;

  /**
   * The day end hours in 24 hour time. Must be 0-23
  */
  @Input() dayEndHour = 23;

  /**
   * The day end minutes. Must be 0-59
  */
  @Input() dayEndMinute = 59;

  /**
   * The width in pixels of each event on the view
  */
  @Input() eventWidth = 150;

  /**
   * An observable that when emitted on will re-render the current view
  */
  @Input() refresh: Subject<any>;

  /**
   * The locale used to format dates
  */
  @Input() locale: string;

  /**
   * The grid size to snap resizing and dragging of events to
  */
  @Input() eventSnapSize: number = this.hourSegmentHeight;


  /**
   * Called when an event title is clicked
  */
  @Output()
  eventClicked: EventEmitter<{ event: CalendarEvent }> = new EventEmitter<{
    event: CalendarEvent;
  }>();

  /**
   * Called when an hour segment is clicked
  */
  @Output()
  hourSegmentClicked: EventEmitter<{ date: Date }> = new EventEmitter<{
    date: Date;
  }>();

  /**
   * Called when an event is resized or dragged and dropped
   */
  @Output()
  eventTimesChanged: EventEmitter<
    CalendarEventTimesChangedEvent
  > = new EventEmitter<CalendarEventTimesChangedEvent>();

  /**
   * An output that will be called before the view is rendered for the current day.
   * If you add the `cssClass` property to a segment it will add that class to the hour segment in the template
  */
  @Output()
  beforeViewRender: EventEmitter<{ body: DayViewHour[] }> = new EventEmitter();

  /**
   * @hidden
  */
  hours: DayViewHour[] = [];

  /**
   * @hidden
  */
  view: DayView;

  /**
   * @hidden
  */
  width = 0;

  /**
   * @hidden
  */
  refreshSubscription: Subscription;

  /**
   * @hidden
  */
  currentResizes: Map<DayViewEvent, DayViewEventResize> = new Map();

  /**
   * @hidden
  */
  validateDrag: (args: any) => boolean;

  /**
   * @hidden
  */
  validateResize: (args: any) => boolean;

  constructor(private cdr: ChangeDetectorRef, private utils: CalendarUtilsService, @Inject(LOCALE_ID) locale: string) {
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

  ngOnChanges(changes: any): void {
    if (
      changes.viewDate ||
      changes.dayStartHour ||
      changes.dayStartMinute ||
      changes.dayEndHour ||
      changes.dayEndMinute
    ) {
      this.refreshHourGrid();
    }

    if (changes.events) {
      validateEvents(this.events);
    }

    if (
      changes.viewDate ||
      changes.events ||
      changes.dayStartHour ||
      changes.dayStartMinute ||
      changes.dayEndHour ||
      changes.dayEndMinute ||
      changes.eventWidth
    ) {
      this.refreshView();
    }
  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  eventDropped(
    dropEvent: { dropData?: { event?: CalendarEvent } },
    segment: DayViewHourSegment
  ): void {
    if (dropEvent.dropData && dropEvent.dropData.event) {
      this.eventTimesChanged.emit({
        event: dropEvent.dropData.event,
        newStart: segment.date
      });
    }
  }

  resizeStarted(
    event: DayViewEvent,
    resizeEvent: ResizeEvent,
    dayViewContainer: HTMLElement
  ): void {
    this.currentResizes.set(event, {
      originalTop: event.top,
      originalHeight: event.height,
      edge: typeof resizeEvent.edges.top !== 'undefined' ? 'top' : 'bottom'
    });
    const resizeHelper: CalendarResizeHelper = new CalendarResizeHelper(
      dayViewContainer
    );
    this.validateResize = ({ rectangle }) =>
      resizeHelper.validateResize({ rectangle });
    this.cdr.markForCheck();
  }

  resizing(event: DayViewEvent, resizeEvent: ResizeEvent): void {
    const currentResize: any = this.currentResizes.get(event);
    if (resizeEvent.edges.top) {
      event.top = currentResize.originalTop + +resizeEvent.edges.top;
      event.height = currentResize.originalHeight - +resizeEvent.edges.top;
    } else if (resizeEvent.edges.bottom) {
      event.height = currentResize.originalHeight + +resizeEvent.edges.bottom;
    }
  }

  resizeEnded(dayEvent: DayViewEvent): void {
    const currentResize: any = this.currentResizes.get(dayEvent);

    let pixelsMoved: number;
    if (currentResize.edge === 'top') {
      pixelsMoved = dayEvent.top - currentResize.originalTop;
    } else {
      pixelsMoved = dayEvent.height - currentResize.originalHeight;
    }

    dayEvent.top = currentResize.originalTop;
    dayEvent.height = currentResize.originalHeight;

    const pixelAmountInMinutes: number =
      MINUTES_IN_HOUR / (this.hourSegments * this.hourSegmentHeight);
    const minutesMoved: number = pixelsMoved * pixelAmountInMinutes;
    let newStart: Date = dayEvent.event.start;
    let newEnd: Date = dayEvent.event.end;
    if (currentResize.edge === 'top') {
      newStart = dateFns.addMinutes(newStart, minutesMoved);
    } else if (newEnd) {
      newEnd = dateFns.addMinutes(newEnd, minutesMoved);
    }

    this.eventTimesChanged.emit({ newStart, newEnd, event: dayEvent.event });
    this.currentResizes.delete(dayEvent);
  }

  dragStart(event: HTMLElement, dayViewContainer: HTMLElement): void {
    const dragHelper: CalendarDragHelper = new CalendarDragHelper(
      dayViewContainer,
      event
    );
    this.validateDrag = ({ x, y }) =>
      this.currentResizes.size === 0 && dragHelper.validateDrag({ x, y });
    this.cdr.markForCheck();
  }

  eventDragged(dayEvent: DayViewEvent, draggedInPixels: number): void {
    const pixelAmountInMinutes: number =
      MINUTES_IN_HOUR / (this.hourSegments * this.hourSegmentHeight);
    const minutesMoved: number = draggedInPixels * pixelAmountInMinutes;
    const newStart: Date = dateFns.addMinutes(dayEvent.event.start, minutesMoved);
    // possible issue
    let newEnd: Date = new Date();
    if (dayEvent.event.end) {
      newEnd = dateFns.addMinutes(dayEvent.event.end, minutesMoved);
    }
    this.eventTimesChanged.emit({ newStart, newEnd, event: dayEvent.event });
  }

  private refreshHourGrid(): void {
    this.hours = this.utils.getDayViewHourGrid({
      viewDate: this.viewDate,
      hourSegments: this.hourSegments,
      dayStart: {
        hour: this.dayStartHour,
        minute: this.dayStartMinute
      },
      dayEnd: {
        hour: this.dayEndHour,
        minute: this.dayEndMinute
      }
    });
    this.beforeViewRender.emit({
      body: this.hours
    });
  }

  private refreshView(): void {
    this.view = this.utils.getDayView({
      events: this.events,
      viewDate: this.viewDate,
      hourSegments: this.hourSegments,
      dayStart: {
        hour: this.dayStartHour,
        minute: this.dayStartMinute
      },
      dayEnd: {
        hour: this.dayEndHour,
        minute: this.dayEndMinute
      },
      eventWidth: this.eventWidth,
      segmentHeight: this.hourSegmentHeight
    });
  }

  private refreshAll(): void {
    this.refreshHourGrid();
    this.refreshView();
  }

}
