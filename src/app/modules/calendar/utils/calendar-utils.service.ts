import { Injectable } from '@angular/core';
import { GetDayViewArgs, GetDayViewHourGridArgs, getDayViewHourGrid, getDayView } from './day/utils';
import { DayView } from './day/DayView';
import { DayViewHour } from './day/DayViewHour';
import { CalendarEvent } from './CalendarEvent';
import {
  getMonthViewGrid,
  GetMonthViewGridArgs,
  GetMonthViewArgs,
  getWeekViewHeader,
  GetWeekViewHeaderArgs
} from '../utils/month/utils';

import { getWeekView } from '../utils/week/utils';


@Injectable()
export class CalendarUtilsService {

  constructor() {

  }

  getWeekView(args: any) {
    return getWeekView(args);
  }

  getMonthViewGrid(args: GetMonthViewGridArgs) {
    return getMonthViewGrid(args);
  }

  getWeekViewHeader(args: GetWeekViewHeaderArgs) {
    return getWeekViewHeader(args);
  }

  getDayView(args: GetDayViewArgs): DayView {
    return getDayView(args);
  }

  getDayViewHourGrid(args: GetDayViewHourGridArgs): DayViewHour[] {
    return getDayViewHourGrid(args);
  }


}
