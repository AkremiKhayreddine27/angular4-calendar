import { WeekDay } from '../week-day';
import { MontViewEvent } from '../month/MontViewEvent';
export interface MonthViewDay<MetaType = any> extends WeekDay {
    inMonth: boolean;
    events: any[];
    backgroundColor?: string;
    badgeTotal: number;
    meta?: MetaType;
}
