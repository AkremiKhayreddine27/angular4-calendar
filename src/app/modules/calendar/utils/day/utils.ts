import * as dateFns from 'date-fns';

import { DayView } from './DayView';
import { DayViewEvent } from './DayViewEvent';
import { CalendarEvent } from './../CalendarEvent';
import { DayViewHour } from './DayViewHour';
import { DayViewHourSegment } from './DayViewHourSegment';

import { getEventsInPeriod } from './../common';


const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

export interface GetDayViewArgs {
    events?: CalendarEvent[];
    viewDate: Date;
    hourSegments: number;
    dayStart: {
      hour: number;
      minute: number;
    };
    dayEnd: {
      hour: number;
      minute: number;
    };
    eventWidth: number;
    segmentHeight: number;
}

export function getDayView({
    events = [],
    viewDate,
    hourSegments,
    dayStart,
    dayEnd,
    eventWidth,
    segmentHeight
  }: GetDayViewArgs): DayView {
    if (!events) {
      events = [];
    }

    const startOfView: Date = dateFns.setMinutes(
      dateFns.setHours(dateFns.startOfDay(viewDate), dayStart.hour),
      dayStart.minute
    );
    const endOfView: Date = dateFns.setMinutes(
      dateFns.setHours(dateFns.startOfMinute(dateFns.endOfDay(viewDate)), dayEnd.hour),
      dayEnd.minute
    );
    const previousDayEvents: DayViewEvent[] = [];

    const dayViewEvents: DayViewEvent[] = getEventsInPeriod({
      events: events.filter((event: CalendarEvent) => !event.allDay),
      periodStart: startOfView,
      periodEnd: endOfView
    })
      .sort((eventA: CalendarEvent, eventB: CalendarEvent) => {
        return eventA.start.valueOf() - eventB.start.valueOf();
      })
      .map((event: CalendarEvent) => {
        const eventStart: Date = event.start;
        const eventEnd: Date = event.end || eventStart;
        const startsBeforeDay: boolean = eventStart < startOfView;
        const endsAfterDay: boolean = eventEnd > endOfView;
        const hourHeightModifier: number =
          hourSegments * segmentHeight / MINUTES_IN_HOUR;

        let top = 0;
        if (eventStart > startOfView) {
          top += dateFns.differenceInMinutes(eventStart, startOfView);
        }
        top *= hourHeightModifier;

        const startDate: Date = startsBeforeDay ? startOfView : eventStart;
        const endDate: Date = endsAfterDay ? endOfView : eventEnd;
        let height: number = dateFns.differenceInMinutes(endDate, startDate);
        if (!event.end) {
          height = segmentHeight;
        } else {
          height *= hourHeightModifier;
        }

        const bottom: number = top + height;

        const overlappingPreviousEvents: DayViewEvent[] = previousDayEvents.filter(
          (previousEvent: DayViewEvent) => {
            const previousEventTop: number = previousEvent.top;
            const previousEventBottom: number =
              previousEvent.top + previousEvent.height;

            if (top < previousEventBottom && previousEventBottom < bottom) {
              return true;
            } else if (previousEventTop <= top && bottom <= previousEventBottom) {
              return true;
            }

            return false;
          }
        );

        let left = 0;

        while (
          overlappingPreviousEvents.some(
            previousEvent => previousEvent.left === left
          )
        ) {
          left += eventWidth;
        }

        const dayEvent: DayViewEvent = {
          event,
          height,
          width: eventWidth,
          top,
          left,
          startsBeforeDay,
          endsAfterDay
        };

        if (height > 0) {
          previousDayEvents.push(dayEvent);
        }

        return dayEvent;
      })
      .filter((dayEvent: DayViewEvent) => dayEvent.height > 0);

    const width: number = Math.max(
      ...dayViewEvents.map((event: DayViewEvent) => event.left + event.width)
    );
    const allDayEvents: CalendarEvent[] = getEventsInPeriod({
      events: events.filter((event: CalendarEvent) => event.allDay),
      periodStart: dateFns.startOfDay(startOfView),
      periodEnd: dateFns.endOfDay(endOfView)
    });

    return {
      events: dayViewEvents,
      width,
      allDayEvents
    };
}

export interface GetDayViewHourGridArgs {
  viewDate: Date;
  hourSegments: number;
  dayStart: any;
  dayEnd: any;
}

export function getDayViewHourGrid({
  viewDate,
  hourSegments,
  dayStart,
  dayEnd
}: GetDayViewHourGridArgs): DayViewHour[] {
  const hours: DayViewHour[] = [];

  const startOfView: Date = dateFns.setMinutes(
    dateFns.setHours(dateFns.startOfDay(viewDate), dayStart.hour),
    dayStart.minute
  );
  const endOfView: Date = dateFns.setMinutes(
    dateFns.setHours(dateFns.startOfMinute(dateFns.endOfDay(viewDate)), dayEnd.hour),
    dayEnd.minute
  );
  const segmentDuration: number = MINUTES_IN_HOUR / hourSegments;
  const startOfViewDay: Date = dateFns.startOfDay(viewDate);

  for (let i = 0; i < HOURS_IN_DAY; i++) {
    const segments: DayViewHourSegment[] = [];
    for (let j = 0; j < hourSegments; j++) {
      const date: Date = dateFns.addMinutes(
        dateFns.addHours(startOfViewDay, i),
        j * segmentDuration
      );
      if (date >= startOfView && date < endOfView) {
        segments.push({
          date,
          isStart: j === 0
        });
      }
    }
    if (segments.length > 0) {
      hours.push({ segments });
    }
  }

  return hours;
}

