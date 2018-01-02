import { WeekDay } from '../week-day';
import { getEventsInPeriod } from '../common';
import * as dateFns from 'date-fns';
import { CalendarEvent } from '../CalendarEvent';

const DAYS_IN_WEEK = 7;
const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
export const SECONDS_IN_DAY: number = 60 * 60 * 24;
export const SECONDS_IN_WEEK: number = SECONDS_IN_DAY * DAYS_IN_WEEK;
export enum DAYS_OF_WEEK {
    SUNDAY = 0,
    MONDAY = 1,
    TUESDAY = 2,
    WEDNESDAY = 3,
    THURSDAY = 4,
    FRIDAY = 5,
    SATURDAY = 6
  }



const DEFAULT_WEEKEND_DAYS: number[] = [
    DAYS_OF_WEEK.SUNDAY,
    DAYS_OF_WEEK.SATURDAY
];

export function getWeekView({
    events = [],
    viewDate,
    hourSegments,
    dayStart,
    dayEnd,
    segmentHeight,
    weekStartsOn,
}: {
  events: CalendarEvent[];
  viewDate: any;
  hourSegments: any;
  dayStart: Date;
  dayEnd: Date;
  segmentHeight: any;
  weekStartsOn: number}) {

    const startOfViewWeek: Date = dateFns.startOfWeek(viewDate, {weekStartsOn});
    const endOfViewWeek: Date = dateFns.endOfWeek(viewDate, {weekStartsOn});
    const weekCols = dateFns.differenceInDays(endOfViewWeek, startOfViewWeek) + 1;

    let previousDate: Date = startOfViewWeek;
    const days = [];
    const dayEvents: any[] = [];
    for (let day = 0; day < weekCols; day++) {
        const startDay = dateFns.startOfDay(previousDate);
        const endDay = dateFns.endOfDay(previousDate);

        const eventsInDay = getEventsInPeriod({
            events: events.filter((event) => !event.allDay),
            periodStart: startDay,
            periodEnd: endDay
        }).map(event => {
            let top;
            let height;
            if (dateFns.isBefore(event.start, startDay)) {
                top = 0;
                height = dateFns.differenceInMinutes(event.end, startDay);
            }else {
                top = dateFns.differenceInMinutes(event.start, startDay);
                height = dateFns.differenceInMinutes(event.end, event.start);
            }
            if (dateFns.isAfter(event.end, endDay)) {
                height = dateFns.differenceInMinutes(endDay, event.start);
            }
            dayEvents.push({
                event,
                top,
                height
            });
            return {
                event,
                top,
                height
            };
        });
        const dayCols = dateFns.differenceInHours(endDay, startDay) + 1;
        let previousHour = startDay;
        const hours = [];
        for (let hour = 0; hour < dayCols; hour++) {
            const eventsInHour = getEventsInPeriod({
                events,
                periodStart: dateFns.startOfHour(previousHour),
                periodEnd: dateFns.endOfHour(previousHour)
            });
            hours.push({
                hour: previousHour,
                events: eventsInHour
            });
            previousHour = dateFns.startOfHour(dateFns.addMinutes(previousHour, MINUTES_IN_HOUR + 1));
        }
        days.push({
            date: previousDate,
            hours: hours,
            events : eventsInDay
        });
        previousDate = dateFns.startOfDay(dateFns.addHours(previousDate, HOURS_IN_DAY + 1));
    }
    const allDayWeekEvents = getEventsInPeriod({
        events: events.filter((event) => event.allDay),
        periodStart: startOfViewWeek,
        periodEnd: endOfViewWeek
      });

      const allDayEventsMapped = allDayWeekEvents.map(event => {

        const eventStart: Date = event.start;
        const eventEnd: Date = event.end || eventStart;
        const startsBeforeWeek: boolean = eventStart < startOfViewWeek;
        const endsAfterWeek: boolean = eventEnd > endOfViewWeek;

        const offset: number = getWeekViewEventOffset({
          event,
          startOfWeek: startOfViewWeek,
          excluded: [],
          precision : 'days'
        });
        const span: number = getWeekViewEventSpan({
          event,
          offset,
          startOfWeekDate: startOfViewWeek,
          excluded: [],
          precision : 'days'
        });
        return {
          event: event,
          span: span,
          offset: offset,
          startsBeforeWeek: startsBeforeWeek,
          endsAfterWeek: endsAfterWeek
        };
      });
    return {
        days: days,
        allDays: allDayEventsMapped
    };
}

export function getWeekViewEventSpan({
    event,
    offset,
    startOfWeekDate,
    excluded,
    precision = 'days'
  }: {
    event: CalendarEvent;
    offset: number;
    startOfWeekDate: Date;
    excluded: number[];
    precision?: 'minutes' | 'days';
  }): number {
    let span: number = SECONDS_IN_DAY;
    const begin: Date = dateFns.max(event.start, startOfWeekDate);

    if (event.end) {
      switch (precision) {
        case 'minutes':
          span = dateFns.differenceInSeconds(event.end, begin);
          break;
        default:
          span = dateFns.differenceInDays(dateFns.addDays(event.end, 1), begin) * SECONDS_IN_DAY;
          break;
      }
    }

    const offsetSeconds: number = offset * SECONDS_IN_DAY;
    const totalLength: number = offsetSeconds + span;

    // the best way to detect if an event is outside the week-view
    // is to check if the total span beginning (from startOfWeekDay or event start) exceeds 7days
    if (totalLength > SECONDS_IN_WEEK) {
      span = SECONDS_IN_WEEK - offsetSeconds;
    }

    span -= getExcludedSeconds({
      startDate: begin,
      seconds: span,
      excluded,
      precision
    });

    return span / SECONDS_IN_DAY;
  }

export function getWeekViewEventOffset({
    event,
    startOfWeek: startOfWeekDate,
    excluded = [],
    precision = 'days'
  }: {
    event: CalendarEvent;
    startOfWeek: Date;
    excluded?: number[];
    precision?: 'minutes' | 'days';
  }): number {
    if (event.start < startOfWeekDate) {
      return 0;
    }

    let offset = 0;

    switch (precision) {
      case 'days':
        offset =
          dateFns.differenceInDays(dateFns.startOfDay(event.start), startOfWeekDate) *
          SECONDS_IN_DAY;
        break;
      case 'minutes':
        offset = dateFns.differenceInSeconds(event.start, startOfWeekDate);
        break;
    }

    offset -= getExcludedSeconds({
      startDate: startOfWeekDate,
      seconds: offset,
      excluded,
      precision
    });

    return offset / SECONDS_IN_DAY;
}
export function getExcludedSeconds({
    startDate,
    seconds,
    excluded,
    precision = 'days'
  }: {
    startDate: Date;
    seconds: number;
    excluded: number[];
    precision?: 'minutes' | 'days';
  }): number {
    if (excluded.length < 1) {
      return 0;
    }
    const endDate: Date = dateFns.addSeconds(startDate, seconds - 1);
    const dayStart: number = dateFns.getDay(startDate);
    const dayEnd: number = dateFns.getDay(dateFns.addSeconds(endDate, 0));
    let result = 0; // Calculated in seconds
    let current: Date = startDate;

    while (current < endDate) {
      const day: number = dateFns.getDay(current);

      if (excluded.some(excludedDay => excludedDay === day)) {
        result += calculateExcludedSeconds({
          dayStart,
          dayEnd,
          day,
          precision,
          startDate,
          endDate
        });
      }

      current = dateFns.addDays(current, 1);
    }

    return result;
  }

  function calculateExcludedSeconds({
    precision,
    day,
    dayStart,
    dayEnd,
    startDate,
    endDate
  }: {
    day: number;
    startDate: Date;
    endDate: Date;
    dayStart: number;
    dayEnd: number;
    precision?: 'minutes' | 'days';
  }): number {
    if (precision === 'minutes') {
      if (day === dayStart) {
        return dateFns.differenceInSeconds(dateFns.endOfDay(startDate), startDate) + 1;
      } else if (day === dayEnd) {
        return dateFns.differenceInSeconds(endDate, dateFns.startOfDay(endDate)) + 1;
      }
    }
 return SECONDS_IN_DAY;
  }
function getTop(event: CalendarEvent, events: any[], top: any) {
    for (const e of events) {
      if (dateFns.isSameMinute(event.start, e.event.start) &&
       !e.event.allDay &&
       dateFns.isSameDay(event.start, e.event.start) &&
       dateFns.isSameDay(event.end, e.event.end) &&
       dateFns.isSameHour(event.start, e.event.start)) {
          top += 30;
      }
    }
    return top;
  }
