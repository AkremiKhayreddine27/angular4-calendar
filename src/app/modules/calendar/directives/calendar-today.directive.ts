import {
    Directive,
    HostListener,
    Input,
    Output,
    EventEmitter
  } from '@angular/core';
  import * as dateFns from 'date-fns';

  /**
   * Change the view date to the current day. For example:
   *
   * ```typescript
   * <button
   *  appCalendarToday
   *  [(viewDate)]="viewDate">
   *  Today
   * </button>
   * ```
   */
  @Directive({
    selector: '[appCalendarToday]'
  })
  export class CalendarTodayDirective {
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
      this.viewDateChange.emit(dateFns.startOfToday());
    }
  }
