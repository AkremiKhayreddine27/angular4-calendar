import { CalendarEvent } from '../CalendarEvent';
export interface MontViewEvent {
    event: CalendarEvent;
    height: number;
    width: number;
    top: number;
    hidden: boolean;
    titleHidden: boolean;
}
