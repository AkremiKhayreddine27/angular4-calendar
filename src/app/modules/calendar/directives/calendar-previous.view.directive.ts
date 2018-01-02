import {
    Directive,
    HostListener,
    Input,
    Output,
    EventEmitter
  } from '@angular/core';
  import * as dateFns from 'date-fns';


  /**
   * Change the view date to the previous view. For example:
   *
   * ```typescript
   * <button
   *  appCalendarPreviousView
   *  [(viewDate)]="viewDate"
   *  [view]="view">
   *  Previous
   * </button>
   * ```
   */
  @Directive({
    selector: '[appCalendarPreviousView]'
  })
  export class CalendarPreviousViewDirective {
    /**
     * The current view
     */
    @Input() view: string;

    /**
     * The current view date
     */
    @Input() viewDate: Date;

    /**
     * Called when the view date is changed
     */
    @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

    /**
     * @hidden
     */
    @HostListener('click')
    onClick(): void {
      const subFn: any = {
        day: dateFns.subDays,
        week: dateFns.subWeeks,
        month: dateFns.subMonths,
        weekDay: dateFns.subWeeks
      }[this.view];

      this.viewDateChange.emit(subFn(this.viewDate, 1));
    }
  }
