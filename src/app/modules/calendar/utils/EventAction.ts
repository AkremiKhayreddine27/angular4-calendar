import { CalendarEvent } from './CalendarEvent';

export interface EventAction {
    label: string;
    cssClass?: string;
    onClick({ event }: { event: CalendarEvent }): any;
}
