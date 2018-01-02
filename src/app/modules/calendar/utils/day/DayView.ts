import { CalendarEvent } from './../CalendarEvent';
import { DayViewEvent } from './DayViewEvent';

export interface DayView {
    events: DayViewEvent[];
    width: number;
    allDayEvents: CalendarEvent[];
}
