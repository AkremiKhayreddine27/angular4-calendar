import { CalendarEvent } from './CalendarEvent';
import * as dateFns from 'date-fns';


export interface GetEventsInPeriodArgs {
    events: CalendarEvent[];
    periodStart: Date;
    periodEnd: Date;
}

export function getEventsInPeriod({
    events,
    periodStart,
    periodEnd
  }: GetEventsInPeriodArgs): CalendarEvent[] {
    return events.filter((event: CalendarEvent) =>
      isEventIsPeriod({ event, periodStart, periodEnd })
    );
}


interface IsEventInPeriodArgs {
    event: CalendarEvent;
    periodStart: Date;
    periodEnd: Date;
}



function isEventIsPeriod({
    event,
    periodStart,
    periodEnd
  }: IsEventInPeriodArgs): boolean {
    const eventStart: Date = event.start;
    const eventEnd: Date = event.end || event.start;

    if (eventStart > periodStart && eventStart < periodEnd) {
      return true;
    }

    if (eventEnd > periodStart && eventEnd < periodEnd) {
      return true;
    }

    if (eventStart < periodStart && eventEnd > periodEnd) {
      return true;
    }

    if (
      dateFns.isSameSecond(eventStart, periodStart) ||
      dateFns.isSameSecond(eventStart, periodEnd)
    ) {
      return true;
    }

    if (
      dateFns.isSameSecond(eventEnd, periodStart) ||
      dateFns.isSameSecond(eventEnd, periodEnd)
    ) {
      return true;
    }

    return false;
}
