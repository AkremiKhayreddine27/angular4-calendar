import { MonthViewDay } from './MonthViewDay';
export interface MonthView {
    rowOffsets: any[];
    days: MonthViewDay[];
    totalDaysVisibleInWeek: number;
}
