import {
    Directive,
    HostListener,
    Input,
    Output,
    EventEmitter
  } from '@angular/core';
  import * as dateFns from 'date-fns';

  /**
   * Change the view date to the next view. For example:
   *
   * ```typescript
   * <button
   *  appCalendarNextView
   *  [(viewDate)]="viewDate"
   *  [view]="view">
   *  Next
   * </button>
   * ```
   */
  @Directive({
    selector: '[appCalendarNextView]'
  })
  export class CalendarNextViewDirective {
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
      const addFn: any = {
        day: dateFns.addDays,
        week: dateFns.addWeeks,
        month: dateFns.addMonths,
        weekDay: dateFns.addWeeks
      }[this.view];

      this.viewDateChange.emit(addFn(this.viewDate, 1));
    }
  }
