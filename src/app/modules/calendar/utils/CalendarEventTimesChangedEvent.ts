import { CalendarEvent } from './CalendarEvent';

export interface CalendarEventTimesChangedEvent {
    event: CalendarEvent;
    newStart: Date;
    newEnd?: Date;
}
