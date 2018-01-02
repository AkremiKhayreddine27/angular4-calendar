import { CalendarEvent } from '../CalendarEvent';
export interface MonthViewEvent {
    event: CalendarEvent;
    left: number;
    width: number;
    top: number;
}
