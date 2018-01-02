import { CalendarEvent } from '../CalendarEvent';
import { MonthView } from './MonthView';
import { MonthViewDay } from './MonthViewDay';
import { MonthViewEvent } from './MonthViewEvent';

import * as dateFns from 'date-fns';

import { getEventsInPeriod } from './../common';


const DAYS_IN_WEEK = 7;
const HOURS_IN_DAY = 24;

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

export interface GetMonthViewArgs {
    events?: CalendarEvent[];
    viewDate: Date;
    weekStartsOn: number;
    excluded?: number[];
    viewStart?: Date;
    viewEnd?: Date;
    weekendDays?: number[];
}


export interface GetWeekViewHeaderArgs {
    viewDate: Date;
    weekStartsOn: number;
    excluded?: number[];
    weekendDays?: number[];
  }

export function getWeekViewHeader({
    viewDate,
    weekStartsOn,
    excluded = [],
    weekendDays = []
  }: GetWeekViewHeaderArgs) {
    const start: Date = dateFns.startOfWeek(viewDate, { weekStartsOn });
    const days = [];
    for (let i = 0; i < DAYS_IN_WEEK; i++) {
      const date: Date = dateFns.addDays(start, i);
      if (!excluded.some(e => date.getDay() === e)) {
        days.push(getWeekDay({ date, weekendDays }));
      }
    }

    return days;
  }

function getWeekDay({ date, weekendDays = DEFAULT_WEEKEND_DAYS }: { date: Date; weekendDays: number[]; }) {
    const today: Date = dateFns.startOfDay(new Date());
    return {
      date,
      isPast: date < today,
      isToday: dateFns.isSameDay(date, today),
      isFuture: date > today,
      isWeekend: weekendDays.indexOf(dateFns.getDay(date)) > -1
    };
  }


  export interface GetMonthViewGridArgs {
    events: CalendarEvent[];
    viewDate: Date;
    weekStartsOn: number;
    excluded?: number[];
    viewStart?: Date;
    viewEnd?: Date;
    weekendDays?: number[];
}
  export function getMonthViewGrid({
    events,
    viewDate,
    weekStartsOn,
    excluded = [],
    viewStart = dateFns.startOfMonth(viewDate),
    viewEnd = dateFns.endOfMonth(viewDate),
    weekendDays
  }: GetMonthViewGridArgs) {
    let start: Date = dateFns.startOfWeek(viewStart, { weekStartsOn });
    const end: Date = dateFns.endOfWeek(viewEnd, { weekStartsOn });
    const monthRows = (dateFns.differenceInDays(end, start) + 1) / 7;
    let width;
    let left;
    const weeks = [];
    for (let week = 0; week < monthRows; week++) {
      const endWeek: Date = dateFns.addDays(start, DAYS_IN_WEEK);
      const eventsInWeek: any[] = [];
      const eventsInPeriod: MonthViewEvent[] = getEventsInPeriod({
        events,
        periodStart: start,
        periodEnd: endWeek
      }).map(event => {
        let top = 28;
        let hidden = false;
        if (dateFns.differenceInHours(event.end, event.start) > dateFns.differenceInHours(endWeek, event.start)) {
          width = (dateFns.differenceInHours(endWeek, event.start) / 168) * 100;
        }else {
          width = (dateFns.differenceInHours(event.end, event.start) / 168) * 100;
        }
        if (dateFns.isBefore(event.start, start)) {
          left = 0;
          width = (dateFns.differenceInHours(event.end, start) / 168) * 100;
        }else {
          left = (dateFns.differenceInHours(event.start, start) / 168) * 100;
        }
        if (!event.allDay) {
          left = (dateFns.differenceInHours(dateFns.startOfDay(event.start), start) / 168) * 100;
        }
        if (width > 100) {
          width = 100;
        }
        top = getTop(event, eventsInWeek, top);
        if ( top > 80) {
          hidden = true;
        }
        eventsInWeek.push({
          event: event,
          left: left,
          width: width,
          top: top,
          hidden: hidden
        });
        return {
          event: event,
          left: left,
          width: width,
          top: top,
          hidden: hidden
        };
      });
      let previousDate = null;
      const weekDays = [];
      for (let i = 0; i < dateFns.differenceInDays(endWeek, start); i++) {
        let date: Date;
        if (previousDate) {
          date = dateFns.startOfDay(dateFns.addHours(previousDate, HOURS_IN_DAY));
          if (previousDate.getTime() === date.getTime()) {
            date = dateFns.startOfDay(dateFns.addHours(previousDate, HOURS_IN_DAY + 1));
          }
          previousDate = date;
        } else {
          date = previousDate = start;
        }
        if (!excluded.some(e => date.getDay() === e)) {

          const day: MonthViewDay = getWeekDay({
            date,
            weekendDays: []
          }) as MonthViewDay;

          const dayEvents = getEventsInPeriod({
            events,
            periodStart: dateFns.startOfDay(date),
            periodEnd: dateFns.endOfDay(date),
          });
          day.inMonth = dateFns.isSameMonth(date, viewDate);
          day.badgeTotal = dayEvents.length;
          day.events = dayEvents;
          weekDays.push(day);
        }
      }
      weeks.push({
        events: eventsInPeriod,
        days: weekDays
      });
      start = dateFns.addHours(start, (DAYS_IN_WEEK * HOURS_IN_DAY)) ;
    }
    return {
      rowOffsets : weeks
    };
  }

  function getTop(event: any, events: any[], top: any) {
    const over = [];
    const tops: number[] = [28, 52, 76];
    for (const e of events) {
      if (
        (dateFns.isSameDay(event.start, e.event.start) || dateFns.isSameDay(event.end, e.event.end)) ||
        dateFns.isWithinRange(event.start, e.event.start, e.event.end) ||
        dateFns.isWithinRange(event.end, e.event.start, e.event.end) ||
        dateFns.isWithinRange(e.event.start, event.start, event.end) ||
        dateFns.isWithinRange(e.event.end, event.start, event.end)) {
          top = e.top + 24;
          over.push(e);
      }
    }
    for (const o of over) {
      for (const t of tops) {
        if (o.top === t) {
          const index = tops.indexOf(t);
          tops.splice(index, 1);
        }
      }
    }
    if (tops.length > 0) {
      top = tops[0];
    }
    return top;
  }
